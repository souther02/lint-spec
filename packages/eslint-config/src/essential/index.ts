import defaultConfig from '../index';
import setStyleToWarnRuleConfig from './rules/set-style-to-warn';
import blacklistRuleConfig from './rules/blacklist';
import es6BlacklistRuleConfig from './rules/es6-blacklist';
import type { Linter } from 'eslint';

/**
 * essential 级别出口文件仅将会必要的规则设置为 error 级别
 */
export default [
  ...defaultConfig,
  setStyleToWarnRuleConfig,
  blacklistRuleConfig,
  es6BlacklistRuleConfig,
] as Linter.Config[];
