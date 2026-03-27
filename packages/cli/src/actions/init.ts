import fse from 'fs-extra';
import process from 'node:process';
import spawn from 'cross-spawn';
import type { InitOption, PackageType } from '@/types';
import { LINT_CLI_NAME, PACKAGE_NAME, PROJECT_TYPES } from '@/utils/constants';
import npmType from '@/utils/npm-type';
import path from '@/utils/path';
import conflictResolve from '@/utils/conflict-resolve';
import generateTemplate from '@/utils/generate-template';
import updateVersionAction from './update-version';
import {
  chooseEnableMarkdownlint,
  chooseEnablePrettier,
  chooseEnableStylelint,
  chooseEslintType,
} from '../utils/inquirer';
import log from '../utils/log';

let step = 0;

const initAction = async (option: InitOption) => {
  const npm = await npmType;
  const {
    cwd = process.cwd(),
    checkVersionUpdate = false,
    disableNpmInstall = false,
  } = option;
  const isTest = process.env.NODE_ENV === 'test';
  const config: Partial<InitOption> = {};
  const packagePath = path.resolve(cwd, 'package.json');
  let packages: PackageType = fse.readJsonSync(packagePath);

  // 版本检查
  if (!isTest && checkVersionUpdate) {
    // await updateVersionAction(false);
  }

  // 初始化`enableESLint`，默认为true，无需让用户选择
  config.enableESLint =
    typeof option.enableESLint === 'boolean' ? option.enableESLint : true;

  // 初始化`eslintType`
  if (
    option.eslintType &&
    PROJECT_TYPES.some((project) => project.value === option.eslintType)
  ) {
    config.eslintType = option.eslintType;
  } else {
    config.eslintType = await chooseEslintType(++step);
  }

  // 初始化`enableStylelint`
  config.enableStylelint =
    typeof option.enableStylelint === 'boolean'
      ? option.enableStylelint
      : await chooseEnableStylelint(++step, !/node/.test(config.eslintType));

  // 初始化`enableMarkdownlint`
  config.enableMarkdownlint =
    typeof option.enableMarkdownlint === 'boolean'
      ? option.enableMarkdownlint
      : await chooseEnableMarkdownlint(++step);

  // 初始化`enablePrettier`
  config.enablePrettier =
    typeof option.enablePrettier === 'boolean'
      ? option.enablePrettier
      : await chooseEnablePrettier(++step);

  if (!isTest) {
    log.info(
      `Step ${++step}. Check and handle possible dependencies and configuration conflicts in the project`,
    );
    packages = await conflictResolve(cwd, option.rewriteConfig);
    log.success(
      `Step ${step}. Handle possible dependencies and configuration conflicts in the project successfully`,
    );

    if (!disableNpmInstall) {
      log.info(`Step ${++step}. Install dependencies`);
      spawn.sync(npm, ['install', '--save-dev', PACKAGE_NAME], {
        cwd,
        stdio: 'inherit',
      });
      log.success(`Step ${step}. Install dependencies successfully`);
    }
  }

  // 更新package.json
  packages = fse.readJSONSync(packagePath);

  // 在 `package.json` 中写入 `scripts`
  if (!packages.scripts) {
    packages.scripts = {};
  }

  if (!packages.scripts[`${LINT_CLI_NAME}-scan`]) {
    packages.scripts[`${LINT_CLI_NAME}-scan`] = `${LINT_CLI_NAME} scan`;
  }

  if (!packages.scripts[`${LINT_CLI_NAME}-fix`]) {
    packages.scripts[`${LINT_CLI_NAME}-fix`] = `${LINT_CLI_NAME} fix`;
  }

  // 配置 commit 卡点
  log.info(`Step ${++step}. Configure git commit card point`);
  if (!packages.husky) {
    packages.husky = {};
  }

  if (!packages.husky.hooks) {
    packages.husky.hooks = {};
  }

  packages.husky.hooks['pre-commit'] = `${LINT_CLI_NAME} commit-file-scan`;
  packages.husky.hooks['commit-msg'] = `${LINT_CLI_NAME} commit-msg-scan`;
  fse.writeFileSync(packagePath, JSON.stringify(packages, null, 2));
  log.success(`Step ${step}. Configure git commit card point successfully`);

  log.info(`Step ${++step}. Write configuration file`);
  generateTemplate(cwd, { ...config, packages });
  log.success(`Step ${step}. Write configuration file successfully`);

  // 完成信息
  const logs = [`${LINT_CLI_NAME} initialization completed successfully`].join(
    '\r\n',
  );
  log.success(logs);
};

export default initAction;
