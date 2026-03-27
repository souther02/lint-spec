import defaultConfig from '../index';
import tsRuleConfig from '../rules/typescript';
import type { Linter } from 'eslint';

export default [...defaultConfig, ...tsRuleConfig] as Linter.Config[];
