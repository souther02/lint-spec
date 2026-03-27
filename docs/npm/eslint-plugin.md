---
title: encode-fe-eslint-plugin
---

# encode-fe-eslint-plugin

除了本包，你需要同时安装 [ESlint](https://eslint.org/)

```shell
npm install encode-fe-eslint-plugin eslint --save-dev
```

## 使用

### 引入插件

```js
// .eslintrc.js
module.exports = {
  plugin: ['encode-fe-eslint-config'],
  rules: {
    'encode-fe-eslint-plugin/no-secret-info': 'error',
  },
};
```

### 使用 presets

```js
// .eslintrc.js
module.exports = {
  extends: 'plugin:encode-fe-eslint-plugin/recommended',
};
```

## 支持的规则

### `no-broad-semantic-versioning`

不要在 `package.json` 中使用太过宽泛的版本指定方式，包括 `*`、`x` 和 `> x` 。

### `no-http-url`

推荐将 HTTP 链接换为 HTTPS 链接。

### `no-js-in-ts-project`

不推荐在项目中同时存在 `JS` 和 `TS` 文件。

### `no-secret-info`

不在代码中直接通过纯文本值设置 `password` `token` 和 `secret` 信息。