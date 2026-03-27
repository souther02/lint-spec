import fg from 'fast-glob';
import { extname, join } from 'path';
import stylelint from 'stylelint';
import { PackageType, ScanOptions } from '@/types';
import {
  STYLELINT_SCAN_FILE_EXTENSIONS,
  STYLELINT_SCAN_IGNORE_PATTERNS,
} from '@/utils/constants';
import { formatStylelintResults } from './formatStylelintResults';
import { getStylelintConfig } from './getStylelintConfig';

export interface DoStylelintOptions extends ScanOptions {
  packages: PackageType;
}

export async function doStylelint(options: DoStylelintOptions) {
  let files: string[];

  if (options.files) {
    files = options.files.filter((name) =>
      STYLELINT_SCAN_FILE_EXTENSIONS.includes(extname(name)),
    );
  } else {
    const pattern = join(
      options.include,
      `**/*.{${STYLELINT_SCAN_FILE_EXTENSIONS.map((t: string) => t.replace(/^\./, '')).join(',')}}`,
    );
    files = await fg(pattern, {
      cwd: options.cwd,
      ignore: STYLELINT_SCAN_IGNORE_PATTERNS,
    });
  }
  const data = await stylelint.lint({
    ...getStylelintConfig(options, options.packages, options.config!),
    files,
  });
  return formatStylelintResults(data.results, options.quiet!);
}
