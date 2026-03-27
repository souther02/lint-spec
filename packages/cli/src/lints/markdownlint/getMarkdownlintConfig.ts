import { globSync } from 'glob';
import { readConfig } from 'markdownlint/sync';
import type { Options } from 'markdownlint';
import markdownLintConfig from '@lint-spec/markdownlint-config' with { type: 'json' };
import type { ScanOptions, PackageType, Config } from '@/types';
import path from '@/utils/path';

type LintOptions = Options & { fix?: boolean };

/**
 * 获取 Markdownlint 配置
 */
export function getMarkdownlintConfig(
  opts: ScanOptions,
  packages: PackageType,
  config: Config,
): LintOptions {
  const { cwd } = opts;
  const lintConfig: LintOptions = {
    fix: Boolean(opts.fix),
  };

  if (config.markdownlintOptions) {
    // 若用户传入了 markdownlintOptions，则用用户的
    Object.assign(lintConfig, config.markdownlintOptions);
  } else {
    const lintConfigFiles = globSync('.markdownlint(.@(yaml|yml|json))', {
      cwd,
    });
    if (lintConfigFiles.length === 0) {
      lintConfig.config = markdownLintConfig as LintOptions['config'];
    } else {
      lintConfig.config = readConfig(path.resolve(cwd, lintConfigFiles[0]));
    }
  }

  return lintConfig;
}
