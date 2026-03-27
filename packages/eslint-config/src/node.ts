import type { Linter } from 'eslint';
import defaultConfig from './index';
import nodeRuleConfig from './rules/node';

export default [...defaultConfig, ...nodeRuleConfig] as Linter.Config[];
