---
title: 文档规范
---

# 文档 规范

## 前言

在撰写文档的时候如果能遵循一点良好的规范，将能**提升所有人的阅读体验**。

## 1. 空格

- 1.1.【强制】中英文之间需要增加空格

  ```markdown
  <!-- bad -->

  HTML 定义网页的结构与内容，CSS 定义其格式与样式，而 JavaScript 则为网页增加可交互性，创作功能丰富的 Web 应用。

  <!-- good -->

  HTML 定义网页的结构与内容，CSS 定义其格式与样式，而 JavaScript 则为网页增加可交互性，创作功能丰富的 Web 应用。
  ```

- 1.2.【强制】中英文与数字之间需要增加空格

- 1.3.【强制】全角标点与其他字符之间不加空格

- 1.4.【强制】半角标点与其他字符之间需要增加空格

- 1.5.【推荐】链接文字前后不需要增加空格

## 2. 标点符号

- 2.1.【推荐】正确使用引号

  中文句子内夹用英文句子时，该英文句子用中文双引号标示，保留英文句子内部的英文标点符号，句末使用中文标点。

- 2.2.【推荐】正确使用省略号

  中文省略号的形式为"……"（中文输入法下 SHIFT + 6），6 个居中小圆点；英文省略号的形式为"..."，3 个齐线小圆点。

- 2.3.【推荐】正确使用破折号

  中文破折号的形式为"——"，长度相当于两个汉字的长度。

## 3. 全角和半角

- 3.1.【强制】中文标点符号使用全角

  ```markdown
  <!-- bad - 中文句子冒号未使用全角 -->

  前端框架: React、Vue、Angular。

  <!-- good -->

  前端框架：React、Vue、Angular。
  ```

- 3.2.【强制】英文和数字使用半角

- 3.3.【强制】完整的英文整句和特殊名词使用半角标点

## 4. 名词

- 4.1.【强制】正确地拼写英文专有词汇

## 附录

前端常用专有名词：

```markdown
HTML, CSS, JavaScript/JS, AJAX, JSON, DOM, BOM, Less, HTTP, HTTPS, WebSocket, ECMAScript, ECMAScript 2015, ECMAScript 6, ES6, ES2015
jQuery, jQuery UI, jQuery Mobile, YUI, Zepto, Dojo
React, React Native, Bootstrap, RequireJS, Sea.js, AngularJS, Backbone.js
Gulp, Grunt, webpack, Yeoman, npm, spm, Babel
Mocha, Jasmine, Should.js
PHP, Java, Node.js
MySQL, MongoDB, Redis
Apache, Nginx
GitHub, GitLab, GitCafe
Chrome, Firefox, Safari, Internet Explore/IE, IE 7, Opera, UC
Android, iOS, Windows, OS X, Ubuntu, Linux, Debian
PC, Mobile, H5
MacBook, MacBook Pro, MacBook Air, iMac, Mac Pro, Mac mini
iPad Air, iPad Air 2, iPad mini, iPhone, iPhone 6s, iPhone 6s Plus, Apple Watch
FPS, UI, URL, URI, URLs, URIs
```

## 参考资料

- [《中文文案排版指北》](https://github.com/sparanoid/chinese-copywriting-guidelines)
- [《标点符号用法》](http://www.moe.gov.cn/ewebeditor/uploadfile/2015/01/13/20150113091548267.pdf)
- [夹用英文的中文文本的标点符号用法（草案）](http://www.moe.gov.cn/ewebeditor/uploadfile/2015/01/13/20150113092346124.pdf)
- [《中文排版需求》](https://www.w3.org/TR/clreq/)