import { ESLint } from 'eslint';
import stylelint from 'stylelint';
import { Options, LintResults } from 'markdownlint';

export interface PackageType {
  eslintConfig?: any;
  eslintIgnore?: string[];
  stylelint?: any;
  peerDependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  dependencies?: Record<string, string>;
  [key: string]: any;
}

export type NpmType = 'npm' | 'yarn' | 'pnpm';

export interface Config {
  /**
   * 是否启用 ESLint
   *
   * @type {boolean}
   * @memberof Config
   */
  enableESLint?: boolean;
  /**
   * 是否启用 stylelint
   *
   * @type {boolean}
   * @memberof Config
   */
  enableStylelint?: boolean;
  /**
   * 是否启用 markdown lint
   *
   * @type {boolean}
   * @memberof Config
   */
  enableMarkdownlint?: boolean;
  /**
   * 是否启用 prettier
   *
   * @type {boolean}
   * @memberof Config
   */
  enablePrettier?: boolean;
  /**
   * ESLint 配置选项
   *
   * @type {ESLint.Options}
   * @memberof Config
   */
  eslintOptions?: ESLint.Options;
  /**
   * stylelint 配置选项
   *
   * @type {stylelint.LinterOptions}
   * @memberof Config
   */
  stylelintOptions?: stylelint.LinterOptions;
  /**
   * markdownlint 配置选项
   *
   * @type {Options}
   * @memberof Config
   */
  markdownlintOptions?: Options;
}

export interface ScanOptions {
  /**
   * lint 运行的工程目录
   *
   * @type {string}
   * @memberof ScanOptions
   */
  cwd: string;
  /**
   * 进行规范扫描的目录
   *
   * @type {string}
   * @memberof ScanOptions
   */
  include: string;
  /**
   * 进行规范扫描的文件列表
   *
   * @type {string[]}
   * @memberof ScanOptions
   */
  files?: string[];
  /**
   * 仅报告错误信息
   *
   * @type {boolean}
   * @memberof ScanOptions
   */
  quiet?: boolean;
  /**
   * 忽略 eslint ignore 配置文件和 ignore 规则
   *
   * @type {boolean}
   * @memberof ScanOptions
   */
  ignore?: boolean;
  /**
   * 自动修复
   *
   * @type {boolean}
   * @memberof ScanOptions
   */
  fix?: boolean;
  /**
   * 生成报告文件
   *
   * @type {boolean}
   * @memberof ScanOptions
   */
  outputReport?: boolean;
  /**
   * scan 时指定 @lint-spec/cli config，优先级高于 lint-spec.config.js
   *
   * @type {Config}
   * @memberof ScanOptions
   */
  config?: Config;
}

export interface DoESLintOptions extends ScanOptions {
  packages: PackageType;
  config?: Config;
}

export interface ScanResult {
  filePath: string;
  errorCount: number;
  warningCount: number;
  fixableErrorCount: number;
  fixableWarningCount: number;
  messages: Array<{
    line: number;
    column: number;
    rule: string;
    url: string;
    message: string;
    errored: boolean;
  }>;
}

export interface ScanReport {
  results: ScanResult[];
  errorCount: number;
  warningCount: number;
  runErrors: Error[];
}

export interface InitOption {
  /**
   * lint 运行的工程目录
   *
   * @type {string}
   * @memberof InitOptions
   */
  cwd: string;
  /**
   * 是否检查并升级 @lint-spec/cli 的版本
   *
   * @type {boolean}
   * @memberof InitOptions
   */
  checkVersionUpdate: boolean;
  /**
   * 是否需要自动重写 lint 配置
   *
   * @type {boolean}
   * @memberof InitOptions
   */
  rewriteConfig?: boolean;
  /**
   * eslint 类型
   *
   * @type {string}
   * @memberof InitOptions
   */
  eslintType?: string;
  /**
   * 是否启用 ESLint
   *
   * @type {boolean}
   * @memberof InitOptions
   */
  enableESLint?: boolean;
  /**
   * 是否启用 stylelint
   *
   * @type {boolean}
   * @memberof InitOptions
   */
  enableStylelint?: boolean;
  /**
   * 是否启用 markdownlint
   *
   * @type {boolean}
   * @memberof InitOptions
   */
  enableMarkdownlint?: boolean;
  /**
   * 是否启用 prettier
   *
   * @type {boolean}
   * @memberof InitOptions
   */
  enablePrettier?: boolean;
  /**
   * 是否禁用自动在初始化完成后安装依赖
   *
   * @type {boolean}
   * @memberof InitOptions
   */
  disableNpmInstall?: boolean;
}

export interface IGenerateTemplateConfig extends Partial<InitOption> {
  packages: Record<string, any>;
}

export interface IGetLintConfig {
  (options: ScanOptions, packages: PackageType, config: Config): ESLint.Options;

  (
    options: ScanOptions,
    packages: PackageType,
    config: Config,
  ): stylelint.LinterOptions;

  (options: ScanOptions, packages: PackageType, config: Config): Options;
}

export interface IFormatResults {
  (results: ESLint.LintResult[] | stylelint.LintResult[] | LintResults, quiet: boolean): ScanResult[];
}
