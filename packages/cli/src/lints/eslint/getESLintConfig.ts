import { ESLint } from 'eslint';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import { globSync } from 'glob';
import type { Config, PackageType, ScanOptions } from '@/types';
import {
  ESLINT_SCAN_FILE_EXTENSIONS,
  ESLINT_SCAN_IGNORE_PATTERNS,
} from '@/utils/constants';
import { getESLintConfigType } from './getESLintConfigType';

/**
 * 获取 ESLint 配置
 */
export const getESLintConfig = async (
  options: ScanOptions,
  packages: PackageType,
  config: Config,
): Promise<ESLint.Options> => {
  const { cwd, fix, ignore } = options;
  const lintConfig: ESLint.Options = {
    cwd,
    fix,
    ignore,
    ignorePatterns: ESLINT_SCAN_IGNORE_PATTERNS,
    overrideConfig: {
      files: ESLINT_SCAN_FILE_EXTENSIONS,
    },
    errorOnUnmatchedPattern: false,
  };

  if (config.eslintOptions) {
    // 若用户传入了 eslintOptions，则用用户的
    Object.assign(lintConfig, config.eslintOptions);
  } else {
    // 根据扫描目录下有无eslint配置文件，若无则使用默认的 lint 配置
    const lintConfigFiles = globSync(
      'eslint?(.@(config.js|config.cjs|config.mjs))',
      {
        cwd,
      },
    );
    if (lintConfigFiles.length === 0) {
      lintConfig.baseConfig = [
        ...(config.enablePrettier ? [eslintConfigPrettier] : []),
        (await import(getESLintConfigType(cwd, packages))).default,
        //  ESLint 不再管格式问题，直接使用 Prettier 进行格式化
      ];
    }

    // 根据扫描目录下有无lintignore文件，若无则使用默认的 ignore 配置
    // const lintIgnoreFile = resolve(cwd, '.eslintignore');
    // if (!fse.existsSync(lintIgnoreFile) && !packages.eslintIgnore) {
    //   lintConfig.ignorePath = resolve(__dirname, '../config/_eslintignore.ejs');
    // }
  }

  return lintConfig;
};
