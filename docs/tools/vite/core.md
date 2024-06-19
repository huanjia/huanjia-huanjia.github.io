# 实现原理

## 开发环境

- 起了一个本地服务器，调用 vite 插件来做 transform，并且对 node_modules 下的模块做了预构建，用 esbuild 打包
- 原理
  - 模块加载基于 es module 模块实现
- 实现
  - 根据请求 url 来对模块做编译，调用 vite 插件做不同模块的 transform
  - 对 node_modules 文件下的包预构建，优化依赖
    - 提前把 node_modules 下代码的 commonjs 提前转成 es module，还提前对这些包做一次打包，变成一个 es module 模块
    - 启动开发服务器后马上打包，用 esbuild 分析依赖，然后打包成 esm 包并输出到 node_modules/.vite 目录下
    - 生成 metadata.josn 来记录 hash
    - 浏览器用 max-age 强缓存预打包模块并带了 hash 的 query，当重新 build 时，可以通过修改 hash 来触发更新

## 生产环境

- 用 Rollup 打包
- 原理
  - 因为 vite 兼容了 Rollup 插件，所以用同样的插件来处理，这样能保证开发和生产环境代码一致

## 参考

- [Vite 实现原理](https://mp.weixin.qq.com/s/ejkfARh6hlOAUnw5Eadb6Q)
