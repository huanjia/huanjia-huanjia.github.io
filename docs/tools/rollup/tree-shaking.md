# 了解 Tree-shaking

## 什么是 Tree-shaking？

- tree-shaking 是一种消除无用代码的方式！
- 但要注意的是，`tree-shaking 虽然能够消除无用代码，但仅针对 ES6 模块语法，因为 ES6 模块采用的是静态分析，从字面量对代码进行分析。`对于必须执行到才知道引用什么模块的 CommonJS 动态分析模块他就束手无策了，不过我们可以通过插件支持 CommonJS 转 ES6 然后实现 tree-shaking，只要思想不滑坡，办法总比困难多。
- 总之，rollup.js 默认采用 ES 模块标准，但可以通过 `rollup-plugin-commonjs` 插件使之支持 `CommonJS 标准`，目前来说，在压缩打包体积方面，rollup 的优势相当明显！

## 为什么需要 Tree-shaking？

- tree-shaking 功能属于`性能优化的范畴`。
- 毕竟，减少 web 项目中 JavaScript 的无用代码，就是`减小文件体积`，`加载文件资源的时间也就减少了`，从而通过减少用户打开页面所需的等待时间，`来增强用户体验`。

---

# 深入理解 Tree-shaking

## DCE（dead code elimination）

tree-shaking 和传统的 DCE 的方法又不太一样，传统的 DCE 消灭不可能执行的代码，`而 tree-shaking 更关注消除没有用到的代码`。

DCE

- 代码不会被执行，不可到达
- 代码执行的结果不会被用到
- 代码只会影响死变量，只写不读

tree-shaking 更关注于消除那些引用了但并没有被使用的模块，这种消`除原理依赖于 ES6 的模块特性`。所以先来了解一下 ES6 模块特性：

ES6 Module

- 只能作为模块顶层的语句出现
- import 的模块名只能是字符串常量
- import binding 是 immutable 的

## Tree-shaking 消除

- 消除变量
- 消除函数
- 消除类
- 副作用  
  但是，`并不是说所有的副作用都被 rollup 解决了`。参考相关文章，相对于 Webpack，rollup 在消除副作用方面有很大优势。但对于下列情况下的副作用，rollup 也无能为力：

  1. 模块中类的方法未被引用
  2. 模块中定义的变量影响了全局变量

---

# Rollup

Rollup 是一个模块打包器，支持 ES6 模块，支持 Tree-shaking，但不支持 webpack 的 code-splitting、模块热更新等，适合用来做类库项目打包器

# Tree-shaking 实现流程

首先要了解两点前置知识：

- rollup 中的 tree-shaking `使用 acorn 实现 AST 抽象语法树的遍历解析`，acorn 和 babel 功能相同，但 acorn 更加轻量，在此之前 AST 工作流也是必须要了解的；
- rollup `使用 magic-string 工具操作字符串和生成 source-map`。

具体流程：

- `rollup()阶段，解析源码，生成 AST tree，对 AST tree 上的每个节点进行遍历，判断出是否 include(标记避免重复打包)，是的话标记，然后生成 chunks，最后导出。`
- `generate()/write()阶段，根据 rollup()阶段做的标记，进行代码收集，最后生成真正用到的代码。`

---

# 总结

- 针对简单的打包流程而言，源码中并未对代码做额外的神秘操作，只是做了遍历标记使用收集并对收集到的代码打包输出以及 included 标记节点 treeshakeNode 以避免重复声明而已。
- 当然最关键的还是内部静态分析并收集依赖，这个过程处理起来比较复杂，但核心其实还是针对遍历节点：找到当前节点依赖的变量，访问的变量以及这些变量的声明语句。
- 作为一个轻量快捷的打包工具，rollup 在打包函数工具库方便具有很大优势。归功于其偏向于代码处理的优势，源码体量相较于 Webpack 也是轻量得多.

---

## 参考:

- [Rollup 的 tree shaking](https://mp.weixin.qq.com/s/d_Dg-K4vQXURycULsin0xQ)
