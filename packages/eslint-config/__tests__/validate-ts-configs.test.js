/**
 * 验证 TS 规则
 */
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

describe('Validate TS Configs', () => {
  let eslint;
  const configPath = './lib/typescript/index.js';
  const filePath = join(__dirname, './fixtures/ts.ts');
  const tsConfigPath = join(__dirname, './fixtures/tsconfig.json');

  beforeEach(() => {
    eslint = new ESLint({
      overrideConfigFile: configPath,
      ignore: false,
      overrideConfig: {
        languageOptions: {
          parserOptions: {
            projectService: {
              defaultProject: tsConfigPath,
            },
          },
        },
      },
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

    // 验证 eslint-plugin-typescript 工作是否正常
    const { messages } = results[0];
    const errorReportedByReactPlugin = messages.filter((result) => {
      return (
        result.ruleId && result.ruleId.indexOf('@typescript-eslint/') !== -1
      );
    });
    assert.notEqual(errorReportedByReactPlugin.length, 0);

    const errorReportedByNoRedeclare = messages.filter((result) => {
      return result.ruleId === 'no-redeclare';
    });
    assert.equal(errorReportedByNoRedeclare.length, 0);

    // 验证 eslint-import-resolver-typescript 工作是否正常
    const filePath2 = join(__dirname, './fixtures/ts-import-a.ts');
    const filePath3 = join(__dirname, './fixtures/ts-import-b.ts');
    const reports2 = eslint.lintFiles([filePath2, filePath3]);
    assert.ok(reports2.errorCount !== 0 || reports2.warnCount !== 0);
  });
});

describe('Validate VUE TS Configs', () => {
  let eslint;
  const configPath = './lib/typescript/vue.js';
  const filePath = join(__dirname, './fixtures/ts-vue.vue');
  const tsConfigPath = join(__dirname, './fixtures/tsconfig.json');

  beforeEach(() => {
    eslint = new ESLint({
      overrideConfigFile: configPath,
      ignore: false,
      overrideConfig: {
        languageOptions: {
          parserOptions: {
            projectService: {
              defaultProject: tsConfigPath,
            },
          },
        },
      },
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

    // 验证 eslint-plugin-vue 及 @typescript-eslint 工作是否正常
    const { messages } = results[0];
    const errorReportedByReactPlugin = messages.filter((result) => {
      return result.ruleId && result.ruleId.indexOf('vue/') !== -1;
    });
    const errorReportedByTSPlugin = messages.filter((result) => {
      return (
        result.ruleId && result.ruleId.indexOf('@typescript-eslint/') !== -1
      );
    });
    assert.notEqual(errorReportedByReactPlugin.length, 0);
    assert.notEqual(errorReportedByTSPlugin.length, 0);
  });
});

describe('Validate React TS Configs', () => {
  let eslint;
  const configPath = './lib/typescript/react.js';
  const filePath = join(__dirname, './fixtures/ts-react.tsx');
  const tsConfigPath = join(__dirname, './fixtures/tsconfig.json');

  beforeEach(() => {
    eslint = new ESLint({
      overrideConfigFile: configPath,
      ignore: false,
      overrideConfig: {
        languageOptions: {
          parserOptions: {
            projectService: {
              defaultProject: tsConfigPath,
            },
          },
        },
      },
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

    // 验证 eslint-plugin-react 及 @typescript-eslint 工作是否正常
    const { messages } = results[0];
    const errorReportedByReactPlugin = messages.filter((result) => {
      return result.ruleId && result.ruleId.indexOf('react/') !== -1;
    });
    const errorReportedByTSPlugin = messages.filter((result) => {
      return (
        result.ruleId && result.ruleId.indexOf('@typescript-eslint/') !== -1
      );
    });
    assert.notEqual(errorReportedByReactPlugin.length, 0);
    assert.notEqual(errorReportedByTSPlugin.length, 0);
  });
});

describe('Validate Node TS Configs', () => {
  let eslint;
  const configPath = './lib/typescript/node.js';
  const filePath = join(__dirname, './fixtures/ts-node.ts');
  const tsConfigPath = join(__dirname, './fixtures/tsconfig.json');

  beforeEach(() => {
    eslint = new ESLint({
      overrideConfigFile: configPath,
      ignore: false,
      overrideConfig: {
        languageOptions: {
          parserOptions: {
            projectService: {
              defaultProject: tsConfigPath,
            },
          },
        },
      },
    });
  });

  // 验证导出的 config 是否正常
  it('Validate the exported eslint config', async () => {
    const config = await eslint.calculateConfigForFile(filePath);
    assert.ok(isObject(config));
    assert.strictEqual(get(config, 'languageOptions.globals.Node'), false);
    assert.strictEqual(keys(config.plugins).includes('n'), true);
  });

  // 验证已开启的 link 规则是否校验正常
  it('Validate the exported eslint works properly', async () => {
    const results = await eslint.lintFiles([filePath]);
    const { messages, errorCount, warningCount } = results[0];
    const ruleIds = Array.from(messages.map((item) => item.ruleId));

    assert.strictEqual(ruleIds.includes('n/prefer-promises/fs'), true);
    assert.strictEqual(
      ruleIds.includes('@typescript-eslint/no-unused-vars'),
      true,
    );
    assert.strictEqual(ruleIds.includes('no-console'), true);
    assert.strictEqual(ruleIds.includes('no-var'), true);
    assert.strictEqual(ruleIds.includes('@stylistic/eol-last'), true);
    assert.equal(errorCount, 2);
    assert.equal(warningCount, 3);

    // 验证已关闭的 link 规则是否校验正常，以 @typescript-eslint/explicit-function-return-type 为例
    assert.strictEqual(
      ruleIds.includes('@typescript-eslint/explicit-function-return-type'),
      false,
    );
  });
});

describe('Validate Essential TS Configs', () => {
  let eslint;
  const configPath = './lib/essential/typescript/index.js';
  const filePath = join(__dirname, './fixtures/ts.ts');
  const tsConfigPath = join(__dirname, './fixtures/tsconfig.json');

  beforeEach(() => {
    eslint = new ESLint({
      overrideConfigFile: configPath,
      ignore: false,
      overrideConfig: {
        languageOptions: {
          parserOptions: {
            projectService: {
              defaultProject: tsConfigPath,
            },
          },
        },
      },
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

    // 验证黑名单中的规则已关闭
    const { messages } = results[0];

    // 验证 @stylistic/semi 被关闭
    const semiErrors = messages.filter((result) => {
      return result.ruleId === '@stylistic/semi';
    });
    assert.equal(semiErrors.length, 0);

    // 验证一个风格问题被降级
    const styleErrors = messages.filter((result) => {
      return result.ruleId === '@stylistic/object-curly-spacing';
    });
    assert.equal(styleErrors[0].severity, 1);
  });
});

describe('Validate Essential React TS Configs', () => {
  let eslint;
  const configPath = './lib/essential/typescript/react.js';
  const filePath = join(__dirname, './fixtures/ts-react.tsx');
  const tsConfigPath = join(__dirname, './fixtures/tsconfig.json');

  beforeEach(() => {
    eslint = new ESLint({
      overrideConfigFile: configPath,
      ignore: false,
      overrideConfig: {
        languageOptions: {
          parserOptions: {
            projectService: {
              defaultProject: tsConfigPath,
            },
          },
        },
      },
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

    // 验证对 tsx 工作是否正常
    const { messages } = results[0];
    const errorReportedByReactPlugin = messages.filter((result) => {
      return result.ruleId && result.ruleId.indexOf('react/') !== -1;
    });
    assert.notEqual(errorReportedByReactPlugin.length, 0);
    const errorReportedByTSPlugin = messages.filter((result) => {
      return (
        result.ruleId && result.ruleId.indexOf('@typescript-eslint/') !== -1
      );
    });
    assert.notEqual(errorReportedByTSPlugin.length, 0);

    // 验证 @stylistic/semi 被关闭
    const semiErrors = messages.filter((result) => {
      return result.ruleId === '@stylistic/semi';
    });
    assert.equal(semiErrors.length, 0);

    // 验证黑名单中的规则已关闭，取 react/jsx-indent 进行测试
    const errorReportedByReactPluginBlackList = messages.filter((result) => {
      return result.ruleId === 'react/jsx-indent';
    });
    assert.equal(errorReportedByReactPluginBlackList.length, 0);
  });
});

describe('Validate Essential Vue TS Configs', () => {
  let eslint;
  const configPath = './lib/essential/typescript/vue.js';
  const filePath = join(__dirname, './fixtures/ts-vue.vue');
  const tsConfigPath = join(__dirname, './fixtures/tsconfig.json');

  beforeEach(() => {
    eslint = new ESLint({
      overrideConfigFile: configPath,
      ignore: false,
      overrideConfig: {
        languageOptions: {
          parserOptions: {
            projectService: {
              defaultProject: tsConfigPath,
            },
          },
        },
      },
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

    // 验证 vue plugin 工作是否正常
    const result = results[0];
    const errorReportedByReactPlugin = result.messages.filter((message) => {
      return message.ruleId && message.ruleId.indexOf('vue/') !== -1;
    });
    assert.notEqual(errorReportedByReactPlugin.length, 0);

    // 验证黑名单中的规则已关闭
    const errorReportedByReactPluginBlackList = result.messages.filter(
      (message) => {
        return message.ruleId === '@stylistic/indent';
      },
    );
    assert.equal(errorReportedByReactPluginBlackList.length, 0);
  });
});
