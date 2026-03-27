import fse from 'fs-extra';
import { doESLint, doMarkdownlint, doPrettier, doStylelint } from '@/lints';
import type {
  Config,
  PackageType,
  ScanOptions,
  ScanReport,
  ScanResult,
} from '@/types';
import path from '@/utils/path';
import { PACKAGE_NAME, CONFIG_FILE_NAME } from '@/utils/constants';

const scanAction = async (options: ScanOptions): Promise<ScanReport> => {
  const { cwd, fix, outputReport, config: scanConfig } = options;

  const readConfigFile = async (pth: string): Promise<any> => {
    const localPath = path.resolve(cwd, pth);
    return fse.existsSync(localPath) ? (await import(localPath)).default : {};
  };

  const packages: PackageType = await readConfigFile('package.json');
  const config: Config = scanConfig || (await readConfigFile(CONFIG_FILE_NAME));
  const runErrors: Error[] = [];
  let results: ScanResult[] = [];

  // prettier
  if (fix && config.enablePrettier !== false) {
    await doPrettier(options);
  }

  // eslint
  if (config.enableESLint !== false) {
    try {
      const eslintResults = await doESLint({ ...options, packages, config });
      results = results.concat(eslintResults);
    } catch (e) {
      runErrors.push(e as Error);
    }
  }

  // stylelint
  if (config.enableStylelint !== false) {
    try {
      const stylelintResults = await doStylelint({
        ...options,
        packages,
        config,
      });
      results = results.concat(stylelintResults);
    } catch (e) {
      runErrors.push(e as Error);
    }
  }

  // markdown
  if (config.enableMarkdownlint !== false) {
    try {
      const markdownlintResults = await doMarkdownlint({
        ...options,
        packages,
        config,
      });
      results = results.concat(markdownlintResults);
    } catch (e) {
      runErrors.push(e as Error);
    }
  }

  // 生成报告报告文件
  if (outputReport) {
    const reportPath = path.resolve(process.cwd(), `./${PACKAGE_NAME}-report.json`);
    fse.outputFile(reportPath, JSON.stringify(results, null, 2), () => {});
  }

  return {
    results,
    errorCount: results.reduce(
      (count, { errorCount }) => count + errorCount,
      0,
    ),
    warningCount: results.reduce(
      (count, { warningCount }) => count + warningCount,
      0,
    ),
    runErrors,
  };
};

export default scanAction;
