import path from './path';
import fse from 'fs-extra';


/**
 * 读取 package.json 内容
 */
export const packages: Record<string, any> = JSON.parse(
  fse.readFileSync(path.join(path.__dirname, '../../package.json'), 'utf8'),
);

/**
 * 包名
 */
export const PACKAGE_NAME: string = packages.name;

/**
 * 包版本号
 */
export const PACKAGE_VERSION: string = packages.version;

/**
 * 命令行名称
 */
export const LINT_CLI_NAME: string = `${PACKAGE_NAME.replace(/^@|(\/\w*)/g, '')}`;

/**
 * 配置文件的名称
 */
export const CONFIG_FILE_NAME: string = `${LINT_CLI_NAME}.config.js`;

/**
 * Unicode 图标
 *
 * @export
 * @enum {number}
 */
export enum UnicodeType {
  /**
   * 成功图标
   */
  Success = '\u2714', // ✔
  /**
   * 失败图标
   */
  Fail = '\u2716', // ✖
}

/**
 * 项目类型
 */
export const PROJECT_TYPES: Array<{ name: string; value: string }> = [
  {
    name: 'Projects that do not use React, Vue, Node.js（JavaScript）',
    value: '/index',
  },
  {
    name: 'Projects that do not use React, Vue, Node.js（TypeScript）',
    value: '/typescript/index',
  },
  {
    name: 'React project（JavaScript）',
    value: '/react',
  },
  {
    name: 'React project（TypeScript）',
    value: '/typescript/react',
  },
  {
    name: 'Rax project（JavaScript）',
    value: '/rax',
  },
  {
    name: 'Rax project（TypeScript）',
    value: '/typescript/rax',
  },
  {
    name: 'Vue project（JavaScript）',
    value: '/vue',
  },
  {
    name: 'Vue project（TypeScript）',
    value: '/typescript/vue',
  },
  {
    name: 'Node.js project（JavaScript）',
    value: '/node',
  },
  {
    name: 'Node.js project（TypeScript）',
    value: '/typescript/node',
  },
  {
    name: 'Old projects using ES5 and earlier versions of JavaScript',
    value: '/es5',
  },
];

/**
 * eslint 扫描文件扩展名
 */
export const ESLINT_SCAN_FILE_EXTENSIONS: Array<string> = [
  '.js',
  '.jsx',
  '.ts',
  '.tsx',
  '.vue',
];

/**
 * eslint 扫描忽略的文件或文件目录
 */
export const ESLINT_SCAN_IGNORE_PATTERNS: Array<string> = [
  'node_modules',
  'build',
  'dist',
  'coverage',
  'es',
  'lib',
  '**/*.min.js',
  '**/*-min.js',
  '**/*.bundle.js',
];

/**
 * stylelint 扫描文件扩展名
 */
export const STYLELINT_SCAN_FILE_EXTENSIONS: Array<string> = [
  '.css',
  '.scss',
  '.less',
  '.acss',
];

/**
 * stylelint 扫描忽略的文件或文件目录
 */
export const STYLELINT_SCAN_IGNORE_PATTERNS: string[] = [
  'node_modules/',
  'build/',
  'dist/',
  'coverage/',
  'es/',
  'lib/',
  '**/*.min.css',
  '**/*-min.css',
  '**/*.bundle.css',
];

/**
 * markdownLint 扫描文件扩展名
 */
export const MARKDOWNLINT_SCAN_FILE_EXTENSIONS: Array<string> = ['.md'];

/**
 * markdownLint 扫描忽略的文件或文件目录
 */
export const MARKDOWNLINT_SCAN_IGNORE_PATTERNS: string[] = [
  'node_modules/',
  'build/',
  'dist/',
  'coverage/',
  'es/',
  'lib/',
];

/**
 * Prettier 扫描文件扩展名
 */
export const PRETTIER_SCAN_FILE_EXTENSIONS: Array<string> = [
  ...ESLINT_SCAN_FILE_EXTENSIONS,
  ...STYLELINT_SCAN_FILE_EXTENSIONS,
  ...MARKDOWNLINT_SCAN_FILE_EXTENSIONS,
];

/**
 * Prettier 扫描忽略的文件或文件目录
 */
export const PRETTIER_SCAN_IGNORE_PATTERNS: string[] = [
  'node_modules/**/*',
  'build/**/*',
  'dist/**/*',
  'lib/**/*',
  'es/**/*',
  'coverage/**/*',
];
