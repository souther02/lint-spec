import defaultTsConfig from './index';
import nodeRuleConfig from '../rules/node';
import type { Linter } from 'eslint';

export default [...defaultTsConfig, ...nodeRuleConfig] as Linter.Config[];
