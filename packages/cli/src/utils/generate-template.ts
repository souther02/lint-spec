import fse from 'fs-extra';
import { globSync } from 'glob';
import ejs from 'ejs';
import { mergeWith } from 'lodash-es';
import type { IGenerateTemplateConfig } from '@/types';
import {
  ESLINT_SCAN_IGNORE_PATTERNS,
  STYLELINT_SCAN_FILE_EXTENSIONS,
  STYLELINT_SCAN_IGNORE_PATTERNS,
  MARKDOWNLINT_SCAN_IGNORE_PATTERNS,
} from './constants';
import path from './path';

/**
 * vscode 配置合并
 * @param filepath
 * @param content
 */
const mergeVSCodeConfig = (filepath: string, content: string) => {
  // 无需合并
  if (!fse.existsSync(filepath)) return content;

  try {
    const targetData = fse.readJSONSync(filepath);
    const sourceData = JSON.parse(content);
    return JSON.stringify(
      mergeWith(targetData, sourceData, (target, source) => {
        if (Array.isArray(target) && Array.isArray(source)) {
          return [...new Set(source.concat(target))];
        }
      }),
      null,
      2,
    );
  } catch (e) {
    throw new Error(`合并 vscode 配置失败：${e}`);
  }
};

/**
 * 实例化模版
 *
 * @param {string} cwd
 * @param {Partial<IGenerateTemplateConfig>} config
 * @param {boolean} [vscode]
 */
const generateTemplate = (
  cwd: string,
  config: IGenerateTemplateConfig,
  vscode?: boolean,
) => {
  const templatePath = path.resolve(path.__dirname, '../config');
  const templates = globSync(`${vscode ? '_vscode' : '**'}/*.ejs`, {
    cwd: templatePath,
  });

  for (const name of templates) {
    const filepath = path.resolve(
      cwd,
      name.replace(/\.ejs$/, '').replace(/^_/, '.'),
    );
    let content = ejs.render(
      fse.readFileSync(path.resolve(templatePath, name), 'utf8'),
      {
        eslintIgnores: ESLINT_SCAN_IGNORE_PATTERNS,
        stylelintExtensions: STYLELINT_SCAN_FILE_EXTENSIONS,
        stylelintIgnores: STYLELINT_SCAN_IGNORE_PATTERNS,
        markdownLintIgnores: MARKDOWNLINT_SCAN_IGNORE_PATTERNS,
        ...config,
      },
    );

    // 合并 vscode config
    if (/^_vscode/.test(name)) {
      content = mergeVSCodeConfig(filepath, content);
    }

    // 跳过空文件
    if (!content.trim()) continue;

    fse.outputFileSync(filepath, content, 'utf8');
  }
};

export default generateTemplate;
