import defaultConfig from './index';
import reactRuleConfig from './rules/react';
import type { Linter } from 'eslint';

export default [
  ...defaultConfig,
  reactRuleConfig,
  {
    languageOptions: {
      parserOptions: {
        babelOptions: {
          presets: ['@babel/preset-react'],
        },
      },
    },
  },
] as Linter.Config[];
