---
title: CHANGELOG 规范
---

# CHANGELOG 规范

## 前言

作为一个开发者，我必须为我的项目维护一个更新日志（以下简称 `Changelog`）吗？

1. 如果你在维护一个开源项目，或者公司内部的底层技术产品，那么提供一个 `Changelog` `是必需的。开发者用户很可能需要从一个低版本升级到最新版，Changelog` 可以帮助他们了解新版本有哪些变化。
2. 如果你在开发一个业务应用，那么 `Changelog` 不是必需的。然而提供一个 `Changelog` 会更好。

## 1. 文件

- 1.1.【强制】`Changelog` 文件必须取名为 `CHANGELOG.md`

  使用大写来表明本文件的重要性，相当于是项目仓库元信息的一部分。

- 1.2.【强制】Changelog 文件必须是使用标准 Markdown 语法的文本文件，并以 `.md` 作为后缀

- 1.3.【强制】`Changelog` 文件必须存放在项目根目录下，和 `README.md`、`CONTRIBUTING.md` 等并列

## 2. 格式

规范推荐的标准 `Changelog` 格式如下：

```markdown
# 更新日志

## [<version>](version-diff-url) (<date>)

### <type>

- <desc>
- <desc>

### <type>

- <desc>
- <desc>
```

- 2.1.【强制】文章标题使用「更新日志」作为固定文案。国际化场景使用英文「Change Log」作为固定文案

- 2.2【强制】`Changelog` 内容按版本号降序排列，最新版本放在最前面

- 2.3.【强制】版本号 `version` 需遵循 [SemVer 规范](https://semver.org/lang/zh-CN/)

- 2.4.【推荐】版本号增加一个超链接，指向当前版本和上一个版本之间的 `diff`

- 2.5.【强制】更新日期 `date` 采用 `yyyy-MM-dd` 格式

- 2.6.【推荐】更新类型 `type` 与 Git message header 中的 `type` 相关联，可以不一一对应

  `type` 用以说明更新的类型，推荐值如下：

  - 新增（`Features`）：新增功能。
  - 修复（`Bug Fixes`）：修复 bug。
  - 文档（`Documentation`）：文档新增或者修改。
  - 变更（`Changed`）：对于某些已存在功能所发生的逻辑变化。
  - 优化（`Refactored`）：性能或结构上的优化，并未带来功能的逻辑变化。
  - 即将删除（`Deprecation Warnings`）：即将废弃功能。
  - 删除（`Removed`）：已删除的功能。
  - 重大变更（`Breaking Changes`）：破坏性变动。

- 2.7.【推荐】更新描述 `desc` 内容需要注意以下几点：

  1. 使用完整的句子。
  2. 时态方面使用一般现在时，不要用过去时态。
  3. 句式使用祈使句式。即一般情况不要增加主语。
  4. 注明修复的问题。如有提过 Issue，则在句尾增加 Issue 的 ID 和链接。

## 参考资料

- [Keep a Changelog](https://keepachangelog.com/)
- [Conventional Changelog](https://github.com/conventional-changelog/conventional-changelog/blob/master/packages/conventional-changelog/CHANGELOG.md)
- [Angular Changelog](https://github.com/angular/angular.js/blob/master/CHANGELOG.md)
- [Ant Design Changelog](https://github.com/ant-design/ant-design/blob/master/CHANGELOG.zh-CN.md)