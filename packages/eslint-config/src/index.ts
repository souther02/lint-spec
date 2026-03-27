import type { Linter } from 'eslint';
import babelParser from '@babel/eslint-parser';
import bestPracticesRuleConfig from './rules/base/best-practices';
import possibleErrorsRuleConfig from './rules/base/possible-errors';
import styleRuleConfig from './rules/base/style';
import variablesRuleConfig from './rules/base/variables';
import es6RuleConfig from './rules/base/es6';
import strictRuleConfig from './rules/base/strict';
import importsRuleConfig from './rules/imports';

export default [
  bestPracticesRuleConfig,
  possibleErrorsRuleConfig,
  styleRuleConfig,
  variablesRuleConfig,
  es6RuleConfig,
  strictRuleConfig,
  ...importsRuleConfig,
  {
    languageOptions: {
      parser: babelParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        requireConfigFile: false,
        ecmaFeatures: {
          globalReturn: false,
          impliedStrict: true,
          jsx: true,
        },
      },
    },
  },
] as Linter.Config[];
