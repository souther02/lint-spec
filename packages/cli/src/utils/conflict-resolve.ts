import fse from 'fs-extra';
import { globSync } from 'glob';
import inquirer from 'inquirer';
import type { PackageType } from '@/types';
import log from './log';
import { PACKAGE_NAME } from './constants';
import path from './path';

// 精确移除依赖
const packageNamesToRemove = [
  '@babel/eslint-parser',
  '@commitlint/cli',
  '@iceworks/spec',
  'babel-eslint',
  'eslint',
  'husky',
  'markdownlint',
  'prettier',
  'stylelint',
  'tslint',
  'typescript-eslint'
];

// 按前缀移除依赖
const packagePrefixesToRemove = [
  '@commitlint/',
  '@typescript-eslint/',
  'eslint-',
  'stylelint-',
  'markdownlint-',
  'commitlint-',
  '@stylistic/'
];

/**
 * 检查并返回待删除的无用配置文件列表
 *
 * @param {string} cwd
 * @return {*}  {string[]}
 */
const checkUselessConfig = (cwd: string): string[] => {
  return ([] as string[])
    .concat(globSync('eslint?(.@(config.js|config.cjs|config.mjs))', { cwd }))
    .concat(globSync('stylelint?(.@(config.js|config.cjs|config.mjs|config.ts))', { cwd }))
    .concat(globSync('.markdownlint@(rc|.@(yaml|yml|jsonc))', { cwd }))
    .concat(
      globSync(
        '.prettierrc?(.@(cjs|config.js|config.cjs|yaml|yml|json|json5|toml))',
        { cwd },
      ),
    )
    .concat(globSync('tslint.@(yaml|yml|json)', { cwd }))
    .concat(globSync('.kylerc?(.@(yaml|yml|json))', { cwd }));
};

/**
 * 待重写的配置
 *
 * @param {string} cwd
 * @return {*}
 */
const checkRewriteConfig = (cwd: string) => {
  return globSync('**/*.ejs', { cwd: path.resolve(path.__dirname, '../config') })
    .map((name: string) => name.replace(/^_/, '.').replace(/\.ejs$/, ''))
    .filter((filename: string) => fse.existsSync(path.resolve(cwd, filename)));
};

const conflictResolve = async (cwd: string, isRewriteConfig?: boolean) => {
  const packagePath = path.resolve(cwd, 'package.json');
  const packages: PackageType = fse.readJsonSync(packagePath);
  const dependencies = ([] as string[]).concat(
    Object.keys(packages.dependencies || {}),
    Object.keys(packages.devDependencies || {}),
  );
  const willRemovePackages = dependencies.filter(
    (name: string) =>
      packageNamesToRemove.includes(name) ||
      packagePrefixesToRemove.some((prefix: string) => name.startsWith(prefix)),
  );
  const uselessConfig = checkUselessConfig(cwd);
  const rewriteConfig = checkRewriteConfig(cwd);
  const willChangeCount =
    willRemovePackages.length + uselessConfig.length + rewriteConfig.length;

  // 提示是否移除原有的配置
  if (willChangeCount > 0) {
    log.warn(
      `Detected that the project may have conflicts with ${PACKAGE_NAME} in dependencies and configuration files, to ensure normal operation, the following actions will be taken：`,
    );

    if (willRemovePackages.length > 0) {
      log.warn('Delete the following dependencies：');
      log.warn(JSON.stringify(willRemovePackages, null, 2));
    }

    if (uselessConfig.length > 0) {
      log.warn('Delete the following configuration files：');
      log.warn(JSON.stringify(uselessConfig, null, 2));
    }

    if (rewriteConfig.length > 0) {
      log.warn('Replace the following configuration files：');
      log.warn(JSON.stringify(rewriteConfig, null, 2));
    }

    if (typeof isRewriteConfig === 'undefined') {
      const { isOverWrite } = await inquirer.prompt({
        type: 'confirm',
        name: 'isOverWrite',
        message: 'Please confirm whether to continue：',
      });

      if (!isOverWrite) process.exit(0);
    } else if (!rewriteConfig) {
      process.exit(0);
    }
  }

  // 删除配置文件
  for (const name of uselessConfig) {
    fse.removeSync(path.resolve(cwd, name));
  }

  // 修正 package.json
  const revisePackages = Object.entries(packages).reduce(
    (acc, [key, value]) => {
      if (['eslintConfig', 'eslintIgnore', 'stylelint'].includes(key)) {
        return acc;
      }
      if (['dependencies', 'devDependencies'].includes(key)) {
        return {
          ...acc,
          [key]: Object.fromEntries(
            Object.entries(value || {}).filter(
              ([name]) => !willRemovePackages.includes(name),
            ),
          ),
        };
      }
      return {
        ...acc,
        [key]: value,
      };
    },
    {} as PackageType,
  );

  fse.writeFileSync(
    path.resolve(cwd, 'package.json'),
    JSON.stringify(revisePackages, null, 2),
    'utf8',
  );

  return revisePackages;
};

export default conflictResolve;
