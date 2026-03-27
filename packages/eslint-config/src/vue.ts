import babelParser from '@babel/eslint-parser';
import defaultConfig from './index';
import vueRuleConfig from './rules/vue';
import type { Linter } from 'eslint';

export default [
  ...defaultConfig,
  ...vueRuleConfig,
  {
    languageOptions: {
      parserOptions: {
        parser: babelParser,
      },
    },
  },
] as Linter.Config[];
