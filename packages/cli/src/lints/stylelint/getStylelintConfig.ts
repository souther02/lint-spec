import fse from 'fs-extra';
import { globSync } from 'glob';
import { LinterOptions } from 'stylelint';
import type { Config, PackageType, ScanOptions } from '@/types';
import path from "@/utils/path";
import { STYLELINT_SCAN_IGNORE_PATTERNS } from '@/utils/constants';

/**
 * 获取 Stylelint 配置
 */
export function getStylelintConfig(
  opts: ScanOptions,
  pkg: PackageType,
  config: Config,
): LinterOptions {
  const { cwd, fix } = opts;
  if (config.enableStylelint === false) return {} as any;

  const lintConfig: any = {
    fix: Boolean(fix),
    allowEmptyInput: true,
  };

  if (config.stylelintOptions) {
    // 若用户传入了 stylelintOptions，则用用户的
    Object.assign(lintConfig, config.stylelintOptions);
  } else {
    // 根据扫描目录下有无lintrc文件，若无则使用默认的 lint 配置
    const lintConfigFiles = globSync('stylelint?(.@(config.js|config.cjs|config.mjs|config.ts))', {
      cwd,
    });
    if (lintConfigFiles.length === 0) {
      lintConfig.config = {
        extends: '@lint-spec/stylelint-config',
      };
    }

    // 根据扫描目录下有无lintignore文件，若无则使用默认的 ignore 配置
    const ignoreFilePath = path.resolve(cwd, '.stylelintignore');
    if (!fse.existsSync(ignoreFilePath)) {
      lintConfig.ignorePattern = STYLELINT_SCAN_IGNORE_PATTERNS;
    }
  }

  return lintConfig;
}
