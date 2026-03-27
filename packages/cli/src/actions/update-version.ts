import { execSync } from 'node:child_process';
import ora from 'ora';
import npmType from '@/utils/npm-type';
import { PACKAGE_NAME, PACKAGE_VERSION } from '@/utils/constants';
import log from '@/utils/log';

/**
 * 检查最新版本号
 */
const checkLatestVersion = async (): Promise<string | null> => {
  try {
    const npm = await npmType;
    const latestVersion = execSync(`${npm} view ${PACKAGE_NAME} version`)
      .toString('utf-8')
      .trim();
    if (PACKAGE_VERSION === latestVersion) {
      return null;
    }

    const compareArray = PACKAGE_VERSION.split('.').map(Number);
    const latestCompareArray = latestVersion.split('.').map(Number);

    // 依次比较版本号每一位大小
    for (let i = 0; i < compareArray.length; i++) {
      if (latestCompareArray[i] > compareArray[i]) {
        return latestVersion;
      }
    }
    return null;
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateVersion = async (autoInstall = true): Promise<void> => {
  const npm = await npmType;
  const checkSpinner = ora(
    `[${PACKAGE_NAME}] Checking for the latest version...`,
  );
  checkSpinner.start();

  try {
    const latestVersion = await checkLatestVersion();
    checkSpinner.stop();

    if (latestVersion && autoInstall) {
      const updateSpinner = ora(
        `[${PACKAGE_NAME}] Found a new version, will upgrade to ${latestVersion}`,
      );
      updateSpinner.start();
      execSync(`${npm} install --global ${PACKAGE_NAME}`);
      updateSpinner.stop();
      log.result(`[${PACKAGE_NAME}] Upgraded to ${latestVersion}`);
    } else if (latestVersion) {
      log.warn(
        `[${PACKAGE_NAME}] Latest version is ${latestVersion}, current version is ${PACKAGE_VERSION}. Please upgrade to the latest version as soon as possible.\nYou can execute ${npm} install --global ${PACKAGE_NAME}@latest to install this version\n`,
      );
    } else if (autoInstall) {
      log.info(
        `[${PACKAGE_NAME}] Current version ${PACKAGE_VERSION} is the latest version`,
      );
    }
  } catch (error) {
    checkSpinner.stop();
    log.error(error instanceof Error ? error.message : String(error));
  }
};

export default updateVersion;
