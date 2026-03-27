import reactConfig from '../react';
import tsRuleConfig from '../rules/typescript';
import type { Linter } from 'eslint';

export default [...reactConfig, ...tsRuleConfig] as Linter.Config[];
