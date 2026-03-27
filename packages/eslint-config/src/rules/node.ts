import nodePlugin from 'eslint-plugin-n';
import type { Linter } from 'eslint';

/**
 * 本文规则由 eslint-plugin-n 提供
 * @see https://github.com/eslint-community/eslint-plugin-n
 */
export default [
  nodePlugin.configs['flat/recommended'],
  {
    rules: {
      /**
       * 禁止对 require 调用使用 new 操作符
       * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-new-require.md
       */
      'n/no-new-require': 'error',

      /**
       * 强制使用 Buffer 或 require("buffer").Buffer
       * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-global/buffer.md
       */
      'n/prefer-global/buffer': ['error', 'always'],

      /**
       * 强制使用 console 或 require("console")
       * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-global/console.md
       */
      'n/prefer-global/console': ['error', 'always'],

      /**
       * 强制使用 process 或 require("process")
       * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-global/process.md
       */
      'n/prefer-global/process': ['error', 'always'],

      /**
       * 强制使用 TextDecoder 或 require("util").TextDecoder
       * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-global/text-decoder.md
       */
      'n/prefer-global/text-decoder': 'off',

      /**
       * 强制使用 TextEncoder 或 require("util").TextEncoder
       * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-global/text-encoder.md
       */
      'n/prefer-global/text-encoder': 'off',

      /**
       * 强制使用 URLSearchParams 或 require("url").URLSearchParams
       * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-global/url-search-params.md
       */
      'n/prefer-global/url-search-params': 'off',

      /**
       * 强制使用 URL 或 require("url").URL
       * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-global/url.md
       */
      'n/prefer-global/url': 'off',

      /**
       * 强制使用 require("dns").promises
       * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-promises/dns.md
       */
      'n/prefer-promises/dns': 'warn',

      /**
       * 强制使用 require("fs").promises
       * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-promises/fs.md
       */
      'n/prefer-promises/fs': 'warn',

      /**
       * 禁止导入私有模块的 import 声明
       * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-unpublished-import.md
       */
      'n/no-unpublished-import': 'off',

      /**
       * 禁止在指定版本上使用不支持的 ECMAScript 内置功能
       * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-unsupported-features/es-builtins.md
       */
      'n/no-unsupported-features/es-builtins': 'off',

      /**
       * 建议正确使用 shebang
       * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/shebang.md
       */
      'n/shebang': 'off',

      /**
       * 禁止在指定版本上使用不支持的 ECMAScript 语法
       * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-unsupported-features/es-syntax.md
       */
      'n/no-unsupported-features/es-syntax': 'off',

      /**
       * 禁止在指定版本上使用不支持的 Node.js 内置 API
       * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-unsupported-features/node-builtins.md
       */
      'n/no-unsupported-features/node-builtins': 'off',

      /**
       * 将 process.exit() 表达式视为与 throw 相同的代码路径
       * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/process-exit-as-throw.md
       */
      'n/process-exit-as-throw': 'off',

      /**
       * 禁止使用已废弃的 API
       * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-deprecated-api.md
       */
      'n/no-deprecated-api': 'off',

      /**
       * 要求在回调中进行错误处理
       * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/handle-callback-err.md
       */
      'n/handle-callback-err': 'off',

      /**
       * 确保遵循 Node.js 风格的错误优先回调模式
       * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-callback-literal.md
       */
      'n/no-callback-literal': 'off',

      /**
       * 禁止对 exports 赋值
       * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-exports-assign.md
       */
      'n/no-exports-assign': 'off',

      /**
       * 禁止导入外部模块的 import 声明
       * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-extraneous-import.md
       */
      'n/no-extraneous-import': 'off',

      /**
       * 禁止导入外部模块的 require() 表达式
       * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-extraneous-require.md
       */
      'n/no-extraneous-require': 'off',

      /**
       * 禁止导入不存在模块的 import 声明
       * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-missing-import.md
       */
      'n/no-missing-import': 'off',

      /**
       * 禁止导入不存在模块的 require() 表达式
       * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-missing-require.md
       */
      'n/no-missing-require': 'off',

      /**
       * 禁止使用 __dirname 和 __filename 进行字符串拼接
       * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-path-concat.md
       */
      'n/no-path-concat': 'off',

      /**
       * 禁止使用 process.exit()
       * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-process-exit.md
       */
      'n/no-process-exit': 'off',

      /**
       * 禁止 npm 忽略的 bin 文件
       * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-unpublished-bin.md
       */
      'n/no-unpublished-bin': 'off',

      /**
       * 禁止导入私有模块的 require() 表达式
       * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-unpublished-require.md
       */
      'n/no-unpublished-require': 'off',

      /**
       * 要求在回调后有 return 语句
       * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/callback-return.md
       */
      'n/callback-return': 'off',

      /**
       * 强制 import 声明中文件扩展名的风格
       * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/file-extension-in-import.md
       */
      'n/file-extension-in-import': 'off',

      /**
       * 要求 require() 调用放在模块的顶层作用域
       * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/global-require.md
       */
      'n/global-require': 'off',

      /**
       * 禁止 require 调用与常规变量声明混合使用
       * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-mixed-requires.md
       */
      'n/no-mixed-requires': 'off',

      /**
       * 禁止使用 process.env
       * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-process-env.md
       */
      'n/no-process-env': 'off',

      /**
       * 禁止通过 import 声明加载指定的模块
       * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-restricted-import.md
       */
      'n/no-restricted-import': 'off',

      /**
       * 禁止通过 require 加载指定的模块
       * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-restricted-require.md
       */
      'n/no-restricted-require': 'off',

      /**
       * 禁止使用同步方法
       * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-sync.md
       */
      'n/no-sync': 'off',

      /**
       * 强制使用 module.exports 或 exports
       * @see https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/exports-style.md
       */
      'n/exports-style': 'off',
    },
  },
] as Linter.Config[];
