import fg from 'fast-glob';
import fse from 'fs-extra';
import { resolveConfig, format } from 'prettier';
import { ScanOptions } from '@/types';
import path from '@/utils/path';
import {
  PRETTIER_SCAN_FILE_EXTENSIONS,
  PRETTIER_SCAN_IGNORE_PATTERNS,
} from '@/utils/constants';

async function formatFile(filepath: string) {
  const text = await fse.readFile(filepath, 'utf8');
  const options = await resolveConfig(filepath);
  const formatted = await format(text, { ...options, filepath });
  await fse.writeFile(filepath, formatted, 'utf8');
}

export async function doPrettier(options: ScanOptions) {
  let files: string[] = [];
  if (options.files) {
    files = options.files.filter((name) =>
      PRETTIER_SCAN_FILE_EXTENSIONS.includes(path.extname(name)),
    );
  } else {
    const pattern = path.join(
      options.include,
      `**/*.{${PRETTIER_SCAN_FILE_EXTENSIONS.map((t) => t.replace(/^\./, '')).join(',')}}`,
    ).replace(/\\/g, '/');
    files = await fg(pattern, {
      cwd: options.cwd,
      ignore: PRETTIER_SCAN_IGNORE_PATTERNS,
    });
  }
  await Promise.all(files.map(formatFile));
}
