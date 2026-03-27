---
title: Git 规范
---

# Git 规范

## 1. Git 提交日志格式规范

### 1.1. 前言

为什么要对 `Git` 提交日志（`message`）的格式进行规范约束？

1. 更方便、快捷地浏览和了解项目的历史信息。
2. 有利于保证提交内容的独立性，避免把所有改动都放在一个提交里面。
3. 便于通过脚本自动化生成 `CHANGELOG`。

### 1.2. 基本的 `message` 格式

```
<type>[optional scope]: <subject>

[optional body]

[optional footer(s)]
```

其中 `message header`（即首行）必选，scope、body 和 footer 可选。

#### 1.2.1. 字数限制

- header（首行）：只有一行，不超过 50 个字符
- body：每行不超过 72 个字符
- footer：每行不超过 72 个字符

#### 1.2.2. 语言选择

**在开源项目中**：推荐使用英文，因为项目的开发者和参与者可能来自世界各地，使用英文可以更广泛的传递信息。

**在内部项目（并且短时间内也不涉及开源）中**：应该选择内部人员普遍能够熟练表达的语言。

### 1.3. message header

#### 1.3.1. type

`type` 用来描述本次提交的改动类型，可选值及对应含义如下：

- `feat`: 新增功能
- `fix`: 修复 bug
- `docs`: 文档相关的改动
- `style`: 对代码的格式化改动，代码逻辑并未产生任何变化(例如代码缩进，分号的移除和添加)
- `test`: 新增或修改测试用例
- `refactor`: 重构代码或其他优化举措
- `chore`: 项目工程方面的改动，代码逻辑并未产生任何变化
- `revert`: 恢复之前的提交

#### 1.3.2. scope

`scope` 用来描述本次提交所涉及到的改动范围（例如模块、功能或其他任何限定的范围）。

#### 1.3.3. subject

subject 用来概括和描述本次提交的改动内容，需注意以下几点：

1. 时态方面使用一般现在时，不要使用过去时。
2. 句式使用祈使句。即一般情况不要增加主语。
3. 句首无需大写，句尾无需结束标点。

### 1.4. message body

日志的内容主体 body 用来描述详细的提交内容，可写可不写，需注意以下几点：

1. 时态方面使用一般现在时，不要用过去时态。
2. 句式视情况而定，一般使用祈使句式。
3. 标点方面遵循一般的文档格式规范。

### 1.5. message footer

footer 通常用于代码评审过程记录、作者签名等。例如：

```markdown
Reported-by: User1 <user1@example.com>
Helped-by: User2 <user2@example.com>
Reviewed-by: User3 <user3@example.com>
Signed-off-by: Author <author@example.com>
```

#### 引用 `Issues`

可以在 `commit` 信息里使用关键字 + `Issue ID` 来表明该提交解决了某个 `Issue`。推荐使用的关键字有：

```markdown
close closes closed fix fixes fixed resolve resolves resolved
```

#### 破坏性变动（`Breaking changes`）

如果本次提交的改动是破坏性的，需要在这里声明。

## 2. Git 分支命名规范

### 2.1. 分支模型选择的说明

目前互联网和社区中流传最广泛的一个分支模型 [Git Flow](https://github.com/nvie/gitflow) 出自 [a-successful-git-branching-model](https://nvie.com/posts/a-successful-git-branching-model/) 这篇十年前的文章，文章作者 Vincent Driessen 在 2020 年三月份的时候已经公开表示，该分支模型已经不适用于现如今持续交付的软件工程方式，推荐在持续交付的软件工程中使用更简单的 [Github Flow](https://guides.github.com/introduction/flow/) 模型。

### 2.2. 分支命名

新建分支的命名格式为：`{type}-{issue id}-the-thing-you-do`

- `type`：和上文 1.3.1 章节中的 type 保持一致
- `issue id`：与分支内容相关的 issue id，如果无关，则可以忽略

### 2.3. 多版本分支命名

在需要同时维护多个版本的项目中，可以每发布一个新的版本就单独拉一个新的分支，例如：

> - `1.0.0-stable`
> - `2.0.0-stable`

## 3. Git tag 命名规范

`Git tag` 就是通过语义化的名称来给仓库标注一个个具体的节点。

命名格式为 `v{semver}`，`semver` 是遵循 [semantic version](https://semver.org/lang/zh-CN/) 的版本号，例如 `v1.2.3`。

## 参考资料

1. [AngularJS 代码贡献指南][angular-contributing]
2. [AngularJS Git Commit Message Conventions][angular-git-conventions]
3. [Karma 的 Git 日志规范][karma-git-msg]
4. [StackOverflow - 在 Git 日志中我该用过去时态还是现在时态？][stackoverflow-git-msg]
5. [一个成功的 Git 分支模型][a-successful-git-branching-model]
6. [Git 基础打标签][git-basic-tag]
7. [每行字符数][cpl]
8. [Conventional Commits][conventionalcommits]

[angular-contributing]: https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md
[stackoverflow-git-msg]: http://stackoverflow.com/questions/3580013/should-i-use-past-or-present-tense-in-git-commit-messages
[karma-git-msg]: http://karma-runner.github.io/0.13/dev/git-commit-msg.html
[angular-git-conventions]: https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#heading=h.j8e4paqkfz0q
[a-successful-git-branching-model]: https://nvie.com/posts/a-successful-git-branching-model/
[git-basic-tag]: https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%89%93%E6%A0%87%E7%AD%BE
[cpl]: https://en.wikipedia.org/wiki/Characters_per_line
[conventionalcommits]: https://www.conventionalcommits.org