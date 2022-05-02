---
Date: 2022-05-09,
Intro: "周刊的第二篇内容"
---

# 东张西望，周刊闲聊

![](https://images.unsplash.com/photo-1552313655-80e406e98dca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80)

作者：妙才

2022-05-09

记录笔者每周看到的那些值得分享（或许）的科技和其他讯息，周一发布（或多或少）。

> 欢迎 👏🏻 推荐一些值得分享的讯息

#### 惊鸿一瞥

#####

#### 工具

##### 终端补全可视化工具

> [Fig](https://fig.io/)

Fig 是一个具有`IDE`风格的终端补全的开源工具，其支持目前主流的终端软件以及三大`shell`:

- bash
- fish
- zsh

并且支持超过`300+`的 cli 工具补全功能，如果是你终端的重度用户，这个工具绝对不会让你失望。

![](https://fig.io/images/slideshow/screenshots/scripts.png)

响应速度极快，支持自定义的组合键，完全本地运行，或许你可以尝试看看。

#### 技术

##### 1、webFont 字体压缩工具

> [aui/font-spider: Smart webfont compression and format conversion tool](https://github.com/aui/font-spider)

在 web 开发中，有时只想让部分内容展示特定的字体，但是字体文件整体上是非常大的，使用这个库可以自动分析页面使用的 webFont 并进行按需压缩。

##### 2、家用树莓派架设可供外部用户访问的站点

> [Home | Setting up ghost in raspberry pi for free](https://viggy28.dev/article/setting-up-ghost-in-raspberry-pi-for-free/)

如果你是一个 web 开发者，自己开发或者部署了一个应用在家里的设备上，可以试试参考本篇博客，利用端口隐射来实现这个需求，笔者此前见过推特上有开发者对外架设了图书分享的应用，甚至是 NAS 影视应用。

##### 3、Git Commit 和 emoji ❤️

> [gitmoji | An emoji guide for your commit messages](https://gitmoji.dev/)

开发者日常为仓库添加`commit`时，添加一个让自己心情愉悦的`emoji`如何？这个应用支持安装`pwa`，我们可以轻松找到适宜当前`commit`的`emoji`。如果你是一个终端爱好者，还可以配合[carloscuesta/gitmoji: An emoji guide for your commit messages. 😜](https://github.com/carloscuesta/gitmoji)一起食用。

##### 4、创建适宜的 .gitignore 文件

> [gitignore.io - 为你的项目创建必要的 .gitignore 文件](https://www.toptal.com/developers/gitignore)

UI 界面可以搜索关键词创建初始化`.gitignore`文件，笔者比较推荐的是使用其命令行功能，官方提供了不同系统和`shell`类型的命令功能。举个例子分享：

###### Fish

终端输入：

```bash
printf "function gi\n\tcurl -sL https://www.toptal.com/developers/gitignore/api/\$argv\nend\n" > \
~/.config/fish/functions/gi.fish
```

创建一个函数文件`gi`，再在`fish`的配置文件中添加函数：

```bash
function cgi --description 'add .gitignore file'
	gi $argv > .gitignore
end
```

以后就可以用`cgi+关键词`创建初始化的`.gitignore`文件了。

> 如果有兴趣，也可以看看我的朋友开发的工具：[iTonyYo/setgit-cli](https://github.com/iTonyYo/setgit-cli)

##### 最后

再次开了一个坑，或许能督促自己多了解新的资讯！
