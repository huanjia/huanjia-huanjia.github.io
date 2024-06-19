# Tree-shaking 实现机制

## Tree-shaking -- rollup VS Webpack

- rollup 是在编译打包过程中分析程序流，得益于于 ES6 静态模块（exports 和 imports 不能在运行时修改），我们在打包时就可以确定哪些代码时我们需要的。
- `webpack 本身在打包时只能标记未使用的代码而不移除，而识别代码未使用标记并完成 tree-shaking 的 其实是 UglifyJS、babili、terser 这类压缩代码的工具。`简单来说，就是压缩工具读取 webpack 打包结果，在压缩之前移除 bundle 中未使用的代码。

---

# Webpack 实现 tree-shaking 的 3 个阶段

## 第一阶段：UglifyJS

`webpack 标记代码 + babel 转译 ES5  -->  UglifyJS 压缩删除无用代码`

- `UglifyJS 不支持 ES6 及以上，需要用 Babel 将代码编译为 ES5，`然后再用 UglifyJS 来清除无用代码；
- 通过 Babel 将代码编译为 ES5，但又要让 ES6 模块不受 Babel 预设（preset）的影响：`配置 Babel 预设不转换 module，`对应地配置 Webpack 的 plugins 配置；

```js
// .babelrc
{
  "presets": [
    ["env", {
      "loose": true, // 宽松模式
      "modules": false // 不转换 module，保持 ES6 语法
    }]
  ]
}
```

- 为避免副作用，将其标记为 pure（无副作用），以便 UglifyJS 能够处理，主要是 webpack 的编译过程阻止了对类进行 tree-shaking，它仅对函数起作用，后来通过支持将类编译后的赋值标记为 @**PURE** 解决了这个问题。

---

## 第二阶段：BabelMinify

`webpack 标记代码 -->  Babili（即 BabelMinify）压缩删除无用代码`  
Babili 后来被重命名为 BabelMinify，是基于 Babel 的代码压缩工具，而 Babel 已经通过我们的解析器 Babylon 理解了新语法，同时又在 babili 中集成了 UglifyJS 的压缩功能，本质上实现了和 UglifyJS 一样的功能，但使用 babili 插件又不必再转译，而是直接压缩，使代码体积更小。

一般使用 Babili 替代 uglify 有 Babili 插件式和 babel-loader 预设两种方式。在官方文档最后有说明，Babel Minify 最适合针对最新的浏览器（具有完整的 ES6+ 支持），也可以与通常的 Babel es2015 预设一起使用，以首先向下编译代码。

在 webpack 中使用 babel-loader，然后再引入 minify 作为一个 preset 会比直接使用 BabelMinifyWebpackPlugin 插件（下一个就讲到）执行得更快。因为 babel-minify 处理的文件体积会更小。

---

## 第三阶段：Terser

`webpack 标记代码 --> Terser 压缩删除无用代码 `（webpack5 已内置） terser 是一个用于 ES6+ 的 JavaScript 解析器和 mangler/compressor 工具包。

> 为什么放弃 uglify 而投向 terser
>
> - uglify 不再进行维护且不支持 ES6+ 语法
> - webpack 默认内置配置了 terser 插件实现代码压缩 关于副作用，从 webpack 4 正式版本扩展了未使用模块检测能力，通过 package.json 的 "sideEffects" 属性作为标记，向 compiler 提供提示，表明项目中的哪些文件是 "pure(纯正 ES2015 模块)"，由此可以安全地删除文件中未使用的部分。

webpack4 的时候还要手动配置一下压缩插件，但最新的 webpack5 已经内置实现 tree-shaking 啦！在生产环境下无需配置即可实现 tree-shaking !

---

# Webpack 的 Tree-shaking 流程

## Webpack 标记代码

总的来说，`webpack 对代码进行标记，主要是对 import & export 语句标记为 3 类`：

- 所有 import 标记为 `/* harmony import */`
- 所有被使用过的 export 标记为`/* harmony export ([type]) */`，其中 [type] 和 webpack 内部有关，可能是 binding, immutable 等等
- 没被使用过的 export 标记为`/* unused harmony export [FuncName] */`，其中 [FuncName] 为 export 的方法名称

首先我们要知道，为了正常运行业务项目，Webpack 需要将开发者编写的业务代码以及支撑、调配这些业务代码的运行时一并打包到产物(bundle)中。落到 Webpack 源码实现上，`运行时的生成逻辑可以划分为打包阶段中的两个步骤`：

- `依赖收集：遍历代码模块并收集模块的特性依赖，从而确定整个项目对 Webpack runtime 的依赖列表`；
- `生成：合并 runtime 的依赖列表，打包到最终输出的 bundle`。

---

## 压缩清除大法

### `UglifyJS`

以 UglifyJS 为例，UglifyJS 是一个 js 解释器、最小化器、压缩器、美化器工具集。

tree-shaking 的压缩配置参数总结

