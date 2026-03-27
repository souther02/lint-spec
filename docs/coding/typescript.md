---
title: TypeScript 编码规范
---

# TypeScript 编码规范

::: tip
`TypeScript` 是微软开发的一款开源编程语言，它是 `JavaScript` 的超集，因此其编码规范和配套 `Lint` 工具也与 [JavaScript 编码规范](./javascript.md) 一脉相承。
:::

## 编码风格

![typescript style](./img/typescript.svg)

- 【强制】重载的函数必须写在一起 [@typescript-eslint/adjacent-overload-signatures](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/adjacent-overload-signatures.md)

  ```typescript
  // bad
  declare namespace Foo {
    export function foo(s: string): void;
    export function foo(n: number): void;
    export function bar(): void;
    export function foo(sn: string | number): void;
  }

  // good
  declare namespace Foo {
    export function foo(s: string): void;
    export function foo(n: number): void;
    export function foo(sn: string | number): void;
    export function bar(): void;
  }
  ```

- 【推荐】简单数组类型的定义使用 `T[]`，复杂类型使用 `Array<T>` [@typescript-eslint/array-type](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/array-type.md)

- 【推荐】使用 `TypeScript` 注释指令时需跟随描述说明 [@typescript-eslint/ban-ts-comment](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-ts-comment.md)

- 【强制】禁止使用 `// tslint:<rule-flag>` 等 `tslint` 注释 [@typescript-eslint/ban-tslint-comment](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-tslint-comment.md)

- 【推荐】如果类的属性是一个字面量，则推荐使用只读属性 `readonly` 而不是 `getter` [@typescript-eslint/class-literal-property-style](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/class-literal-property-style.md)

- 【强制】类型断言必须使用 `as Type` [@typescript-eslint/consistent-type-assertions](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-assertions.md)

  ```typescript
  // bad
  const foo = <string>'bar';

  // good
  const foo = 'bar' as string;
  ```

- 【推荐】优先使用 `interface` 定义类型 [@typescript-eslint/consistent-type-definitions](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-definitions.md)

- 【推荐】设置类成员的可访问性 [@typescript-eslint/explicit-member-accessibility](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-member-accessibility.md)

- 【强制】`interface/type` 类型中使用一致的成员分隔符 `;` [@typescript-eslint/member-delimiter-style](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/member-delimiter-style.md)

- 【推荐】类的成员应按照固定的先后顺序排列 [@typescript-eslint/member-ordering](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/member-ordering.md)

- 【推荐】接口中的方法使用属性的方式定义 [@typescript-eslint/method-signature-style](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/method-signature-style.md)

- 【推荐】禁止使用容易混淆的非空断言 [@typescript-eslint/no-confusing-non-null-assertion](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-confusing-non-null-assertion.md)

- 【推荐】避免定义空的接口类型 [@typescript-eslint/no-empty-interface](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-empty-interface.md)

- 【推荐】初始化为 `number/string/boolean` 的变量或参数应避免显式的类型声明 [@typescript-eslint/no-inferrable-types](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-inferrable-types.md)

- 【强制】禁止无意义的 `void` 类型 [@typescript-eslint/no-invalid-void-type](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-invalid-void-type.md)

- 【强制】禁止使用 `namespace` 来定义命名空间 [@typescript-eslint/no-namespace](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-namespace.md)

- 【强制】禁止在 `optional chaining` 之后使用 `non-null` 断言 [@typescript-eslint/no-non-null-asserted-optional-chain](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-non-null-asserted-optional-chain.md)

- 【推荐】使用 `ES2015 import` 语法引入模块 [@typescript-eslint/no-require-imports](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-require-imports.md)

- 【推荐】不建议将 `this` 赋值给其他变量 [@typescript-eslint/no-this-alias](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-this-alias.md)

- 【推荐】当变量的值与类型声明相等时，优先使用 `as const` [@typescript-eslint/prefer-as-const](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-as-const.md)

- 【强制】禁止使用 `module` 来定义命名空间 [@typescript-eslint/prefer-namespace-keyword](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-namespace-keyword.md)

- 【强制】字符串字面量使用单引号包裹 [@typescript-eslint/quotes](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/quotes.md)

- 【推荐】加号 `+` 连接的两侧同为数字或同为字符串 [@typescript-eslint/restrict-plus-operands](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/restrict-plus-operands.md)

- 【强制】禁止使用三斜杠语法 `///` 导入文件 [@typescript-eslint/triple-slash-reference](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/triple-slash-reference.md)

- 【强制】类型声明时应正确添加空格间距 [@typescript-eslint/type-annotation-spacing](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/type-annotation-spacing.md)

- 【强制】`interface` 和 `type` 定义时必须声明成员的类型 [@typescript-eslint/typedef](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/typedef.md)

- 【推荐】定义函数时，优先使用参数的联合类型而不是函数的类型重载 [@typescript-eslint/unified-signatures](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/unified-signatures.md)