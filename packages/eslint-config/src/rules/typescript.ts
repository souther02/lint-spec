import type { Linter } from 'eslint';

/**
 * 本文件的规则由 @typescript-eslint 及 @stylistic/eslint-plugin 提供
 * @see https://typescript-eslint.io/rules
 * @see https://eslint.style/rules
 */
import tseslint from 'typescript-eslint';

export default [
  ...tseslint.configs.recommended,
  {
    rules: {
      // ==================== @stylistic/eslint-plugin 规则 ====================
      /**
       * 【强制】大括号换行风格：one true brace style 风格，且单行代码块可不换行
       * @link https://eslint.style/rules/brace-style
       */
      '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],

      /**
       * 【强制】逗号的前面无空格，后面有空格
       * @link https://eslint.style/rules/comma-spacing
       */
      '@stylistic/comma-spacing': ['error', { before: false, after: true }],

      /**
       * 【强制】函数名与调用它的括号间无空格
       * @link https://eslint.style/rules/function-call-spacing
       */
      '@stylistic/function-call-spacing': ['error', 'never'],

      /**
       * 【强制】缩进为两个空格
       * @link https://eslint.style/rules/indent
       */
      '@stylistic/indent': [
        'error',
        2,
        {
          SwitchCase: 1,
          VariableDeclarator: 1,
          outerIIFEBody: 1,
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

      /**
       * 【强制】关键字前后有一个空格
       * @link https://eslint.style/rules/keyword-spacing
       */
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

      /**
       * 【关闭】类成员之间保留一个空行
       * @link https://eslint.style/rules/lines-between-class-members
       */
      '@stylistic/lines-between-class-members': 'off',

      /**
       * 【关闭】禁止不必要的小括号
       * @link https://eslint.style/rules/no-extra-parens
       */
      '@stylistic/no-extra-parens': 'off',

      /**
       * 【强制】禁止不必要的分号
       * @link https://eslint.style/rules/no-extra-semi
       */
      '@stylistic/no-extra-semi': 'error',

      /**
       * 【强制】ts 文件字符串字面量优先使用单引号
       * @link https://eslint.style/rules/quotes
       */
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],

      /**
       * 【强制】添加分号
       * @link https://eslint.style/rules/semi
       */
      '@stylistic/semi': ['error', 'always'],

      /**
       * 【强制】命名函数的空格规则，遵循 JS 约定
       * @link https://eslint.style/rules/space-before-function-paren
       */
      '@stylistic/space-before-function-paren': [
        'error',
        {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always',
        },
      ],

      /**
       * 【强制】定义类型时应正确添加空格
       * @link https://eslint.style/rules/type-annotation-spacing
       */
      '@stylistic/type-annotation-spacing': 'error',

      /**
       * 【强制】interface/type 类型中保持一致的成员分隔符分号「;」，单行类型的最后一个元素不加分号
       * @link https://eslint.style/rules/member-delimiter-style
       */
      '@stylistic/member-delimiter-style': 'error',

      // 在 TypeScript 文件中禁用 `no-undef` 规则，因为它在导出默认接口时会错误报错
      // https://github.com/iamturns/eslint-config-airbnb-typescript/issues/50
      // 如果启用了 `strictNullChecks`（或 `strict`），TypeScript 编译器会捕获到这个错误
      'no-undef': 'off',

      /* Using TypeScript makes it safe enough to disable the checks below */

      // 禁用基于 ESLint 的模块解析检查以改善 monorepo 支持
      // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unresolved.md
      'import/no-unresolved': 'off',
    },
  },
  {
    settings: {
      // 对 TypeScript 文件应用特殊解析
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.d.ts', '.tsx'],
      },
      // 使用 eslint-import-resolver-typescript
      'import/resolver': {
        typescript: {},
      },
      // 将 'ts' 扩展名追加到 'import/extensions' 设置
      'import/extensions': ['.js', '.ts', '.mjs'],
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        extraFileExtensions: ['.vue'],
      },
    },
    rules: {
      /**
       * 【强制】将重载的函数写在一起以增加代码可读性
       * @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/adjacent-overload-signatures.mdx
       */
      '@typescript-eslint/adjacent-overload-signatures': 'error',

      /**
       * 【推荐】简单类型请使用 T[] 或 readonly T[]
       * 对于所有其他类型（联合类型，交集类型，对象类型，函数类型等），请使用 Array<T> 或 ReadonlyArray<T>
       * @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/array-type.mdx
       */
      '@typescript-eslint/array-type': ['warn', { default: 'array-simple' }],

      /**
       * 【关闭】禁止对没有 then 方法的对象使用 await
       * @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/await-thenable.mdx
       */
      '@typescript-eslint/await-thenable': 'off',

      /**
       * 【推荐】使用 @ts-expect-error/@ts-ignore/@ts-nocheck/@ts-check 等指令时需跟随注释描述
       * @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/ban-ts-comment.mdx
       */
      '@typescript-eslint/ban-ts-comment': [
        'warn',
        {
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': 'allow-with-description',
          'ts-nocheck': 'allow-with-description',
          'ts-check': 'allow-with-description',
        },
      ],

      /**
       * 【强制】禁止使用 tslint:<rule-flag> 等相关注释
       * @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/ban-tslint-comment.mdx
       * @reason tslint 已经被废弃
       */
      '@typescript-eslint/ban-tslint-comment': 'error',

      /**
       * 【关闭】禁止使用指定的类型
       * @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-restricted-types.mdx
       */
      '@typescript-eslint/no-restricted-types': 'off',

      /**
       * 【强制】不允许意外使用“空对象”类型
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-empty-object-type.mdx
       */
      '@typescript-eslint/no-empty-object-type': 'error',

      /**
       * 【强制】禁止使用不安全的内置函数类型
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unsafe-function-type.mdx
       */
      '@typescript-eslint/no-unsafe-function-type': 'error',

      /**
       * 【强制】不允许使用令人困惑的内置基元类包装器
       * @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-wrapper-object-types.mdx
       */
      '@typescript-eslint/no-wrapper-object-types': 'error',

      /**
       * 【推荐】类的属性如果是字面量，则必须是只读属性而不能用 getter
       * @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/class-literal-property-style.mdx
       */
      '@typescript-eslint/class-literal-property-style': ['warn', 'fields'],

      /**
       * 【强制】类型断言必须使用 as Type 而非 <T>，对象字面量禁止类型断言（断言成 any 除外）
       * <T> 容易与 JSX 语法混淆
       * @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/consistent-type-assertions.mdx
       */
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        {
          assertionStyle: 'as',
          objectLiteralTypeAssertions: 'allow-as-parameter',
        },
      ],

      /**
       * 【推荐】优先使用 interface 而不是 type 定义对象类型
       * @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/consistent-type-definitions.mdx
       */
      '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],

      /**
       * 【强制】有默认值或可选的参数必须放到最后
       * @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/default-param-last.mdx
       * @extend https://eslint.org/docs/latest/rules/default-param-last
       */
      'default-param-last': 'off',
      '@typescript-eslint/default-param-last': 'error',

      /**
       * 【强制】优先使用 . 访问对象的属性
       * @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/dot-notation.mdx
       * @extend https://eslint.org/docs/latest/rules/dot-notation
       */
      'dot-notation': 'off',
      '@typescript-eslint/dot-notation': ['error', { allowKeywords: true }],

      /**
       * 【关闭】函数返回值必须与声明的类型一致
       * @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/explicit-function-return-type.mdx
       */
      '@typescript-eslint/explicit-function-return-type': 'off',

      /**
       * 【推荐】设置类的成员的可访问性，public 可省略
       * @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/explicit-member-accessibility.mdx
       */
      '@typescript-eslint/explicit-member-accessibility': [
        'warn',
        { accessibility: 'no-public' },
      ],

      /**
       * 【关闭】导出的函数或类中的 public 方法必须定义输入输出参数的类型
       * @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/explicit-module-boundary-types.mdx
       */
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      /**
       * 【关闭】变量必须在定义的时候赋值
       * @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/init-declarations.mdx
       * @extend https://eslint.org/docs/latest/rules/init-declarations
       */
      'init-declarations': 'off',
      '@typescript-eslint/init-declarations': 'off',

      /**
       * 【推荐】类成员的遵循一定的排序规则
       * 1. 类的静态方法/属性(static)优先于实例的方法/属性(instance)
       * 2. 属性(field)优先于构造函数(constructor)，优先于方法(method)
       * 3. 公开的项(public)优先于受保护的(protected)，优先于私有的(private)
       * @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/member-ordering.mdx
       */
      '@typescript-eslint/member-ordering': [
        'warn',
        {
          default: [
            'public-static-field',
            'protected-static-field',
            'private-static-field',
            'static-field',
            'public-static-method',
            'protected-static-method',
            'private-static-method',
            'static-method',
            'public-instance-field',
            'protected-instance-field',
            'private-instance-field',
            'public-field',
            'protected-field',
            'private-field',
            'instance-field',
            'field',
            'constructor',
            'public-instance-method',
            'protected-instance-method',
            'private-instance-method',
            'public-method',
            'protected-method',
            'private-method',
            'instance-method',
            'method',
          ],
        },
      ],

      /**
       * 【推荐】interface 中的方法用属性的方式定义
       * A method and a function property of the same type behave differently.
       * Methods are always bivariant in their argument, while function properties
       * are contravariant in their argument under strictFunctionTypes.
       * @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/method-signature-style.mdx
       */
      '@typescript-eslint/method-signature-style': ['warn', 'property'],

      /**
       * 【关闭】限制各种变量或类型的命名规则
       * @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/naming-convention.mdx
       */
      '@typescript-eslint/naming-convention': 'off',

      /**
       * 【强制】禁止使用 Array 构造函数创建数组
       * @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-array-constructor.mdx
       * @extend https://eslint.org/docs/latest/rules/no-array-constructor
       */
      'no-array-constructor': 'off',
      '@typescript-eslint/no-array-constructor': 'error',

      /**
       * 【关闭】限制 toString 方法的使用
       * @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-base-to-string.mdx
       */
      '@typescript-eslint/no-base-to-string': 'off',

      /**
       * 【推荐】禁止使用容易混淆的非空断言
       * @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-confusing-non-null-assertion.mdx
       */
      '@typescript-eslint/no-confusing-non-null-assertion': 'warn',

      /**
       * 【强制】避免重复的类成员命名
       * @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-dupe-class-members.mdx
       * @extend https://eslint.org/docs/latest/rules/no-dupe-class-members
       */
      'no-dupe-class-members': 'off',
      '@typescript-eslint/no-dupe-class-members': 'error',

      /**
       * 【关闭】delete 时传入的 key 必须是静态的字面量
       * @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-dynamic-delete.mdx
       */
      '@typescript-eslint/no-dynamic-delete': 'off',

      /**
       * 【强制】禁止出现空函数，普通函数（非 async/await/generator）、箭头函数、类上的方法除外
       * @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-empty-function.mdx
       * @extend https://eslint.org/docs/latest/rules/no-empty-function
       */
      'no-empty-function': 'off',
      '@typescript-eslint/no-empty-function': [
        'error',
        {
          allow: ['arrowFunctions', 'functions', 'methods'],
        },
      ],

      /**
       * 【推荐】禁止出现空的 interface
       * @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-empty-interface.mdx
       */
      '@typescript-eslint/no-empty-interface': 'warn',

      /**
       * 【关闭】禁止使用 any
       * @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-explicit-any.mdx
       */
      '@typescript-eslint/no-explicit-any': 'off',

      /**
       * 【关闭】禁止多余的 non-null 断言
       * @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-extra-non-null-assertion.mdx
       */
      '@typescript-eslint/no-extra-non-null-assertion': 'off',

      /**
       * 【关闭】禁止调用 Promise 时没有处理异常情况
       * @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-floating-promises.mdx
       */
      '@typescript-eslint/no-floating-promises': 'off',

      /**
       * 【关闭】禁止对 array 使用 for in 循环
       * @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-for-in-array.mdx
       */
      '@typescript-eslint/no-for-in-array': 'off',

      /**
       * 【强制】禁止使用 eval类型的函数
       * @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-implied-eval.mdx
       *  @extend https://eslint.org/docs/latest/rules/no-implied-eval
       */
      'no-implied-eval': 'off',
      '@typescript-eslint/no-implied-eval': 'error',

      /**
       * 【推荐】禁止给一个初始化时直接赋值为 number, string 的变量显式的声明类型
       * @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-inferrable-types.mdx
       */
      '@typescript-eslint/no-inferrable-types': 'warn',

      /**
       * 【关闭】禁止在 class 外使用 this
       * @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-invalid-this.mdx
       * @extend https://eslint.org/docs/latest/rules/no-invalid-this
       */
      'no-invalid-this': 'off',
      '@typescript-eslint/no-invalid-this': 'off',

      /**
       * 【强制】禁止使用无意义的 void 类型，void 只能用在函数的返回值中
       * @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-invalid-void-type.mdx
       */
      '@typescript-eslint/no-invalid-void-type': 'error',

      /**
       * 【关闭】禁止使用 magic numbers
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-magic-numbers.mdx
       * @extend https://eslint.org/docs/latest/rules/no-magic-numbers
       */
      'no-magic-numbers': 'off',
      '@typescript-eslint/no-magic-numbers': 'off',

      /**
       * 【关闭】禁止在接口中定义 constructor，或在类中定义 new
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-misused-new.mdx
       */
      '@typescript-eslint/no-misused-new': 'off',

      /**
       * 【关闭】避免错误的使用 Promise
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-misused-promises.mdx
       */
      '@typescript-eslint/no-misused-promises': 'off',

      /**
       * 【强制】禁止使用 namespace 来定义命名空间，但允许使用 declare namespace 定义外部命名空间
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-namespace.mdx
       */
      '@typescript-eslint/no-namespace': [
        'error',
        {
          allowDeclarations: true,
          allowDefinitionFiles: true,
        },
      ],

      /**
       * 【强制】禁止在 optional chaining 之后使用 non-null 断言（感叹号）
       * optional chaining 后面的属性一定是非空的
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-non-null-asserted-optional-chain.mdx
       */
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',

      /**
       * 【关闭】禁止使用 non-null 断言（感叹号）
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-non-null-assertion.mdx
       */
      '@typescript-eslint/no-non-null-assertion': 'off',

      /**
       * 【关闭】禁止给类的构造函数的参数添加修饰符
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/parameter-properties.mdx
       */
      '@typescript-eslint/parameter-properties': 'off',

      /**
       * 【推荐】不建议使用 require 引入模块，使用 import
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-require-imports.mdx
       */
      '@typescript-eslint/no-require-imports': 'warn',

      /**
       * 【强制】不允许在外部作用域中声明隐藏变量的变量声明
       * @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-shadow.mdx
       * @extend https://eslint.org/docs/latest/rules/no-shadow
       */
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',

      /**
       * 【推荐】不建议将 this 赋值给其他变量，解构赋值除外
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-this-alias.mdx
       */
      '@typescript-eslint/no-this-alias': [
        'warn',
        {
          allowDestructuring: true,
        },
      ],

      /**
       * 【关闭】表达式中的布尔类型禁止与 true 或 false 直接比较
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unnecessary-boolean-literal-compare.mdx
       */
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',

      /**
       * 【关闭】条件表达式禁止是永远为真（或永远为假）的
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unnecessary-condition.mdx
       */
      '@typescript-eslint/no-unnecessary-condition': 'off',

      /**
       * 【关闭】不允许将同名的参数属性分配给构造函数内的成员
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unnecessary-parameter-property-assignment.mdx
       */
      '@typescript-eslint/no-unnecessary-parameter-property-assignment': 'off',

      /**
       * 【关闭】在命名空间中，可以直接使用内部变量，不需要添加命名空间前缀
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unnecessary-qualifier.mdx
       */
      '@typescript-eslint/no-unnecessary-qualifier': 'off',

      /**
       * 【推荐】不允许不必要的模板表达式
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unsafe-template-expressions.mdx
       */
      '@typescript-eslint/no-unnecessary-template-expression': 'warn',

      /**
       * 【关闭】禁止范型的类型有默认值时，将范型设置为该默认值
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unnecessary-type-arguments.mdx
       */
      '@typescript-eslint/no-unnecessary-type-arguments': 'off',

      /**
       * 【关闭】禁止无用的类型断言
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unnecessary-type-assertion.mdx
       */
      '@typescript-eslint/no-unnecessary-type-assertion': 'off',

      /**
       * 【关闭】不允许调用具有any类型值的函数
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unsafe-argument.mdx
       */
      '@typescript-eslint/no-unsafe-argument': 'off',

      /**
       * 【关闭】禁止将变量或属性的类型设置为 any
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unsafe-assignment.mdx
       */
      '@typescript-eslint/no-unsafe-assignment': 'off',

      /**
       * 【关闭】禁止调用 any 类型的变量上的方法
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unsafe-call.mdx
       */
      '@typescript-eslint/no-unsafe-call': 'off',

      /**
       * 【推荐】禁止合并具有不同类型的声明
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unsafe-declaration-merging.mdx
       */
      '@typescript-eslint/no-unsafe-declaration-merging': 'warn',

      /**
       * 【推荐】禁止将枚举类型与非枚举类型进行比较
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unsafe-enum-comparison.mdx
       */
      '@typescript-eslint/no-unsafe-enum-comparison': 'warn',

      /**
       * 【关闭】禁止获取 any 类型的变量中的属性
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unsafe-member-access.mdx
       */
      '@typescript-eslint/no-unsafe-member-access': 'off',

      /**
       * 【关闭】禁止函数的返回值的类型是 any
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unsafe-return.mdx
       */
      '@typescript-eslint/no-unsafe-return': 'off',

      /**
       * 【推荐】禁止对非数字类型进行负号操作
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unsafe-unary-minus.mdx
       */
      '@typescript-eslint/no-unsafe-unary-minus': 'warn',

      /**
       * 【强制】禁止无用的表达式
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unused-expressions.mdx
       *  @extend https://eslint.org/docs/rules/no-unused-expressions
       */
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],

      /**
       * 【强制】禁止未使用的私有类成员
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unused-private-class-members.mdx
       *  @extend https://eslint.org/docs/rules/no-unused-private-class-members
       */
      'no-unused-private-class-members': 'off',
      '@typescript-eslint/no-unused-private-class-members': 'error',

      /**
       * 【强制】声明的变量必须被使用
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unused-vars.mdx
       *  @extend https://eslint.org/docs/rules/no-unused-vars
       */
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
      ],

      /**
       * 【强制】禁止在定义变量之前就使用它
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-use-before-define.mdx
       *  @extend https://eslint.org/docs/rules/no-use-before-define
       */
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': [
        'error',
        { functions: false, classes: false, variables: false },
      ],

      /**
       * 【强制】禁止出现没必要的 constructor
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-useless-constructor.mdx
       *  @extend https://eslint.org/docs/rules/no-useless-constructor
       */
      'no-useless-constructor': 'off',
      '@typescript-eslint/no-useless-constructor': 'error',

      /**
       * 【关闭】禁止无用的默认赋值
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-useless-default-assignment.mdx
       */
      '@typescript-eslint/no-useless-default-assignment': 'off',

      /**
       * 【强制】禁止无用的空导出
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-useless-empty-export.mdx
       */
      '@typescript-eslint/no-useless-empty-export': 'error',

      /**
       * 【推荐】当设定当前值为当前类型时，推荐使用as const而不是literal type
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-as-const.mdx
       */
      '@typescript-eslint/prefer-as-const': 'warn',

      /**
       * 【关闭】如果索引仅用于访问正在迭代的数组，则建议首选 for of 循环，而不是标准 for 循环
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-for-of.mdx
       */
      '@typescript-eslint/prefer-for-of': 'off',

      /**
       * 【关闭】可以简写为函数类型的接口或对象字面类型的话，则必须简写
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-function-type.mdx
       */
      '@typescript-eslint/prefer-function-type': 'off',

      /**
       * 【关闭】使用 includes 而不是 indexOf
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-includes.mdx
       */
      '@typescript-eslint/prefer-includes': 'off',

      /**
       * 【强制】禁止使用 module 来定义命名空间，declare module 是允许的
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-namespace-keyword.mdx
       */
      '@typescript-eslint/prefer-namespace-keyword': 'error',

      /**
       * 【关闭】使用 ?? 替代 ||
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-nullish-coalescing.mdx
       */
      '@typescript-eslint/prefer-nullish-coalescing': 'off',

      /**
       * 【推荐】使用 optional chaining 替代 && 和 ||
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-optional-chain.mdx
       */
      '@typescript-eslint/prefer-optional-chain': 'warn',

      /**
       * 【关闭】私有变量如果没有在构造函数外被赋值，则必须设为 readonly
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-readonly.mdx
       */
      '@typescript-eslint/prefer-readonly': 'off',

      /**
       * 【关闭】函数的参数必须设置为 readonly
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-readonly-parameter-types.mdx
       */
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',

      /**
       * 【关闭】使用 reduce 方法时，必须传入范型，而不是对第二个参数使用 as 断言
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-reduce-type-parameter.mdx
       */
      '@typescript-eslint/prefer-reduce-type-parameter': 'off',

      /**
       * 【关闭】使用 RegExp#exec 而不是 String#match
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-regexp-exec.mdx
       */
      '@typescript-eslint/prefer-regexp-exec': 'off',

      /**
       * 【关闭】使用 String#startsWith 而不是其他方式
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-string-starts-ends-with.mdx
       */
      '@typescript-eslint/prefer-string-starts-ends-with': 'off',

      /**
       * 【关闭】async 函数的返回值必须是 Promise
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/promise-function-async.mdx
       */
      '@typescript-eslint/promise-function-async': 'off',

      /**
       * 【关闭】async 函数中必须存在 await 语句
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/require-await.mdx
       *  @extend https://eslint.org/docs/rules/require-await
       */
      'require-await': 'off',
      '@typescript-eslint/require-await': 'off',

      /**
       * 【推荐】使用加号时，两者必须同为数字或同为字符串
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/restrict-plus-operands.mdx
       */
      '@typescript-eslint/restrict-plus-operands': 'warn',

      /**
       * 【关闭】模版字符串中的变量类型必须是字符串
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/restrict-template-expressions.mdx
       */
      '@typescript-eslint/restrict-template-expressions': 'off',

      /**
       * 【强制】禁止在 return 语句里使用 await
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/return-await.mdx
       */
      '@typescript-eslint/return-await': 'off',

      /**
       * 【关闭】条件判断必须传入布尔值
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/strict-boolean-expressions.mdx
       */
      '@typescript-eslint/strict-boolean-expressions': 'off',

      /**
       * 【关闭】使用联合类型作为 switch 的对象时，必须包含每一个类型的 case
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/switch-exhaustiveness-check.mdx
       */
      '@typescript-eslint/switch-exhaustiveness-check': 'off',

      /**
       * 【强制】三斜杠导入语法已废弃，在非 dts 文件中禁止使用
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/triple-slash-reference.mdx
       */
      '@typescript-eslint/triple-slash-reference': [
        'error',
        {
          path: 'never',
          types: 'always',
          lib: 'always',
        },
      ],

      /**
       * 【强制】interface 和 type 定义时必须声明成员的类型（在未来的typescript-eslint主要版本中删除）
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/typedef.mdx
       */
      '@typescript-eslint/typedef': [
        'error',
        {
          arrayDestructuring: false,
          arrowParameter: false,
          memberVariableDeclaration: false,
          objectDestructuring: false,
          parameter: false,
          propertyDeclaration: true,
          variableDeclaration: false,
        },
      ],

      /**
       * 【关闭】方法调用时需要绑定到正确的 this 上
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/unbound-method.mdx
       */
      '@typescript-eslint/unbound-method': 'off',

      /**
       * 【推荐】定义函数时，优先使用参数的联合类型而不是函数的类型重载
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/unified-signatures.mdx
       */
      '@typescript-eslint/unified-signatures': 'warn',

      /**
       * 【强制】不允许重复申明
       *  no-redeclare 会导致 typescript 的函数重载报错，详见：
       *  @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-redeclare.mdx
       *  @extend https://eslint.org/docs/rules/no-redeclare
       */
      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': ['error'],
    },
  },
] as Linter.Config[];
