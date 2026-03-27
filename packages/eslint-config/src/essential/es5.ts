import es5Config from '../es5';
import setStyleToWarnRuleConfig from './rules/set-style-to-warn';
import blacklistRuleConfig from './rules/blacklist';
import type { Linter } from 'eslint';

export default [
  ...es5Config,
  setStyleToWarnRuleConfig,
  blacklistRuleConfig,
  {
    rules: {
      // 逗号风格 - ES5 中不加最后一个逗号
      // @unessential
      'comma-dangle': ['warn', 'never'],
    },
  },
] as Linter.Config[];
