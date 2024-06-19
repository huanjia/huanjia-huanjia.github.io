# Plugin

## 编译流程

webpack 的入口文件其实就实例了 Compiler 并调用了 run 方法开启了编译，webpack 的主要编译都按照下面的钩子调用顺序执行。

- Compiler:beforeRun 清除缓存
- Compiler:run 注册缓存数据钩子
- Compiler:beforeCompile
- Compiler:compile 开始编译
- Compiler:make 从入口分析依赖以及间接依赖模块，创建模块对象
- Compilation:buildModule 模块构建
- Compiler:normalModuleFactory 构建
- Compilation:seal 构建结果封装， 不可再更改
- Compiler:afterCompile 完成构建，缓存数据
- Compiler:emit 输出到 dist 目录

## Plugin 组成

- 一个 JavaScript 类函数。
- 在函数原型 (prototype)中定义一个注入 compiler 对象的 apply 方法。
- apply 函数中通过 compiler 插入指定的事件钩子,在钩子回调中拿到 compilation 对象
- 使用 compilation 操纵修改 webapack 内部实例数据。
- 异步插件，数据处理完后使用 callback 回调
