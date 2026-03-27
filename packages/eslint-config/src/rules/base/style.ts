import stylistic from '@stylistic/eslint-plugin';

export default {
  plugins: {
    '@stylistic': stylistic,
  },
  rules: {
    // ==================== @stylistic/eslint-plugin 规则 ====================
    // 强制在数组开括号后和闭括号前换行
    '@stylistic/array-bracket-newline': 'off',

    // 方括号内部两侧无空格-数组
    '@stylistic/array-bracket-spacing': ['error', 'never'],

    // 强制数组元素间换行
    '@stylistic/array-element-newline': 'off',

    // 单行代码块的大括号内部两侧有空格
    '@stylistic/block-spacing': ['error', 'always'],

    // 大括号换行风格：one true brace style 风格，且单行代码块可不换行
    '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],

    // 使用小驼峰命名风格
    camelcase: 'off',

    // 强制或禁止对注释的第一个字母大写
    'capitalized-comments': 'off',

    // 用逗号分隔的多行结构，始终加上最后一个逗号（单行不用）
    '@stylistic/comma-dangle': ['error', 'always-multiline'],

    // 逗号的前面无空格，后面有空格
    '@stylistic/comma-spacing': ['error', { before: false, after: true }],

    // 用逗号分隔的多行结构，将逗号放到行尾
    '@stylistic/comma-style': ['error', 'last'],

    // 方括号内部两侧无空格-计算属性
    '@stylistic/computed-property-spacing': ['error', 'never'],

    // 使用一致的 this 别名
    'consistent-this': 'off',

    // 在文件末尾保留一行空行
    '@stylistic/eol-last': ['warn', 'always'],

    // 函数名与调用它的括号间无空格
    '@stylistic/function-call-spacing': ['error', 'never'],

    // 要求函数名与赋值给它们的变量名或属性名相匹配
    'func-name-matching': [
      'off',
      'always',
      {
        includeCommonJSModuleExports: false,
      },
    ],

    // 要求或禁止命名的函数表达式
    'func-names': 'off',

    // 强制只能使用函数声明或函数表达式
    'func-style': 'off',

    // 在函数的小括号内使用一致的换行风格
    '@stylistic/function-paren-newline': ['error', 'consistent'],

    // 禁用指定的标识符
    'id-denylist': 'off',

    // 强制标识符的最小和最大长度
    'id-length': 'off',

    // 要求标识符匹配一个指定的正则表达式
    'id-match': 'off',

    // 隐式返回的箭头函数体不要换行
    // @reason 同 prettier 有冲突
    '@stylistic/implicit-arrow-linebreak': ['off', 'beside'],

    // 使用 2 个空格缩进
    // @unessential
    '@stylistic/indent': [
      'error',
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,
        // MemberExpression: null,
        FunctionDeclaration: {
          parameters: 1,
          body: 1,
        },
        FunctionExpression: {
          parameters: 1,
          body: 1,
        },
        CallExpression: {
          arguments: 1,
        },
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
        flatTernaryExpressions: false,
        // 列表来源于 https://github.com/benjamn/ast-types/blob/HEAD/def/jsx.js
        ignoredNodes: [
          'JSXElement',
          'JSXElement > *',
          'JSXAttribute',
          'JSXIdentifier',
          'JSXNamespacedName',
          'JSXMemberExpression',
          'JSXSpreadAttribute',
          'JSXExpressionContainer',
          'JSXOpeningElement',
          'JSXClosingElement',
          'JSXText',
          'JSXEmptyExpression',
          'JSXSpreadChild',
        ],
        ignoreComments: false,
      },
    ],

    // 定义对象字面量时，key, value 之间有且只有一个空格
    '@stylistic/key-spacing': [
      'error',
      { beforeColon: false, afterColon: true },
    ],

    // 关键字前后各一个空格
    '@stylistic/keyword-spacing': [
      'error',
      {
        before: true,
        after: true,
        overrides: {
          return: { after: true },
          throw: { after: true },
          case: { after: true },
        },
      },
    ],

    // 单行最大字符数：100
    '@stylistic/max-len': [
      'warn',
      100,
      2,
      {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],

    // 不要混用空格和 tab
    '@stylistic/no-mixed-spaces-and-tabs': 'error',

    // 禁止出现多个（大于 2 个）连续空行
    '@stylistic/no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],

    // 行尾不要留有空格
    '@stylistic/no-trailing-spaces': [
      'error',
      {
        skipBlankLines: false,
        ignoreComments: false,
      },
    ],

    // 禁止属性调用前有空格
    '@stylistic/no-whitespace-before-property': 'error',

    // 省略大括号的单行语句前不要换行
    '@stylistic/nonblock-statement-body-position': [
      'error',
      'beside',
      { overrides: {} },
    ],

    // 大括号内部两侧有空格
    '@stylistic/object-curly-spacing': ['error', 'always'],

    // 对象的属性需遵循一致的换行风格：即所有属性要么都换行，要么都写在一行
    '@stylistic/object-property-newline': [
      'error',
      {
        allowAllPropertiesOnSameLine: true,
      },
    ],

    // 一行声明一个变量
    '@stylistic/one-var-declaration-per-line': ['error', 'always'],

    // 块的开始和结束不能是空行
    '@stylistic/padded-blocks': [
      'warn',
      { blocks: 'never', classes: 'never', switches: 'never' },
    ],

    // 对象字面量的属性名不要用引号包裹，除非包含特殊字符
    '@stylistic/quote-props': [
      'error',
      'as-needed',
      { keywords: false, unnecessary: true, numbers: false },
    ],

    // 字符串优先使用单引号
    '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],

    // 使用分号
    // @unessential
    '@stylistic/semi': ['error', 'always'],

    // 分号的前面无空格，后面有空格
    '@stylistic/semi-spacing': ['error', { before: false, after: true }],

    // 分号必须写在行尾
    // @unessential
    '@stylistic/semi-style': ['error', 'last'],

    // 块的左大括号前有一个空格
    '@stylistic/space-before-blocks': 'error',

    // 函数声明时，对于命名函数，参数的小括号前无空格；对于匿名函数和 async 箭头函数，参数的小括号前有空格
    '@stylistic/space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],

    // 使用字面量创建对象，此规则不允许在没有参数的情况下调用Object构造函数
    'no-object-constructor': 'error',
  },
};

