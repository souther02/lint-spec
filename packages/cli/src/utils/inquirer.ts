import inquirer from 'inquirer';
import { PROJECT_TYPES } from './constants';

/**
 * 选择项目语言和框架
 *
 * @return {*}
 */
export const chooseEslintType = async (step: number): Promise<string> => {
  const { eslintType } = await inquirer.prompt([
    {
      type: 'select',
      name: 'eslintType',
      message: `Step ${step}. Please select the language (JS/TS) and framework (React/Vue) type of the project:`,
      choices: PROJECT_TYPES,
      default: 'index',
    },
  ]);
  return eslintType;
};

/**
 * 选择是否启用 stylelint
 *
 * @param {number} step
 * @param {boolean} [defaultValue=false]
 * @return {*}  {Promise<boolean>}
 */
export const chooseEnableStylelint = async (
  step: number,
  defaultValue = false,
): Promise<boolean> => {
  const { enableStylelint } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'enableStylelint',
      message: `Step ${step}. Whether to enable stylelint（if there are no style files, it is not necessary）:`,
      default: defaultValue,
    },
  ]);
  return enableStylelint;
};

/**
 * 选择是否启用 markdownlint
 *
 * @param {number} step
 * @return {*}  {Promise<boolean>}
 */
export const chooseEnableMarkdownlint = async (
  step: number,
): Promise<boolean> => {
  const { enableMarkdownlint } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'enableMarkdownlint',
      message: `Step ${step}. Whether to enable markdownlint（if there are no markdown files, it is not necessary）`,
      default: true,
    },
  ]);
  return enableMarkdownlint;
};

/**
 * 选择是否启用 prettier
 *
 * @param {number} step
 * @return {*}  {Promise<boolean>}
 */
export const chooseEnablePrettier = async (step: number): Promise<boolean> => {
  const { enablePrettier } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'enablePrettier',
      message: `Step ${step}. Whether to enable prettier:`,
      default: true,
    },
  ]);
  return enablePrettier;
};
