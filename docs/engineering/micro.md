# 微前端

## 特点

- 技术栈无关
- 独立运行、独立部署

- 共性问题
- 应用的加载与切换
  - 路由
    - Single-SPA
  - 应用加载
    - 协议接入
      - 生命周期钩子：bootstrap、mount、unmount
  - 应用入口
    - 乾坤：HTML Entry
      - 包含了网页结构与元信息，JS 与 css 等资源
    - 随手：webpack-stats-plugin
      - mainfest.json
- 应用的隔离与通信
  - JS 隔离
    - 快照沙箱
      - windows diff（无法支持多实例）
      - ES6 的 proxy
    - [微前端 JS 沙箱常见实现方式][JS沙箱]
  - 样式隔离
    - BEM 规范
    - css module
      - css 预处理器
    - css-in-JS
    - Shadow DOM
      - 基于 Web Component
  - 父子、子子应用通信
    - 基于 URL
    - 发布/订阅模型
      - window 的 CustomEvent
    - 基于 props
      - 实现主子应用通信
      - 子应用与子应用通信，都基于 props 和主应用通信

## 常见解决方案

- iframe
  why not iframe
  - url 不同步。浏览器刷新 iframe url 状态丢失、后退前进按钮无法使用。
  - UI 不同步，DOM 结构不共享。弹窗只能在 iframe 内部展示，无法覆盖全局。
  - 全局上下文完全隔离，内存变量不共享。iframe 内外系统的通信、数据同步等需求，主应用的 cookie 要透传到根域名都不同的子应用中实现免登效果。
  - 慢。每次子应用进入都是一次浏览器上下文重建、资源重新加载的过程。
- 路由代理
- Web Components
- Webpack 5 的 Module Federation
- [常见框架]
  - single-spa
  - qiankun
  - wujie
  - MicroApp

[JS沙箱]: https://juejin.cn/post/7350354672862363700
[常见框架]: https://mp.weixin.qq.com/s/997pVVxdgpOH6ZsDsFAh2g
