import { globSync } from 'glob';
import type { PackageType } from '@/types';

/**
 * 获取 ESLint 配置类型
 * @param cwd
 * @param packages
 * @returns @lint-spec/eslint-config/index
 * @returns @lint-spec/eslint-config/react
 * @returns @lint-spec/eslint-config/typescript/index
 * @returns @lint-spec/eslint-config/typescript/react
 */
export const getESLintConfigType = (
  cwd: string,
  packages: PackageType,
): string => {
  const tsFiles = globSync('./!(node_modules)/**/*.@(ts|tsx)', { cwd });
  const reactFiles = globSync('./!(node_modules)/**/*.@(jsx|tsx)', { cwd });
  const vueFiles = globSync('./!(node_modules)/**/*.vue', { cwd });
  const dependencies = Object.keys(packages.dependencies || {});
  const language = tsFiles.length > 0 ? '/typescript' : '';
  let dsl = '';

  // dsl判断
  if (
    reactFiles.length > 0 ||
    dependencies.some((name) => /^react(-|$)/.test(name))
  ) {
    dsl = '/react';
  } else if (
    vueFiles.length > 0 ||
    dependencies.some((name) => /^vue(-|$)/.test(name))
  ) {
    dsl = '/vue';
  } else if (dependencies.some((name) => /^rax(-|$)/.test(name))) {
    dsl = '/rax';
  }

  return `@lint-spec/eslint-config/${language}${dsl}`.replace(/\/$/, '/index').replace(/^\//, '');
};
