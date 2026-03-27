---
title: JavaScript 编码规范
---

# JavaScript 编码规范

::: tip
`JavaScript` 编码规范主要包含编码风格、语言特性、注释、命名、配套工具等几个部分。本规范面向的 `ECMAScript` 语言版本是 `ES6+`。
:::

## 1. 编码风格

![javascript style](./img/JavaScript.svg)

详细规则如下：

### 1.1. 缩进

- 1.1.1.【强制】使用 2 个空格缩进。`eslint`: [indent](https://eslint.style/rules/indent)

  统一使用 2 个空格缩进，不要使用 4 个空格或 tab 缩进：

  ```javascript
  // bad
  function foo() {
  ∙∙∙∙let name;
  }

  // good
  function foo() {
  ∙∙let name;
  }
  ```

### 1.2. 分号

- 1.2.1.【强制】使用分号。`eslint`: [semi](https://eslint.style/rules/semi)

  统一以分号结束语句，可以避免 JS 引擎自动分号插入机制的怪异行为，在语义上也更加明确。

  > 自动分号插入机制（即 [Automatic Semicolon Insertion](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion)，简称 ASI） 是当 JS 遇到不带分号的语句时判断是否自动添加分号的机制，它在个别情况下的行为比较怪异，可能导致意想不到的效果。此外随着 JS 新特性的增加，异常的情况可能变得更加复杂。

  ```javascript
  // bad - 导致 Uncaught ReferenceError 报错
  const chenghuai = {};
  const huaicheng = {}[(chenghuai, huaicheng)].forEach((jedi) => {
    jedi.father = 'vader';
  });

  // good
  const chenghuai = {};
  const huaicheng = {};
  [chenghuai, huaicheng].forEach((jedi) => {
    jedi.father = 'vader';
  });

  // bad - 导致 Uncaught ReferenceError 报错
  const reaction = "No! That's impossible!"(
    (async function meanwhileOnTheFalcon() {})(),
  );

  // good
  const reaction = "No! That's impossible!";
  (async function meanwhileOnTheFalcon() {})();

  // bad - 函数将返回 `undefined` 而不是换行后的值
  function foo() {
    return;
    ('Result want to be returned');
  }

  // good
  function foo() {
    return 'Result want to be returned';
  }
  ```

### 1.3. 逗号

- 1.3.1.【强制】对于逗号分隔的多行结构，不使用行首逗号。`eslint`: [comma-style](https://eslint.style/rules/comma-style)

  ```javascript
  // bad
  const story = [once, upon, aTime];

  // good
  const story = [once, upon, aTime];

  // bad
  const hero = {
    firstName: 'Ada',
    lastName: 'Lovelace',
    superPower: 'computers',
  };

  // good
  const hero = {
    firstName: 'Ada',
    lastName: 'Lovelace',
    superPower: 'computers',
  };
  ```

- 1.3.2.【强制】对于逗号分隔的多行结构，始终加上最后一个逗号。`eslint`: [comma-dangle](https://eslint.style/rules/comma-dangle)

  这样可以使增删行更加容易，也会使 `git diffs` 更清晰。`Babel` 等编译器会在编译后的代码里帮我们去掉最后额外的逗号，因此不必担心在旧浏览器中的问题。

  ```diff
  // bad - 没有结尾逗号时，新增一行的 git diff 示例
  const hero = {
       firstName: 'Florence',
  -    lastName: 'Nightingale'
  +    lastName: 'Nightingale',
  +    inventorOf: ['coxcomb chart', 'modern nursing']
  };

  // good - 有结尾逗号时，新增一行的 git diff 示例
  const hero = {
       firstName: 'Florence',
       lastName: 'Nightingale',
  +    inventorOf: ['coxcomb chart', 'modern nursing'],
  };
  ```

### 1.4. 块

- 1.4.1【推荐】始终使用大括号包裹代码块。eslint: [curly](https://eslint.org/docs/latest/rules/curly) / [nonblock-statement-body-position](https://eslint.style/rules/nonblock-statement-body-position)

  多行代码块必须用大括号包裹：

  ```javascript
  // bad
  if (foo) bar();
  baz(); // 这一行并不在 if 语句里

  // good
  if (foo) {
    bar();
    baz();
  }
  ```

#### 1.4.2. 大括号换行风格

- 1.4.2.1.【强制】对于非空代码块，采用 `Egyptian Brackets` 风格。eslint: [brace-style](https://eslint.style/rules/brace-style)

  ```javascript
  // bad - else 应与 if 的 } 放在同一行
  if (foo) {
    thing1();
  }
  else
    thing2();
  }

  // good
  if (foo) {
    thing1();
  } else {
    thing2();
  }
  ```

### 1.5. 空格

- 1.5.1.【强制】空格风格。`eslint`: [space-before-blocks](https://eslint.style/rules/space-before-blocks) / [keyword-spacing](https://eslint.style/rules/keyword-spacing) / [space-in-parens](https://eslint.style/rules/space-in-parens) / [array-bracket-spacing](https://eslint.style/rules/array-bracket-spacing) / [object-curly-spacing](https://eslint.style/rules/object-curly-spacing) / [space-infix-ops](https://eslint.style/rules/space-infix-ops) / [key-spacing](https://eslint.style/rules/key-spacing)

  ```javascript
  // bad
  function test() {
    console.log('test');
  }

  // good
  function test() {
    console.log('test');
  }

  // bad
  dog.set('attr', {
    age: '1 year',
    breed: 'Bernese Mountain Dog',
  });

  // good
  dog.set('attr', {
    age: '1 year',
    breed: 'Bernese Mountain Dog',
  });
  ```

### 1.6. 空行

- 1.6.1.【推荐】在文件末尾保留一行空行。`eslint`: [eol-last](https://eslint.style/rules/eol-last)

- 1.6.2.【强制】块的开始和结束不能是空行。`eslint`: [padded-blocks](https://eslint.style/rules/padded-blocks)

### 1.7. 最大字符数和最大行数

- 1.7.1.【推荐】单行最大字符数：100。`eslint`: [max-len](https://eslint.style/rules/max-len)

- 1.7.2.【参考】文件最大行数：1000。`eslint`: [max-lines](https://eslint.org/docs/latest/rules/max-lines)

- 1.7.3.【参考】函数最大行数：80。`eslint`: [max-lines-per-function](https://eslint.org/docs/latest/rules/max-lines-per-function)

## 2. 语言特性

### 2.1. 变量声明

- 2.1.1.【强制】使用 `const` 或 `let` 声明变量。`eslint`: [no-var](https://eslint.org/docs/latest/rules/no-var) / [no-undef](https://eslint.org/docs/latest/rules/no-undef)

  不要使用 `var`：

  ```javascript
  // bad
  var foo = 'foo';
  var bar;

  // good
  const foo = 'foo';
  let bar;
  ```

- 2.1.2.【强制】正确地使用 `const` 和 `let`。`eslint`: [prefer-const](https://eslint.org/docs/rules/prefer-const)

  声明变量时，应优先使用 `const`，只有当变量会被重新赋值时才使用 `let`。

### 2.2. 原始类型

- 2.2.1.【强制】不要使用 `new Number/String/Boolean`。`eslint`: [no-new-wrappers](https://eslint.org/docs/rules/no-new-wrappers)

- 2.2.2.【推荐】类型转换。

  【数字】使用 `Number()` 或 `parseInt()`：

  ```javascript
  const str = '1';

  // bad
  const num = +str;
  const num = str >> 0;
  const num = new Number(str);

  // good
  const num = Number(str);

  // good
  const num = parseInt(str, 10);
  ```

  【字符串】使用 `String()`：

  ```javascript
  const num = 1;

  // bad
  const str = new String(num);
  const str = num + '';
  const str = num.toString();

  // good
  const str = String(num);
  ```

  【布尔值】使用 `!!`：

  ```javascript
  const age = 0;

  // bad
  const hasAge = new Boolean(age);
  const hasAge = Boolean(age);

  // good
  const hasAge = !!age;
  ```

- 2.2.3.【推荐】使用 `parseInt()` 方法时总是带上基数。`eslint`: [radix](https://eslint.org/docs/rules/radix)

#### 2.2.4. 字符串

- 2.2.4.1.【强制】字符串优先使用单引号。`eslint`: [quotes](https://eslint.style/rules/quotes)

  ```javascript
  // bad
  const name = 'tod';
  const name = `tod`; // 模板字符串中应包含变量或换行，否则需用单引号

  // good
  const name = 'tod';
  ```

- 2.2.4.2.【推荐】使用模板字符串替代字符串拼接。eslint: [prefer-template](https://eslint.org/docs/rules/prefer-template)

### 2.3. 数组

- 2.3.1.【强制】使用字面量创建数组。`eslint`: [no-array-constructor](https://eslint.org/docs/rules/no-array-constructor)

- 2.3.2.【强制】某些数组方法的回调函数中必须包含 `return` 语句。`eslint`: [array-callback-return](https://eslint.org/docs/rules/array-callback-return)

- 2.3.3.【推荐】使用扩展运算符 `...` 处理数组。

- 2.3.4.【推荐】使用解构获取数组元素。

### 2.4. 对象

- 2.4.1.【强制】使用字面量创建对象。`eslint`: [no-object-constructor](https://eslint.org/docs/latest/rules/no-object-constructor)

  ```javascript
  // bad
  const obj = new Object();

  // good
  const obj = {};
  ```

  /\*_到这 _/

- 2.4.2【强制】使用对象属性和方法的简写语法。`eslint`: [object-shorthand](https://eslint.org/docs/rules/object-shorthand)

- 2.4.3.【参考】将对象的简写属性写在一起。

- 2.4.4.【强制】对象的属性名不要用引号包裹，除非包含特殊字符。`eslint`: [quote-props](https://eslint.org/docs/rules/quote-props)

- 2.4.5.【强制】优先使用 . 访问对象的属性。`eslint`: [dot-notation](https://eslint.org/docs/rules/dot-notation)

- 2.4.6.【推荐】使用扩展运算符 `...` 处理对象。

- 2.4.7.【推荐】使用解构获取对象属性。eslint: [prefer-destructuring](https://eslint.org/docs/rules/prefer-destructuring)

### 2.5. 函数

- 2.5.1.【强制】不要用 Function 构造函数创建函数。`eslint`: [no-new-func](https://eslint.org/docs/rules/no-new-func)

- 2.5.2.【强制】不要在块中使用函数声明。`eslint`: [no-inner-declarations](https://eslint.org/docs/rules/no-inner-declarations)

- 2.5.3.【参考】使用函数表达式替代函数声明。

- 2.5.4.【强制】使用箭头函数代替匿名函数。`eslint`: [prefer-arrow-callback](https://eslint.org/docs/rules/prefer-arrow-callback)

- 2.5.5.【推荐】箭头函数编码风格。`eslint`: [arrow-parens](https://eslint.org/docs/rules/arrow-parens) [arrow-body-style](https://eslint.org/docs/rules/arrow-body-style)

- 2.5.6.【强制】不要将函数参数命名为 `arguments`。

- 2.5.7.【强制】不要使用 `arguments` 对象。`eslint`: [prefer-rest-params](https://eslint.org/docs/rules/prefer-rest-params)

- 2.5.8.【推荐】使用默认参数语法。

- 2.5.9.【推荐】有默认值的函数参数需要放到参数列表的最后。

- 2.5.10.【推荐】不要修改函数参数。`eslint`: [no-param-reassign](https://eslint.org/docs/rules/no-param-reassign)

### 2.6. 类

- 2.6.1.【推荐】使用 `class` 语句声明类，而不是使用 `prototype。`

- 2.6.2.【推荐】使用 `extends` 语句进行类的继承。

- 2.6.3.【强制】避免不必要的 constructor。

- 2.6.4.【强制】正确地使用 super 方法。eslint: [constructor-super](https://eslint.org/docs/rules/constructor-super) [no-this-before-super](https://eslint.org/docs/rules/no-this-before-super)

- 2.6.5.【强制】避免重复的类成员命名。eslint: [no-dupe-class-members](https://eslint.org/docs/rules/no-dupe-class-members)

### 2.7. 模块

- 2.7.1.【推荐】使用 `ES6 modules` 而非其他非标准的模块系统。`eslint`: [import/module-systems](https://github.com/benmosher/eslint-plugin-import#module-systems)

- 2.7.2.【强制】不要用多个 `import` 引入同一模块。`eslint`: [import/no-duplicates](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-duplicates.md)

- 2.7.3.【强制】import 语句需要放到模块的最上方。`eslint`: [import/first](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md)

- 2.7.4.【强制】禁止 `default import` 的名字跟文件内的其他 `export` 命名相同。`eslint`: [import/no-named-as-default](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default-member.md)

### 2.8. 操作符

- 2.8.1.【推荐】使用严格相等运算符。eslint: [eqeqeq](https://eslint.org/docs/rules/eqeqeq)

- 2.8.2.【强制】不要使用一元自增自减运算符。`eslint`: [no-plusplus](https://eslint.org/docs/rules/no-plusplus)

- 2.8.3.【强制】不要使用 `void` 运算符。`eslint`: [no-void](https://eslint.org/docs/rules/no-void)

- 2.8.4.【强制】避免嵌套的三元表达式。`eslint`: [no-nested-ternary](https://eslint.org/docs/rules/no-nested-ternary)

- 2.8.5.【强制】避免不必要的三元表达式。`eslint`: [no-unneeded-ternary](https://eslint.org/docs/rules/no-unneeded-ternary)

### 2.9. 控制语句

- 2.9.1.【强制】`switch` 语句中的 `case` 需要以 `break` 结尾。`eslint`: [no-fallthrough](https://eslint.org/docs/rules/no-fallthrough)

- 2.9.2.【推荐】`switch` 语句需要始终包含 `default` 分支。`eslint`: [default-case](https://eslint.org/docs/rules/default-case)

- 2.9.3.【参考】`switch` 语句应包含至少 3 个条件分支。

- 2.9.4.【参考】控制语句的嵌套层级不要过深。`eslint`: [max-depth](https://eslint.org/docs/rules/max-depth)

- 2.9.5.【强制】for 循环中的计数器应朝着正确方向移动。`eslint`: [for-direction](https://eslint.org/docs/rules/for-direction)

### 2.10. 其他

- 2.10.1.【强制】禁止使用 `eval`。`eslint`: [no-eval](https://eslint.org/docs/rules/no-eval)

- 2.10.2.【强制】禁止使用 `debugger`。`eslint`: [no-debugger](https://eslint.org/docs/rules/no-debugger)

- 2.10.3.【推荐】禁止使用 `alert`。eslint: [no-alert](https://eslint.org/docs/rules/no-alert)

- 2.10.4.【推荐】生产环境禁止使用 `console`。eslint: [no-console](https://eslint.org/docs/rules/no-console)

- 2.10.5.【强制】禁止对原生对象或只读的全局对象进行赋值。`eslint`: [no-global-assign](https://eslint.org/docs/rules/no-global-assign)

## 3. 注释

- 3.1.【推荐】单行注释使用 //。

- 3.2.【推荐】多行注释使用 /\*_ ... _/，而不是多行的 //。

- 3.3.【强制】注释内容和注释符之间需要有一个空格。eslint: [spaced-comment](https://eslint.org/docs/rules/spaced-comment)

- 3.4.【参考】合理使用特殊注释标记。eslint: [no-warning-comments](https://eslint.org/docs/rules/no-warning-comments)

  有时我们发现某个可能的 bug，但因为一些原因还没法修复；或者某个地方还有一些待完成的功能，这时我们需要使用相应的特殊标记注释来告知未来的自己或合作者。最常用的特殊标记有两种：
  - `// FIXME: 说明问题是什么`
  - `// TODO: 说明还要做什么或者问题的解决方案`

- 3.5.【参考】文档类注释使用 `jsdoc` 规范。

- 3.6.【参考】无用的代码注释应被即时删除。

## 4. 命名

- 4.1.【参考】文件名：使用小写字母命名。

- 4.2.【参考】使用小驼峰（`camelCase`）命名原始类型、对象、函数、实例。[camelcase](https://eslint.org/docs/rules/camelcase)

- 4.3.【强制】使用大驼峰（`PascalCase`）命名类和构造函数。`eslint`: [new-cap](https://eslint.org/docs/rules/new-cap)

- 4.4.【参考】全部大写字母&单词间用下划线分割的命名模式（`UPPERCASE_VARIABLES`）。

- 4.5.【参考】模块相关的命名规范。

- 4.6.【参考】命名不要以下划线开头或结尾。`eslint`: [no-underscore-dangle](https://eslint.org/docs/rules/no-underscore-dangle)

## 参考资料

- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
- [ESLint rules](https://eslint.org/docs/rules/)

