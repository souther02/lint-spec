import type { Linter } from 'eslint';
import tsParser from '@typescript-eslint/parser';
import defaultEssentialTsConfig from './index';
import vueRuleConfig from '../../rules/vue';

export default [
  ...defaultEssentialTsConfig,
  ...vueRuleConfig,
  {
    languageOptions: {
      parserOptions: {
        parser: tsParser,
      },
    },
  },
] as Linter.Config[];
