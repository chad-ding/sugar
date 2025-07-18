# sketch

一个由 sugar 脚手架模板生成的 H5 项目

## 开发指导

> 使用 Node18+版本进行开发

为了能够最大限度压缩简单项目的结构，sugar 只提供了一些简单的 API 帮助创建组件操作 dom，下面对一些使用中需要注意的地方进行说明

### 项目结构

1. 项目组件、页面需要放在同一个文件夹下面，必须包含一个 index.js 作为入口 templage.html 和 style.css 是可选的

2. 打包脚本会自动扫描/page 目录下的子目录并生成页面入口，子目录的名称就是访问路径

3. vnode 目录下的类作为主要扩展对象可以进行自定义但不建议写入业务逻辑代码

4. html 模板仅支持单一根节点

5. build 目录下提供了一些本地服务代理、资源编译压缩的配置，可以根据自身需求进行调整

### 样式

1. 项目中默认接入了 tailwindcss 同时使用 postcss 作为样式处理工具，因此可以在 css 中使用 postcss 语法进行样式书写，虽然它没有 less、scss 这样强大的功能但是应对常用业务开发也够用

2. asset/style 目录下以"\_"开头的 css 文件是项目初始化所需的样式，包含基本样式重置以及部分公共组件样式

3. 为了能更好适配深色模式，建议通过内联 svg 的方式来引入图片。使用方式是`<icon src="~@/asset/image/logo.svg"></icon>`，这样打包脚本就会自动将 svg 内联进代码

### api

主要 api 参考 vnode 类

## 附录

### 主要安卓版本对应 WebView 版本

| 主要 Android 版本 | 初始 WebView 版本 |
| :---------------: | :---------------: |
|        13         |        101        |
|        12         |        91         |
|        11         |        83         |
|        10         |        74         |
|         9         |        66         |
|         8         |        58         |
|         7         |        51         |
|         6         |        44         |
|         5         |        37         |
