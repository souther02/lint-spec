import { sync as commandExistsSync } from 'command-exists';
import type { NpmType } from '@/types';

/**
 * npm 类型
 */
const npmType = new Promise<NpmType>((resolve, reject) => {
  if (commandExistsSync('npm')) {
    resolve('npm');
  } else if (commandExistsSync('yarn')) {
    resolve('yarn');
  } else if (commandExistsSync('pnpm')) {
    resolve('pnpm');
  } else {
    reject(new Error('npm, yarn, or pnpm is required'));
  }
});

export default npmType;
