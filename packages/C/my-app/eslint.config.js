import { defineConfig } from 'eslint/config';
import lintSpecConfig from '@lint-spec/eslint-config/typescript/react';

export default defineConfig([
  lintSpecConfig,
  {
    ignores: [
    "node_modules",
    "build",
    "dist",
    "coverage",
    "es",
    "lib",
    "**/*.min.js",
    "**/*-min.js",
    "**/*.bundle.js"
],
  },
]);
