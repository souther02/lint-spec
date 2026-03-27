import ora from 'ora';
import type { InitOption, ScanOptions } from '@/types';
import initAction from '@/actions/init';
import scanAction from '@/actions/scan';
import { PACKAGE_NAME } from '@/utils/constants';
import printReport from '@/utils/print-report';


export const init = async (option: Omit<InitOption, 'checkVersionUpdate'>) => {
  return await initAction({
    ...option,
    checkVersionUpdate: false,
  });
};

export const scan = async (options: ScanOptions) => {
  const checking = ora();
  checking.start(`执行 ${PACKAGE_NAME} 代码检查`);

  const report = await scanAction(options);
  const { results, errorCount, warningCount } = report;
  let type = 'succeed';
  if (errorCount > 0) {
    type = 'fail';
  } else if (warningCount > 0) {
    type = 'warn';
  }

  checking[type]();
  if (results.length > 0) printReport(results, false);

  return report;
};
