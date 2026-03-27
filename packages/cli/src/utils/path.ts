import nodePath from 'node:path';
import { fileURLToPath } from 'node:url';

const path = {
 ...nodePath,
  get __dirname() {
    return nodePath.dirname(fileURLToPath(import.meta.url));
  },
};

export default path;
