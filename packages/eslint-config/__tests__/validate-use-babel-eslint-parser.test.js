import assert from 'node:assert/strict';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ESLint } from 'eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('Validate Use Babel Eslint Parser For React', () => {
  let eslint;
  const configPath = './lib/react.js';
  const filePath = join(__dirname, './fixtures/use-babel-eslint-parser.jsx');

  beforeEach(() => {
    eslint = new ESLint({
      overrideConfigFile: configPath,
      ignore: false,
    });
  });

  it('Validate babel eslint parser run well for react', async () => {
    const results = await eslint.lintFiles(filePath);
    const { messages, errorCount, fatalErrorCount, warningCount } = results[0];

    assert.equal(fatalErrorCount, 0);
    assert.equal(errorCount, 27);
    assert.equal(warningCount, 7);

    const errorReportedByReactPlugin = messages.filter((result) => {
      return result.ruleId && result.ruleId.indexOf('react/') !== -1;
    });

    assert.notEqual(errorReportedByReactPlugin.length, 0);
  });
});

describe('Validate Use Babel Eslint Parser For Vue', () => {
  let eslint;
  const configPath = './lib/vue.js';
  const filePath = join(__dirname, './fixtures/vue.vue');

  beforeEach(() => {
    eslint = new ESLint({
      overrideConfigFile: configPath,
      ignore: false,
    });
  });

  it('Validate babel eslint parser run well for vue', async () => {
    const results = await eslint.lintFiles(filePath);
    const { errorCount, fatalErrorCount, warningCount } = results[0];

    assert.equal(fatalErrorCount, 0);
    assert.equal(errorCount, 4);
    assert.equal(warningCount, 0);
  });
});
