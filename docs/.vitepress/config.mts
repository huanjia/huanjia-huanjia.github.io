import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'hj的笔记',
  description: '好记性不如烂笔头',
  base: '/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: '基础',
        items: [
          { text: 'Css', link: '/basic/css/basic.md' },
          { text: 'Html', link: '/basic/html/html.md' },
          { text: 'JavaScript', link: '/basic/js/prototype.md' },
          { text: 'Http', link: '/basic/http/http.md' },
          { text: '浏览器', link: '/basic/browser/event-loop.md' }
        ]
      },
      {
        text: 'Vue',
        items: [{ text: 'Vue', link: '/vue/vue.md' }]
      },
      {
        text: 'React',
        items: [{ text: 'React', link: '/react/react.md' }]
      },
      {
        text: '工程化',
        items: [
          { text: '监控', link: '/engineering/monitor.md' },
          { text: '微前端', link: '/engineering/micro.md' },
          { text: '生态', link: '/engineering/ecosystem.md' }
        ]
      },
      {
        text: '工具',
        items: [
          { text: 'Git', link: '/tools/git/git-command.md' },
          { text: 'Markdown', link: '/tools/markdown/base-use.md' },
          { text: 'Rollup', link: '/tools/rollup/tree-shaking.md' },
          { text: 'Vite', link: '/tools/vite/core.md' },
          { text: 'Webpack', link: '/tools/webpack/build.md' },
          { text: 'Vscode', link: '/tools/vscode/ssh-remote.md' }
        ]
      }
    ],

    sidebar: [
      {
        text: 'Css',
        items: [{ text: 'Css基础', link: '/basic/css/basic.md' }]
      },
      {
        text: 'Html',
        items: [{ text: 'html', link: '/basic/html/html.md' }]
      },
      {
        text: 'JavaScript',
        items: [{ text: '原型链', link: '/basic/js/prototype.md' }]
      },
      {
        text: 'Http',
        items: [{ text: 'Http', link: '/basic/http/http.md' }]
      },
      {
        text: '浏览器',
        items: [
          { text: '事件循环', link: '/basic/browser/event-loop.md' },
          { text: '灰度机制', link: '/basic/browser/gray-realease.md' },
          { text: '垃圾回收', link: '/basic/browser/js-run-gc.md' },
          { text: '性能优化', link: '/basic/browser/performance.md' },
          { text: '前端安全', link: '/basic/browser/security.md' }
        ]
      },
      {
        text: 'Vue',
        items: [{ text: 'Vue', link: '/vue/vue.md' }]
      },
      {
        text: 'React',
        items: [{ text: 'React', link: '/react/react.md' }]
      },
      {
        text: '工程化',
        items: [
          { text: '行为监控', link: '/engineering/monitor.md' },
          { text: '微前端', link: '/engineering/micro.md' },
          { text: '生态', link: '/engineering/ecosystem.md' }
        ]
      },
      {
        text: 'Git',
        items: [{ text: '常用命令', link: '/tools/git/git-command.md' }]
      },
      {
        text: 'Markdown',
        items: [
          { text: '基础使用', link: '/tools/markdown/base-use.md' },
          { text: '基础示例', link: '/tools/markdown/markdown-examples.md' }
        ]
      },
      {
        text: 'Rollup',
        items: [{ text: 'tree-shaking', link: '/tools/rollup/tree-shaking.md' }]
      },
      {
        text: 'Vite',
        items: [{ text: '实现原理', link: '/tools/vite/core.md' }]
      },
      {
        text: 'Webpack',
        items: [
          { text: '打包流程', link: '/tools/webpack/build.md' },
          { text: 'code-spliting', link: '/tools/webpack/code-spliting.md' },
          { text: 'loader', link: '/tools/webpack/loader.md' },
          { text: 'plugin', link: '/tools/webpack/plugin.md' },
          { text: 'sourcemap', link: '/tools/webpack/sourcemap.md' },
          { text: 'tree-shaking', link: '/tools/webpack/tree-shaking.md' }
        ]
      },
      {
        text: 'Vscode',
        items: [{ text: 'ssh-remote', link: '/tools/vscode/ssh-remote.md' }]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/huanjia/huanjia.github.io' }
    ]
  }
})
