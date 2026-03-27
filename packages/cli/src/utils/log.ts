import chalk from 'chalk';
import { PACKAGE_NAME, UnicodeType } from './constants';

const { green, blue, red, yellow } = chalk;

export default {
  success: (msg: string) => console.log(green(msg)),
  info: (msg: string) => console.log(blue(msg)),
  warn: (msg: string) => console.log(yellow(msg)),
  error: (msg: string) => console.log(red(msg)),
  result: (msg: string, isSuccess = true) =>
    console.info(
      blue(`[${PACKAGE_NAME}] ${msg}`),
      isSuccess ? green(UnicodeType.Success) : red(UnicodeType.Fail),
    ),
};
