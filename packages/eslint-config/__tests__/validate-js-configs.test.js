import assert from 'node:assert/strict';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ESLint } from 'eslint';
import { sumBy, get, keys } from 'lodash-es';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isObject = (obj) => {
  return typeof obj === 'object' && obj !== null;
};

describe('Validate JS Configs', () => {
  let eslint;
  const configPath = './lib/index.js';
  const filePath = join(__dirname, './fixtures/index.js');

  beforeEach(() => {
    eslint = new ESLint({
      overrideConfigFile: configPath,
      ignore: false,
    });
  });

  // 验证导出的 config 是否正常
  it('Validate the exported eslint config', async () => {
    const config = await eslint.calculateConfigForFile(filePath);
    assert.ok(isObject(config));
  });

  // 验证 lint 工作是否正常
  it('Validate the exported eslint works properly', async () => {
    const results = await eslint.lintFiles(filePath);
    assert.equal(sumBy(results, 'fatalErrorCount'), 0);
    assert.notEqual(sumBy(results, 'errorCount'), 0);
    assert.notEqual(sumBy(results, 'warningCount'), 0);
  });
});

describe('Validate ES5 Configs', () => {
  let eslint;
  const configPath = './lib/es5.js';
  const filePath = join(__dirname, './fixtures/es5.js');

  beforeEach(() => {
    eslint = new ESLint({
      overrideConfigFile: configPath,
      ignore: false,
    });
  });

  // 验证导出的 config 是否正常
  it('Validate the exported eslint config', async () => {
    const config = await eslint.calculateConfigForFile(filePath);
    assert.ok(isObject(config));
  });

  // 验证 lint 工作是否正常
  it('Validate the exported eslint works properly', async () => {
    const results = await eslint.lintFiles(filePath);
    assert.equal(sumBy(results, 'fatalErrorCount'), 0);
    assert.notEqual(sumBy(results, 'errorCount'), 0);
    assert.equal(sumBy(results, 'warningCount'), 0);

    // 验证 es5 覆盖的规则是否正常，取 comma-dangle 进行测试
    const { messages } = results[0];
    const errorReportedByReactPlugin = messages.filter((result) => {
      return result.ruleId === 'comma-dangle';
    });
    assert.notEqual(errorReportedByReactPlugin.length, 0);
  });
});

describe('Validate Vue Configs', () => {
  let eslint;
  const configPath = './lib/vue.js';
  const filePath = join(__dirname, './fixtures/vue.vue');

  beforeEach(() => {
    eslint = new ESLint({
      overrideConfigFile: configPath,
      ignore: false,
    });
  });

  // 验证导出的 config 是否正常
  it('Validate the exported eslint config', async () => {
    const config = await eslint.calculateConfigForFile(filePath);
    assert.ok(isObject(config));
  });

  // 验证 lint 工作是否正常
  it('Validate the exported eslint works properly', async () => {
    const results = await eslint.lintFiles(filePath);
    assert.equal(sumBy(results, 'fatalErrorCount'), 0);
    assert.notEqual(sumBy(results, 'errorCount'), 0);
    assert.equal(sumBy(results, 'warningCount'), 0);

    // 验证 eslint-plugin-vue 工作是否正常
    const { messages } = results[0];
    const errorReportedByReactPlugin = messages.filter((result) => {
      return result.ruleId && result.ruleId.indexOf('vue/') !== -1;
    });
    assert.notEqual(errorReportedByReactPlugin.length, 0);
  });
});

describe('Validate Essential JS Configs', () => {
  let eslint;
  const configPath = './lib/essential/index.js';
  const filePath = join(__dirname, './fixtures/index.js');

  beforeEach(() => {
    eslint = new ESLint({
      overrideConfigFile: configPath,
      ignore: false,
    });
  });

  // 验证导出的 config 是否正常
  it('Validate the exported eslint config', async () => {
    const config = await eslint.calculateConfigForFile(filePath);
    assert.ok(isObject(config));
  });

  // 验证 lint 工作是否正常
  it('Validate the exported eslint works properly', async () => {
    const results = await eslint.lintFiles(filePath);
    assert.equal(sumBy(results, 'fatalErrorCount'), 0);
    assert.equal(sumBy(results, 'errorCount'), 0);
    assert.notEqual(sumBy(results, 'warningCount'), 0);

    // 验证黑名单中的规则已关闭
    const { messages } = results[0];

    // 验证 semi 被关闭
    const semiErrors = messages.filter((result) => {
      return result.ruleId === '@stylistic/semi';
    });
    assert.equal(semiErrors.length, 0);

    // 验证 @stylistic/comma-spacing 被降级
    const commaSpacingErrors = messages.filter((result) => {
      return result.ruleId === '@stylistic/comma-spacing';
    });
    assert.equal(commaSpacingErrors[0].severity, 1);
  });
});

