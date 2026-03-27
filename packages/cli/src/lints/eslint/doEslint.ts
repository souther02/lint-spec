import { ESLint } from 'eslint';
import fg from 'fast-glob';
import { DoESLintOptions } from '@/types';
import path from '@/utils/path';
import {
  ESLINT_SCAN_FILE_EXTENSIONS,
  ESLINT_SCAN_IGNORE_PATTERNS,
} from '@/utils/constants';
import { formatESLintResults } from './formatESLintResults';
import { getESLintConfig } from './getESLintConfig';

export async function doESLint(options: DoESLintOptions) {
  let files: string[];
  if (options.files) {
    files = options.files.filter((name) =>
      ESLINT_SCAN_FILE_EXTENSIONS.includes(path.extname(name)),
    );
  } else {
    files = await fg(
      `**/*.{${ESLINT_SCAN_FILE_EXTENSIONS.map((t) => t.replace(/^\./, '')).join(',')}}`,
      {
        cwd: options.cwd,
        ignore: ESLINT_SCAN_IGNORE_PATTERNS,
      },
    );
  }

  const eslint = new ESLint(
    await getESLintConfig(options, options.packages, options.config!),
  );
  const reports = await eslint.lintFiles(files);

  if (options.fix) {
    await ESLint.outputFixes(reports);
  }

  return formatESLintResults(reports, options.quiet!, eslint);
}
