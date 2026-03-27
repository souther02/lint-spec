#!/usr/bin/env node
import fs from 'fs-extra';
import ora from 'ora';
import { globSync } from 'glob';
import { program } from 'commander';
import spawn from 'cross-spawn';
import { execSync } from 'child_process';
import initAction from '@/actions/init';
import scanAction from '@/actions/scan';
import updateVersionAction from '@/actions/update-version';
import npmType from '@/utils/npm-type';
import log from '@/utils/log';
import printReport from '@/utils/print-report';
import path from '@/utils/path';
import { getCommitFiles, getAmendFiles } from '@/utils/git';
import generateTemplate from '@/utils/generate-template';
import {
  PACKAGE_NAME,
  PACKAGE_VERSION,
  CONFIG_FILE_NAME,
} from '@/utils/constants';

const cwd = process.cwd();

/**
 * 若无 node_modules，则帮用户 install（否则会找不到 config）
 */
const installDepsIfThereNo = async () => {
  const npm = await npmType;
  const lintConfigFiles = ([] as string[]).concat(
    globSync('eslint?(.@(config.js|config.cjs|config.mjs))', { cwd }),
    globSync('.stylelintrc?(.@(js|yaml|yml|json))', { cwd }),
    globSync('.markdownlint(.@(yaml|yml|json))', { cwd }),
  );
  const nodeModulesPath = path.resolve(cwd, 'node_modules');

  if (!fs.existsSync(nodeModulesPath) && lintConfigFiles.length > 0) {
    log.info(
      `Using project Lint config, detected that the project does not have dependencies installed, will install them (execute ${npm} install)`,
    );
    execSync(`cd ${cwd} && ${npm} install`);
  }
};

program
  .version(PACKAGE_VERSION)
  .description(
    `${PACKAGE_NAME} is a Lint tool for front-end engineering, which provides simple CLI and Node.js API, and can help projects to quickly integrate, scan, fix, upgrade, and configure git commit卡点, lower the cost of project implementation of front-end engineering specification`,
  );

program
  .command('init')
  .description(
    'One click integration: initialize the lint tool and configuration for the project, and can be customized according to the project type and requirements',
  )
  .option('--vscode', 'Write the configuration to .vscode/settings.json')
  .action(async (cmd) => {
    if (cmd.vscode) {
      const configPath = path.resolve(cwd, CONFIG_FILE_NAME);
      generateTemplate(cwd, (await import(configPath)).default, true);
    } else {
      await initAction({
        cwd,
        checkVersionUpdate: true,
      });
    }
  });

program
  .command('scan')
  .description(
    'One click scan: scan the project code for specification problems',
  )
  .option('-q, --quiet', 'Only report error messages - default: false')
  .option(
    '-o, --output-report',
    'Output the log of specification problems scanned',
  )
  .option(
    '-i, --include <dirpath>',
    'Specify the directory to be scanned for specification problems',
  )
  .option(
    '--no-ignore',
    'Ignore eslint ignore configuration files and ignore rules',
  )
  .action(async (cmd) => {
    await installDepsIfThereNo();

    const checkSpinner = ora();
    checkSpinner.start(`Execute ${PACKAGE_NAME} code check`);

    const { results, errorCount, warningCount, runErrors } = await scanAction({
      cwd,
      fix: false,
      include: cmd.include || cwd,
      quiet: Boolean(cmd.quiet),
      outputReport: Boolean(cmd.outputReport),
      ignore: cmd.ignore, // 对应 --no-ignore
    });
    let type: keyof typeof checkSpinner = 'succeed';
    if (runErrors.length > 0 || errorCount > 0) {
      type = 'fail';
    } else if (warningCount > 0) {
      type = 'warn';
    }

    checkSpinner[type]();
    if (results.length > 0) {
      printReport(results, false);
    }

    // 输出 lint 运行错误
    runErrors.forEach((e) => console.log(e));
  });

program
  .command('commit-msg-scan')
  .description(
    'Commit message check: inspect commit messages during git commit',
  )
  .action(() => {
    const result = spawn.sync('commitlint', ['-E', 'HUSKY_GIT_PARAMS'], {
      stdio: 'inherit',
    });

    if (result.status !== 0) {
      process.exit(result.status);
    }
  });

program
  .command('commit-file-scan')
  .description(
    'Code submission check: scan submitted code for specification issues during git commit',
  )
  .option(
    '-s, --strict',
    'Strict mode: blocks both warning and error issues; by default, only error issues are blocked.',
  )
  .action(async (cmd) => {
    await installDepsIfThereNo();

    // git add 检查
    const files = await getAmendFiles();
    if (files)
      log.warn(`[${PACKAGE_NAME}] changes not staged for commit: \n${files}\n`);

    const commitCheckSpinner = ora();
    commitCheckSpinner.start(`Executing ${PACKAGE_NAME} code commit check`);

    const { results, errorCount, warningCount } = await scanAction({
      cwd,
      include: cwd,
      quiet: !cmd.strict,
      files: await getCommitFiles(),
    });

    if (errorCount > 0 || (cmd.strict && warningCount > 0)) {
      commitCheckSpinner.fail();
      printReport(results, false);
      process.exitCode = 1;
    } else {
      commitCheckSpinner.succeed();
    }
  });

program
  .command('fix')
  .description(
    'One-click fix: automatically fix code specification scan issues in the project',
  )
  .option(
    '-i, --include <dirpath>',
    'Specify the directory to be fixed for code specification scan issues',
  )
  .option(
    '--no-ignore',
    'Ignore eslint ignore configuration files and ignore rules',
  )
  .action(async (cmd) => {
    await installDepsIfThereNo();

    const fixSpinner = ora();
    fixSpinner.start(`Executing ${PACKAGE_NAME} code fix`);

    const { results } = await scanAction({
      cwd,
      fix: true,
      include: cmd.include || cwd,
      ignore: cmd.ignore, // 对应 --no-ignore
    });

    fixSpinner.succeed();
    if (results.length > 0) printReport(results, true);
  });

program
  .command('update')
  .description(`Update ${PACKAGE_NAME} to the latest version`)
  .action(() => updateVersionAction(true));

program.parse(process.argv);
