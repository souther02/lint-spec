---
title: Node 编码规范
---

# Node 编码规范

::: tip
`Node.js` 规范主要包含编码风格、安全规范、最佳实践等几个部分，目的是给业务同学提供研发过程中的实质性规范和指导。其中编码风格 follow [eslint-config-egg](https://github.com/eggjs/eslint-config-egg)。
:::

## 1. 编码风格

- 1.1.【推荐】使用 `Node.js` 内置的全局变量。`eslint`: [node/prefer-global](https://github.com/mysticatea/eslint-plugin-node/blob/v11.1.0/docs/rules/prefer-global)

```javascript
// bad
const { Buffer } = require('buffer');
const b = Buffer.alloc(16);
// good
const b = Buffer.alloc(16);

// bad
const { URL } = require('url');
const u = new URL(s);
// good
const u = new URL(s);

// bad
const { URLSearchParams } = require('url');
const u = new URLSearchParams(s);
// good
const u = new URLSearchParams(s);

// bad
const { TextEncoder } = require('util');
const u = new TextEncoder(s);
// good
const u = new TextEncoder(s);

// bad
const { TextDecoder } = require('util');
const u = new TextDecoder(s);
// good
const u = new TextDecoder(s);

// bad
const process = require('process');
process.exit(0);
// good
process.exit(0);

// bad
const console = require('console');
console.log('hello');
// good
console.log('hello');
```

- 1.2.【推荐】使用模块内支持的 `promises` API。`eslint`: [node/prefer-promises](https://github.com/mysticatea/eslint-plugin-node/tree/master/docs/rules/prefer-promises)

`Node.js` 从 `v11.14.0` 开始支持 `require('dns').promises` 和 `require('fs').promises` API。

- 1.3.【推荐】如无特殊需求，模块引用声明放在文件顶端，注意引用顺序。`eslint`: [import/order](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md)

- 1.4.【推荐】抛出异常时，使用原生 `Error` 对象。`eslint`: [no-throw-literal](https://eslint.org/docs/rules/no-throw-literal)

1.5.【推荐】线上环境尽量不要使用 `fs/child_process` 模块的 `sync` 方法，如 `fs.readFileSync()`、`cp.execSync()` 等。

## 2. 安全规范

- 2.1.【强制】在客户端隐藏错误详情。

- 2.2.【强制】隐藏或伪造技术栈和框架标识。

- 2.3.【强制】JSONP 跨域接口必须严格校验访问来源。

- 2.4.【强制】禁止使用从参数或明文 cookie 中获取的用户标识进行敏感信息查询输出。

- 2.5.【强制】防止 SQL 注入。

- 2.6.【推荐】定期检查过期依赖和依赖漏洞升级。

- 2.7.【推荐】用户上传文件不允许至服务器本地，需要上传到 OSS 等服务。

- 2.8.【推荐】服务端 URL 重定向需要设置白名单。

- 2.9.【推荐】对接口入参严格校验。

## 3. 最佳实践

- 3.1.【推荐】应用不应该有状态。

- 3.2.【推荐】尽量不要用 Node.js 应用去托管前端静态文件。

- 3.3.【推荐】把 CPU 密集型任务委托给反向代理。

- 3.4.【推荐】使用 `async/await`，尽量避免使用回调函数。

- 3.5.【推荐】使用 `util.promisify` 处理回调函数，使其返回 `Promise`。

- 3.6.【推荐】使用 Node.js 原生 `Promise`，而不是三方库如 `bluebird`。

- 3.7.【推荐】在类方法中返回 `this` 方便链式调用。

## 参考资料

- [eslint-plugin-security](https://github.com/nodesecurity/eslint-plugin-security)
- [eslint-plugin-node](https://github.com/mysticatea/eslint-plugin-node)
- [airbnb javascript style](https://github.com/airbnb/javascript)