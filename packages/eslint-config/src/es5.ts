import type { Linter } from 'eslint';
import bestPracticesRuleConfig from './rules/base/best-practices';
import possibleErrorsRuleConfig from './rules/base/possible-errors';
import styleRuleConfig from './rules/base/style';
import variablesRuleConfig from './rules/base/variables';
import es5RuleConfig from './rules/es5';

export default [
  bestPracticesRuleConfig,
  possibleErrorsRuleConfig,
  styleRuleConfig,
  variablesRuleConfig,
  es5RuleConfig,
] as Linter.Config[];
