---
title: encode-fe-eslint-config
---

# encode-fe-eslint-config

::: tip
印客学院 JavaScript TypeScript Node 规范
:::

提供了多套配置文件以支持 `JavaScript`、`TypeScript`、`React`、`Vue`、`Node.js` 等多种项目类型。

## JavaScript 项目 - encode-fe-eslint-config

针对未使用 `React` 或 `Vue` 的原生 `JavaScript` 项目，使用 `ESLint` 原生规则和 [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import) 规则，使用 [@babel/eslint-parser](https://www.npmjs.com/package/@babel/eslint-parser) 作为 `parser`，是本包的默认配置。

### 依赖

- [@babel/core](https://www.npmjs.com/package/@babel/core)@^7.16.0
- [@babel/eslint-parser](https://www.npmjs.com/package/@babel/eslint-parser)@^7.16.3
- [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)@^2.25.3

### 安装

```shell
npm i -D encode-fe-eslint-config @babel/core @babel/eslint-parser eslint-plugin-import
```

### 配置

```json
{
  "extends": ["encode-fe-eslint-config"]
}
```

## JavaScript + React 项目 - encode-fe-eslint-config/react

针对 JS React 项目，继承了默认配置，并启用了 [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react) 和 [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) 的规则。

### 安装

```shell
npm i -D encode-fe-eslint-config @babel/core @babel/eslint-parser eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks
```

### 配置

```json
{
  "extends": ["encode-fe-eslint-config/react"]
}
```

## JavaScript + Vue 项目 - encode-fe-eslint-config/vue

针对 `JS Vue` 的项目，继承了默认配置，并启用了 [eslint-plugin-vue](https://www.npmjs.com/package/eslint-plugin-vue) 插件的规则，使用 [vue-eslint-parser](https://www.npmjs.com/package/vue-eslint-parser) 作为 parser。

### 安装

```shell
npm i -D encode-fe-eslint-config @babel/core @babel/eslint-parser eslint-plugin-import vue-eslint-parser eslint-plugin-vue
```

## JavaScript (Node.js) 项目 - encode-fe-eslint-config/node

针对 Node.js 项目，继承了默认配置和 [eslint-config-egg 的规则](https://github.com/eggjs/eslint-config-egg/blob/master/lib/rules/node.js)，规则由 ESLint 原生规则和 [eslint-plugin-node](https://github.com/mysticatea/eslint-plugin-node) 提供。

## TypeScript 项目 - encode-fe-eslint-config/typescript

针对未使用 `React` 或 `Vue` 的 `TypeScript` 项目，继承了默认配置，并启用了 [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin) 插件的规则，使用 [@typescript-eslint/parser](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser) 作为 parser。

### 安装

```shell
npm i -D encode-fe-eslint-config @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-import eslint-import-resolver-typescript
```

## TypeScript + React 项目 - encode-fe-eslint-config/typescript/react

针对 `TS React` 项目，继承了 `JS React` 的配置。

## TypeScript + Vue 项目 - encode-fe-eslint-config/typescript/vue

针对 `TS Vue` 项目，继承了 `JS Vue` 的配置。

## TypeScript (Node.js) 项目 - encode-fe-eslint-config/typescript/node

针对未使用 `React` 和 `Vue` 的 `TypeScript(Node)` 项目。

## 配合 Prettier 使用

如果你的项目使用 [Prettier](https://prettier.io/) 进行代码格式化，本包的一些规则可能会跟 Prettier 格式化结果有冲突。为了避免冲突，你需要手动安装 [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) 和 [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)：

### 安装

```sh
npm install --save-dev eslint-config-prettier eslint-plugin-prettier
```

## 将风格问题降级

为了保证一致的编码风格，本包中大量风格相关的规则被设为了 `error` 级别。如果你觉得风格问题不足以是 `error` 级别，本包还提供了一套名为 'essential' 的配置文件，这套配置将所有风格问题降级为 `warn` 级别。

## 了解更多

- 如果你对 ESLint 还不熟悉，可以阅读官网的 [Getting Started](https://eslint.org/docs/user-guide/getting-started) 快速入门。
- 了解如何为 IDE 配置 ESLint，可以参考官网的 [Integrations](http://eslint.org/docs/user-guide/integrations)。
- 了解如何在继承本包的基础上对项目 ESLint 进行个性化配置，可参考官网的 [Configuring ESLint](https://eslint.org/docs/user-guide/configuring)。