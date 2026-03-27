import fg from 'fast-glob';
import fse from 'fs-extra';
import { LintError, applyFixes } from 'markdownlint';
import { lint } from 'markdownlint/promise';
import { Config, PackageType, ScanOptions } from '@/types';
import path from '@/utils/path';
import {
  MARKDOWNLINT_SCAN_FILE_EXTENSIONS,
  MARKDOWNLINT_SCAN_IGNORE_PATTERNS,
} from '@/utils/constants';
import { formatMarkdownlintResults } from './formatMarkdownlintResults';
import { getMarkdownlintConfig } from './getMarkdownlintConfig';

export interface DoMarkdownlintOptions extends ScanOptions {
  packages: PackageType;
  config?: Config;
}

export async function doMarkdownlint(options: DoMarkdownlintOptions) {
  let files: string[];
  if (options.files) {
    files = options.files.filter((name) =>
      MARKDOWNLINT_SCAN_FILE_EXTENSIONS.includes(path.extname(name)),
    );
  } else {
    const pattern = path.join(
      options.include,
      `**/*.{${MARKDOWNLINT_SCAN_FILE_EXTENSIONS.map((t) => t.replace(/^\./, '')).join(',')}}`,
    );
    files = await fg(pattern, {
      cwd: options.cwd,
      ignore: MARKDOWNLINT_SCAN_IGNORE_PATTERNS,
    });
  }
  const results = await lint({
    ...getMarkdownlintConfig(options, options.packages, options.config!),
    files,
  });
  // 修复
  if (options.fix) {
    await Promise.all(
      Object.keys(results).map((filename) =>
        formatMarkdownFile(filename, results[filename]),
      ),
    );
    for (const file in results) {
      if (!Object.prototype.hasOwnProperty.call(results, file)) continue;
    }
  }
  return formatMarkdownlintResults(results, options.quiet!);
}

async function formatMarkdownFile(filename: string, errors: LintError[]) {
  const fixes = errors?.filter((error) => error.fixInfo);

  if (fixes?.length > 0) {
    const originalText = await fse.readFile(filename, 'utf8');
    const fixedText = applyFixes(originalText, fixes);
    if (originalText !== fixedText) {
      await fse.writeFile(filename, fixedText, 'utf8');
      return errors.filter((error) => !error.fixInfo);
    }
  }
  return errors;
}
