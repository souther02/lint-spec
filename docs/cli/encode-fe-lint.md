---
title: encode-fe-lint
---

# encode-fe-lint

`encode-fe-lint` 是[印客学院 前端编码规范工程化](https://encode-studio-fe.github.io/fe-spec/)的配套 Lint 工具，可以为项目一键接入规范、一键扫描和修复规范问题，保障项目的编码规范和代码质量。

## 背景

我们引入了多个业界流行的 Linter，并根据规范内容定制了规则包，它们包括：

| 规范 | Lint 工具 | npm 包 |
| --- | --- | --- |
| JavaScript 编码规范 <br/> TypeScript 编码规范 <br/> Node 编码规范 | [ESLint](https://eslint.org/) | [encode-fe-eslint-config](https://www.npmjs.com/package/encode-fe-eslint-config) |
| CSS 编码规范 | [stylelint](https://stylelint.io/) | [encode-fe-stylelint-config](https://www.npmjs.com/package/encode-fe-stylelint-config) |
| Git 规范 | [commitlint](https://commitlint.js.org/#/) | [encode-fe-commitlint-config](https://www.npmjs.com/package/encode-fe-commitlint-config) |
| 文档规范 | [markdownlint](https://github.com/DavidAnson/markdownlint) | [encode-fe-markdownlint-config](https://www.npmjs.com/package/encode-fe-markdownlint-config) |

`encode-fe-lint` 收敛屏蔽了这些依赖和配置细节，提供简单的 CLI 和 Node.js API，让项目能够一键接入、一键扫描、一键修复、一键升级，并为项目配置 git commit 卡口，降低项目接入规范的成本。

## CLI 使用

### 安装

在终端执行：

```bash
npm install encode-fe-lint -g
```

安装完成后，可执行 `encode-fe-lint -h` 以验证安装成功。

### 使用

#### `encode-fe-lint init`：一键接入

在项目根目录执行 `encode-fe-lint init`，即可一键接入规范，为项目安装规范 `Lint` 所需的依赖和配置。

#### `encode-fe-lint scan`：一键扫描

在项目的根目录执行命令，即可扫描项目的规范问题。

支持下列参数：

- `-q` `--quiet` 仅报告 error 级别的问题
- `-o` `--output-report` 输出扫描出的规范问题日志
- `-i` `--include <dirpath>` 指定要进行规范扫描的目录
- `--no-ignore` 忽略 eslint 的 ignore 配置文件和 ignore 规则

#### `encode-fe-lint fix`：一键修复

在项目的根目录执行命令，即可修复部分规范问题。

#### `encode-fe-lint commit-file-scan` 提交文件扫描

在 git commit 时对提交文件进行规范问题扫描，需配合 git 的 pre-commit 钩子使用。

#### `encode-fe-lint commit-msg-scan` 提交信息扫描

git commit 时对 commit message 的格式进行扫描（使用 commitlint），需配合 [husky](https://www.npmjs.com/package/husky) 的 commit-msg 钩子使用。

## Node.js API 使用

### 安装

```bash
npm install encode-fe-lint --save
```

### API

#### init：初始化

- encode-fe-lint.init(config)：将项目一键接入规范，效果等同于 `encode-fe-lint init`

## 配置

`encode-fe-lint` 基于一份配置进行扫描（但你也可以零配置使用），支持的配置参数有：

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| enableESLint | boolean | true | 是否启用 ESLint |
| enableStylelint | boolean | true | 是否启用 stylelint |
| enableMarkdownlint | boolean | true | 是否启用 markdownlint |
| enablePrettier | boolean | - | 是否启用 Prettier |
| eslintOptions | ESLint.Options | - | ESLint 配置项 |
| stylelintOptions | stylelint.LinterOptions | - | stylelint 配置项 |
| markdownlintOptions | markdownlint.Options | - | markdownlint 配置项 |

## 常见问题

### TypeScript 项目扫描性能问题

如果你的 TS 项目 commit 卡口和 `encode-fe-lint scan` 运行时间很长，可以通过如下在 `.eslintrc.js` 中增加以下配置提升性能：

```js
module.exports = {
  parserOptions: {
    project: [], // for lint performance
    createDefaultProgram: false, // for lint performance
  },
  rules: {
    '@typescript-eslint/dot-notation': 0, // for lint performance
    '@typescript-eslint/restrict-plus-operands': 0, // for lint performance
  },
};
```