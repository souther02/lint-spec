import { defineConfig } from 'eslint/config';
import prettierConfig from 'eslint-config-prettier';
import nodeConfig from '@lint-spec/eslint-config/node';

export default defineConfig([
  nodeConfig,
  prettierConfig,
  {
    languageOptions: {
      sourceType: 'module',
    },
    rules: {
      '@typescript-eslint/no-require-imports': 0,
      'no-console': 0,
    },
    ignores: ['node_modules/', 'dist/**/*', 'test/', 'src/config'],
  }
]);