describe('Validate Essential ES5 Configs', () => {
  let eslint;
  const configPath = './lib/essential/es5.js';
  const filePath = join(__dirname, './fixtures/es5.js');

  beforeEach(() => {
    eslint = new ESLint({
      overrideConfigFile: configPath,
      ignore: false,
    });
  });

  // 验证导出的 config 是否正常
  it('Validate the exported eslint config', async () => {
    const config = await eslint.calculateConfigForFile(filePath);
    assert.ok(isObject(config));
  });

  // 验证 lint 工作是否正常
  it('Validate the exported eslint works properly', async () => {
    const results = await eslint.lintFiles(filePath);
    assert.equal(sumBy(results, 'fatalErrorCount'), 0);
    assert.notEqual(sumBy(results, 'errorCount'), 0);
    assert.notEqual(sumBy(results, 'warningCount'), 0);
    // 验证 es5 覆盖的规则是否正常，取 comma-dangle 进行测试
    const { messages } = results[0];
    const errorReportedByReactPlugin = messages.filter((result) => {
      return result.ruleId === 'comma-dangle';
    });
    assert.notEqual(errorReportedByReactPlugin.length, 0);

    // 验证黑名单中的规则已关闭，取 semi 进行测试
    const errorReportedByReactPluginBlackList = messages.filter((result) => {
      return result.ruleId === 'semi';
    });
    assert.equal(errorReportedByReactPluginBlackList.length, 0);
  });
});

describe('Validate Essential Vue Configs', () => {
  let eslint;
  const configPath = './lib/essential/vue.js';
  const filePath = join(__dirname, './fixtures/vue.vue');

  beforeEach(() => {
    eslint = new ESLint({
      overrideConfigFile: configPath,
      ignore: false,
    });
  });

  // 验证导出的 config 是否正常
  it('Validate the exported eslint config', async () => {
    const config = await eslint.calculateConfigForFile(filePath);
    assert.ok(isObject(config));
  });

  // 验证 lint 工作是否正常
  it('Validate the exported eslint works properly', async () => {
    const results = await eslint.lintFiles(filePath);
    assert.equal(sumBy(results, 'fatalErrorCount'), 0);
    assert.notEqual(sumBy(results, 'errorCount'), 0);
    assert.equal(sumBy(results, 'warningCount'), 0);

    // 验证 vue plugin 工作是否正常
    const { messages } = results[0];
    const errorReportedByReactPlugin = messages.filter((result) => {
      return result.ruleId && result.ruleId.indexOf('vue/') !== -1;
    });
    assert.notEqual(errorReportedByReactPlugin.length, 0);

    // 验证黑名单中的规则已关闭
    const errorReportedByReactPluginBlackList = messages.filter((result) => {
      return result.ruleId === 'indent';
    });
    assert.equal(errorReportedByReactPluginBlackList.length, 0);
  });
});

describe('Validate Essential React Configs', () => {
  let eslint;
  const configPath = './lib/essential/react.js';
  const filePath = join(__dirname, './fixtures/react.jsx');

  beforeEach(() => {
    eslint = new ESLint({
      overrideConfigFile: configPath,
      ignore: false,
    });
  });

  // 验证导出的 config 是否正常
  it('Validate the exported eslint config', async () => {
    const config = await eslint.calculateConfigForFile(filePath);
    assert.ok(isObject(config));
  });

  // 验证 lint 工作是否正常
  it('Validate the exported eslint works properly', async () => {
    // 验证 lint 工作是否正常
    const results = await eslint.lintFiles(filePath);
    assert.equal(sumBy(results, 'fatalErrorCount'), 0);
    assert.notEqual(sumBy(results, 'errorCount'), 0);
    assert.notEqual(sumBy(results, 'warningCount'), 0);

    // 验证 react plugin 工作是否正常
    const { messages } = results[0];
    const errorReportedByReactPlugin = messages.filter((result) => {
      return result.ruleId && result.ruleId.indexOf('react/') !== -1;
    });
    assert.notEqual(errorReportedByReactPlugin.length, 0);

    // 验证黑名单中的规则已关闭，取 react/jsx-indent 进行测试
    const errorReportedByReactPluginBlackList = messages.filter((result) => {
      return result.ruleId === 'react/jsx-indent';
    });
    assert.equal(errorReportedByReactPluginBlackList.length, 0);
  });
});

describe('Validate Node Configs', () => {
  let eslint;
  const configPath = './lib/node.js';
  const filePath = join(__dirname, './fixtures/node.js');

  beforeEach(() => {
    eslint = new ESLint({
      overrideConfigFile: configPath,
      ignore: false,
    });
  });

  // 验证导出的 config 是否正常
  it('Validate the exported eslint config', async () => {
    const config = await eslint.calculateConfigForFile(filePath);
    assert.ok(isObject(config));
    assert.strictEqual(get(config, 'languageOptions.globals.Node'), false);
    assert.strictEqual(keys(config.plugins).includes('n'), true);
  });

  // 验证 lint 工作是否正常
  it('Validate the exported eslint works properly', async () => {
    const results = await eslint.lintFiles(filePath);
    const { messages, errorCount, warningCount } = results[0];
    const ruleIds = Array.from(messages.map((item) => item.ruleId));

    assert.strictEqual(ruleIds.includes('n/prefer-promises/fs'), true);
    assert.strictEqual(ruleIds.includes('n/no-new-require'), true);
    assert.strictEqual(ruleIds.includes('no-unused-vars'), true);
    assert.strictEqual(ruleIds.includes('no-redeclare'), true);
    assert.strictEqual(ruleIds.includes('@stylistic/semi'), true);
    assert.strictEqual(ruleIds.includes('@stylistic/quotes'), true);

    assert.strictEqual(errorCount, 8);
    assert.strictEqual(warningCount, 4);

    // 验证已关闭的 link 规则是否校验正常，以 n/exports-style 为例
    assert.strictEqual(ruleIds.includes('n/exports-style'), false);
  });
});
