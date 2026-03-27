import type { Linter } from 'eslint';
import importPlugin from 'eslint-plugin-import';

/**
 * 本文件的规则由 eslint-plugin-import 提供
 * 与 eslint-plugin-import 推荐配置对齐
 * @see https://github.com/import-js/eslint-plugin-import
 * @see https://github.com/import-js/eslint-plugin-import/blob/main/config/recommended.js
 */
export default [
  importPlugin.flatConfigs.recommended,
  {
    settings: {
      'import/ignore': [
        'node_modules',
        '\\.(coffee|scss|css|less|hbs|svg|json)$',
      ],
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
    rules: {
      /**
       * Static analysis
       */

      // 确保导入指向可解析的文件/模块
      'import/no-unresolved': [
        'error',
        { commonjs: true, amd: true, ignore: ['eslint/config$'] },
      ],

      // 确保命名导入与命名导出相匹配
      'import/named': 'error',

      // 确保默认导入与默认导出相匹配
      'import/default': 'error',

      // 确保导入的命名空间包含被解引用的属性
      'import/namespace': 'error',

      /**
       * Helpful warnings
       */

      // 禁止无效的导出，例如多个默认导出
      'import/export': 'error',

      // import 一个文件时，禁止 default import 的名字跟文件内的命名 export 相同
      'import/no-named-as-default': 'error',

      // 访问 default export 的属性时，如果该文件有与属性同名的命名 export，则给出警告
      'import/no-named-as-default-member': 'warn',

      // 禁止使用 jsdoc 标记为已废弃的导入
      'import/no-deprecated': 'off',

      // 禁止使用无关的包
      'import/no-extraneous-dependencies': 'off',

      // 禁止可变的导出
      'import/no-mutable-exports': 'off',

      /**
       * Module systems
       */

      // 报告可能有歧义的解析目标（脚本 vs 模块）
      'import/unambiguous': 'off',

      // 禁止 require()
      'import/no-commonjs': 'off',

      // 禁止 AMD require/define
      'import/no-amd': 'warn',

      // 禁止 Node.js 内置模块
      'import/no-nodejs-modules': 'off',

      /**
       * Style guide
       */

      // import 语句需要放到模块的最上方
      // @unessential
      'import/first': 'error',

      // 不要用多个 import 引入同一模块
      'import/no-duplicates': 'error',

      // 禁止命名空间导入
      'import/no-namespace': 'off',

      // 确保导入路径中文件扩展名的一致使用
      'import/extensions': 'off',

      // import 语句的排序
      'import/order': [
        'off',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'never',
        },
      ],

      // 在最后一个 import / require 语句后保留一个空行
      'import/newline-after-import': 'warn',

      // 当模块内只有一个 export 时，使用 default export
      'import/prefer-default-export': 'off',

      // 限制哪些文件可以在给定文件夹中导入
      'import/no-restricted-paths': 'off',

      // 禁止模块有太多的依赖项
      'import/max-dependencies': ['off', { max: 10 }],

      // 禁止使用绝对路径导入模块
      'import/no-absolute-path': 'off',

      // 禁止使用表达式的 require() 调用
      'import/no-dynamic-require': 'off',

      // 禁止导入其他模块的子模块
      'import/no-internal-modules': [
        'off',
        {
          allow: [],
        },
      ],

      // 禁止在导入中使用 Webpack loader 语法
      'import/no-webpack-loader-syntax': 'off',

      // 禁止未赋值的导入
      // 如果需要副作用，导入以产生副作用是完全可接受的
      'import/no-unassigned-import': 'off',

      // 禁止 import { default as foo } from './foo.js'
      // 应写成 import foo from './foo.js'
      'import/no-named-default': 'off',

      // 如果模块的默认导出未命名则报告
      'import/no-anonymous-default-export': [
        'off',
        {
          allowArray: false,
          allowArrowFunction: false,
          allowAnonymousClass: false,
          allowAnonymousFunction: false,
          allowLiteral: false,
          allowObject: false,
        },
      ],

      // 强制所有导出都在文件底部声明
      'import/exports-last': 'off',

      // 优先将命名导出分组在单个导出声明中
      'import/group-exports': 'off',

      // 禁止默认导出，这是一条糟糕的规则，不要使用它
      'import/no-default-export': 'off',

      // 不要产生自引用
      'import/no-self-import': 'error',

      // 不要产生循环引用
      'import/no-cycle': ['error', { maxDepth: Infinity }],

      // 确保没有无用的路径段
      'import/no-useless-path-segments': 'off',

      // 动态导入需要一个带有 webpackChunkName 的前导注释
      'import/dynamic-import-chunkname': [
        'off',
        {
          importFunctions: [],
          webpackChunknameFormat: '[0-9a-zA-Z-_/.]+',
        },
      ],

      // 使用此规则防止导入相对父路径中的文件夹
      'import/no-relative-parent-imports': 'off',
    },
  },
] as Linter.Config[];
