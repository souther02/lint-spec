import stylistic from '@stylistic/eslint-plugin';

export default {
  plugins: {
    '@stylistic': stylistic,
  },
  rules: {
    // ==================== @stylistic/eslint-plugin 规则 ====================
    // 箭头函数的参数总是使用小括号包裹
    // @unessential
    '@stylistic/arrow-parens': ['warn', 'always'],

    // 箭头函数的箭头前后各留一个空格
    '@stylistic/arrow-spacing': ['error', { before: true, after: true }],

    // generator 函数的 * 号前面无空格，后面有一个空格
    '@stylistic/generator-star-spacing': [
      'error',
      { before: false, after: true },
    ],

    // 避免箭头函数与比较操作符产生混淆
    '@stylistic/no-confusing-arrow': 'error',

    // rest/spread 属性与表达式间无空格
    '@stylistic/rest-spread-spacing': ['error', 'never'],

    // 模板字符串中的大括号内部两侧无空格
    // @unessential
    '@stylistic/template-curly-spacing': 'warn',

    // yield* 表达式的 * 号前面无空格，后面有一个空格
    '@stylistic/yield-star-spacing': ['error', 'after'],

    // ==================== 其他 ESLint 规则 ====================
    // 箭头函数体省略大括号
    'arrow-body-style': [
      'off',
      'as-needed',
      {
        requireReturnForObjectLiteral: false,
      },
    ],
    // 生产环境禁止使用 console
    'no-console': 'warn',

    // constructor 中必须调用 super
    'constructor-super': 'error',

    // 不要对 class 的成员进行重新赋值
    'no-class-assign': 'error',

    // 不要对 const 声明的变量进行重新赋值
    'no-const-assign': 'error',

    // class 成员禁止出现重复命名的参数
    'no-dupe-class-members': 'error',

    // 禁止重复导入
    'no-duplicate-imports': 'off',

    // 禁止使用 new Symbol()
    'no-new-symbol': 'error',

    // 禁止使用指定的模块
    'no-restricted-imports': [
      'off',
      {
        paths: [],
        patterns: [],
      },
    ],

    // 不要在 super 调用前使用 this
    'no-this-before-super': 'error',

    // 禁止在对象中使用不必要的计算属性
    'no-useless-computed-key': 'error',

    // 避免不必要的 constructor
    'no-useless-constructor': 'error',

    // 禁止不必要的重命名
    'no-useless-rename': [
      'error',
      {
        ignoreDestructuring: false,
        ignoreImport: false,
        ignoreExport: false,
      },
    ],

    // 使用 const 或 let 声明变量，不要使用 var
    'no-var': 'error',

    // 使用对象属性和方法的简写语法
    'object-shorthand': [
      'error',
      'always',
      {
        ignoreConstructors: false,
        avoidQuotes: true,
      },
    ],

    // 回调函数使用箭头函数而不是匿名函数
    'prefer-arrow-callback': [
      'error',
      {
        allowNamedFunctions: false,
        allowUnboundThis: true,
      },
    ],

    // 优先使用 const，只有当变量会被重新赋值时才使用 let
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: true,
      },
    ],

    // 使用解构赋值
    // @unessential
    'prefer-destructuring': [
      'warn',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],

    // 禁止使用 parseInt() 和 Number.parseInt()，使用二进制，八进制和十六进制字面量代替
    'prefer-numeric-literals': 'off',

    // 使用 rest 操作符代替 arguments
    'prefer-rest-params': 'warn',

    // 使用扩展运算符代替 .apply()
    'prefer-spread': 'warn',

    // 使用模板字符串代替字符串拼接
    'prefer-template': 'warn',

    // generator 函数内必须有 yield
    'require-yield': 'error',

    // import 排序
    'sort-imports': [
      'off',
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],

    // 创建 Symbol 时必须传入描述
    'symbol-description': 'warn',
  },
};
