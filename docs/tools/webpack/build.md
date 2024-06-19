# 打包流程

## compiler 和 compilation

- Compiler：Webpack 的核心，贯穿于整个构建周期。Compiler 封装了 Webpack 环境的全局配置，包括但不限于「配置信息、输出路径」等。
- Compilation：表示单次的构建过程及其产出。与 Compiler 不同，Compilation 对象在每次构建中都是新创建的，描述了构建的具体过程，包括模块资源、编译后的产出资源、文件的变化，以及依赖关系的状态。在 watch mode 下，每当文件变化触发重新构建时，都会生成一个新的 Compilation 实例。
- Compiler 是一个长期存在的环境描述，贯穿整个 Webpack 运行周期；而 Compilation 是对单次构建的具体描述，每一次构建过程都可能有所不同。接下来我们主要会对 Compiler 进行深入的研究。

## 参考

- [Webpack 源码分析](https://mp.weixin.qq.com/s/JjjL3ojDVreAIfdQzYum1g)
