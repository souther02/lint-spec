import tsParser from '@typescript-eslint/parser';
import defaultTsConfig from './index';
import vueRuleConfig from '../rules/vue';
import type { Linter } from 'eslint';

export default [
  ...defaultTsConfig,
  ...vueRuleConfig,
  {
    languageOptions: {
      parserOptions: {
        parser: tsParser,
      },
    },
  },
] as Linter.Config[];