- `dead_code `-- 移除没被引用的代码 // 是不是很眼熟！无用代码！
- `drop_debugger` -- 移除 debugger
- `unused` -- 干掉没有被引用的函数和变量。（除非设置"keep_assign"，否则变量的简单直接赋值也不算被引用。）
- `toplevel` -- 干掉顶层作用域中没有被引用的函数 ("funcs")和/或变量("vars") (默认是 false , true 的话即函数变量都干掉)
- `warnings` -- 当删除没有用处的代码时，显示警告 // 还挺贴心有么有~
- `pure_getters` -- 默认是 false. 如果你传入 true，UglifyJS 会假设对象属性的引用（例如 foo.bar 或 foo["bar"]）没有函数副作用。
- `pure_funcs` -- 默认 null. 你可以传入一个名字的数组，UglifyJS 会假设这些函数没有函数副作用。

### `terser`

以 terser 为例，terser 是一个用于 ES6+ 的 JavaScript 解析器和 mangler/compressor 工具包。配置参数和 UglifyJS 没有太大区别。当然很明显地多了一些参数：

- `arrows` -- 如果转换后的代码更短，类和对象字面量方法也将被转换为箭头表达式
- `ecma` -- 通过 ES2015 或 更高版本来启用压缩选项，将 ES5 代码转换为更小的 ES6+等效形式 显然是因为 terser 支持 ES6+ 语法，这也是它淘汰 UglifyJS 的优势之一。

---

# 处理 Side Effects

Webpack 认为这样的文件有“副作用”，具有副作用的文件不应该做 tree-shaking，因为这将破坏整个应用程序。`webpack 的 tree-shaking 在副作用处理方面稍显逊色，它可以简单的判断变量后续是否被引用、修改，但是不能判断一个变量完整的修改过程，不知道它是否已经指向了外部变量，所以很多有可能会产生副作用的代码，都只能保守的不删除。`

幸运的是，我们可以通过`配置项目，告诉 Webpack 哪些代码是没有副作用的，可以进行 tree-shaking`。

## 配置参数

在项目的 `package.json` 文件中，添加 "`sideEffects"` 属性。package.json 有一个特殊的属性 sideEffects，就是为处理副作用而存在的 -- 向 webpack 的 compiler 提供提示哪些代码是“纯粹部分”。它有三个可能的值：

- true 是默认值，如果不指定其他值的话。这意味着所有的文件都有副作用，也就是没有一个文件可以 tree-shaking。
- false 告诉 Webpack 没有文件有副作用，所有文件都可以 tree-shaking。
- 第三个值 […] 是文件路径数组。它告诉 webpack，除了数组中包含的文件外，你的任何文件都没有副作用。因此，除了指定的文件之外，其他文件都可以安全地进行 tree-shaking。

```js
{
  "name": "your-project",
  "sideEffects": false
  // "sideEffects": [ // 数组方式支持相关文件的相对路径、绝对路径和 glob 模式
  //  "./src/some-side-effectful-file.js",
  //  "*.css"
  //]
}
```

`每个项目都必须将 sideEffects 属性设置为 false 或文件路径数组，`如果你的代码确实有一些副作用，那么可以改为提供一个数组，在工作中需要正确配置 sideEffects 标记。

## 代码中标记

可以通过 `/#PURE/` 注释可以告诉 webpack 一个函数调用是无副作用的。在函数调用之前，用来标记它们是无副作用的(pure)。传到函数中的入参是无法被刚才的注释所标记，需要单独每一个标记才可以。如果一个没被使用的变量定义的初始值被认为是无副作用的（pure），它会被标记为死代码，不会被执行且会被压缩工具清除掉。当 optimization.innerGraph 被设置成 true 这个行为被会开启，而在 `webpack5.x 中optimization.innerGraph 默认为 true`。

## 语法使用层面

- 首先，`mode 为 production 模式下才会启用更多优化项`，包括我们本文讲的压缩代码与 tree shaking；
- 使用 ES2015 模块语法（即 import 和 export）；
- 确保没有编译器将 ES2015 模块语法转换为 CommonJS 的，把 presets 中的 modules 设置为 false，告诉 babel 不要编译模块代码。

---

# 总结

- 如果是开发 JavaScript 库，使用 rollup！并且提供 ES6 module 的版本，入口文件地址设置到 package.json 的 module 字段；
- 使用 webpack 哪怕是旧版本可以优先考虑 terser 插件作为压缩工具；
- 为避免副作用，尽量不写带有副作用的代码，使用 ES2015 模块语法；
- 在项目 package.json 文件中，添加一个 sideEffects 入口，设置 sideEffects 属性为 false，也可以通过 /#PURE/ 注释强制删除一些认为不会产生副作用的代码；
- 在 Webpack 中还要额外引入一个能够删除未引用代码(dead code)的压缩工具（eg. Terser）。

---

## 参考:

- [Webpack 实现 Tree shaking 的前世今生](https://mp.weixin.qq.com/s/_zDRMo8p2N2El-wSj0Vulg)
