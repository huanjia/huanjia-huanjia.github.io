# 前言

在默认的配置情况下，我们知道，`webpack` 会把所有代码打包到一个 chunk 中，举个例子当你的一个单页面应用很大的时候，你可能就需要将每个路由拆分到一个 chunk 中，这样才方便我们实现按需加载。

代码分离是 `webpack` 中最引人注目的特性之一。此特性能够把代码分离到不同的 `bundle` 中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的 `bundle`，以及控制资源加载优先级，如果使用合理，会极大影响加载时间。

---

# 代码分割

## 1.多入口

webpack 配置中的 `entry` ，可以设置为多个，也就是说我们可以分别将 index 和 test 文件分别作为入口：

```js
// entry: './src/index.js', 原来的单入口
/** 现在分别将它们作为入口 */
entry:{
  index:'./src/index.js',
  test:'./src/test.js'
},
output: {
  filename: '[name].[hash:8].js',
  path: path.resolve(__dirname, './dist'),
},
```

缺点：

- 如果入口 chunk 之间包含一些重复的模块，那些重复模块都会被引入到各个 bundle 中。
- 这种方法不够灵活，并且不能动态地将核心应用程序逻辑中的代码拆分出来。

---

## 2.SplitChunksPlugin

`SplitChunks` 是 webpack5 自带的开箱即用的一个插件，他可以将满足规则的 chunk 进行分离，也可以自定义配置。在 webpack5 中用它取代了 webpack4 中的用来解决重复依赖的 `CommonsChunkPlugin` 。

SplitChunksPlugin 默认配置

```js
splitChunks: {
    // 表示选择哪些 chunks 进行分割，可选值有：async，initial 和 all
    chunks: "async",
    // 表示新分离出的 chunk 必须大于等于 minSize，20000，约 20kb。
    minSize: 20000,
    // 通过确保拆分后剩余的最小 chunk 体积超过限制来避免大小为零的模块,仅在剩余单个 chunk 时生效
    minRemainingSize: 0,
    // 表示一个模块至少应被 minChunks 个 chunk 所包含才能分割。默认为 1。
    minChunks: 1,
    // 表示按需加载文件时，并行请求的最大数目。
    maxAsyncRequests: 30,
    // 表示加载入口文件时，并行请求的最大数目。
    maxInitialRequests: 30,
    // 强制执行拆分的体积阈值和其他限制（minRemainingSize，maxAsyncRequests，maxInitialRequests）将被忽略
    enforceSizeThreshold: 50000,
    // cacheGroups 下可以可以配置多个组，每个组根据 test 设置条件，符合 test 条件的模块，就分配到该组。模块可以被多个组引用，但最终会根据 priority 来决定打包到哪个组中。默认将所有来自 node_modules 目录的模块打包至 vendors 组，将两个以上的 chunk 所共享的模块打包至 default 组。
    cacheGroups: {
        defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            // 一个模块可以属于多个缓存组。优化将优先考虑具有更高 priority（优先级）的缓存组。
            priority: -10,
            // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用
            reuseExistingChunk: true,
        },
        default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
        }
    }
}
```

---

## 3. 动态 import

通过 `import()` 语法导入的模块在打包时会自动单独进行打包

---

## 4.魔术注释

在上述的 import() 语法中，我们会发现打包自动生成的文件名并不是我们想要的，我们如何才能自己控制打包的名称呢？这里就要引入我们的魔术注释（Magic Comments）：

```js
import(/* webpackChunkName: "my-chunk-name" */ './test')
```

使用我们的 `/* webpackPrefetch: true */` 方式进行预获取.
另外我们还有 `/* webpackPreload: true */` 的方式进行预加载。

但是 prefetch 和 preload 听起来感觉差不多，实际上他们的加载时机等是完全不同的：

- preload chunk 会在父 chunk 加载时，以并行方式开始加载。prefetch chunk 会在父 chunk 加载结束后开始加载。
- preload chunk 具有中等优先级，并立即下载。prefetch chunk 在浏览器闲置时下载。
- preload chunk 会在父 chunk 中立即请求，用于当下时刻。prefetch chunk 会用于未来的某个时刻。

---

## 5.延伸`babel-plugin-component`

组件框架按钮加载，每个组件打包成一个独立的文件，`element-ui`框架实现。

---

# 结尾

在最初有工程化打包思想时，我们会考虑将多文件打包到一个文件内减少多次的资源请求，随着项目的越来越复杂，做项目优化时，我们发现项目加载越久用户体验就越不好，于是又可以通过代码分割的方式去减少页面初加载时的请求过大的资源体积。

---

## 参考:

- [「Webpack」从 0 到 1 学会 code splitting](https://mp.weixin.qq.com/s/yaKssOVGTeRnU6luWnjdww)
