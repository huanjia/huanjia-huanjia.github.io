# vue2

## 初始化过程

```js
initLifecycle
initEvent
initRender
添加 lisener、attries 的监听
call beforeCreate
initInject
initState
initProvide
call created
if el，mounted(el)
```

## 生命周期

- vue 的创建到销毁的过程，大概流程是这样的，初始化数据，创建实例，编译模版，绑定数据生成 AST，转成 vdom，挂载 dom，渲染，更新数据-修改 vdom，挂载，渲染，销毁的过程
- beforeCreate、create、beformounted、（watch、vdom—>AST 的过程，子组件的 mounted）mounted、befordestroy

## [常见面试题](https://mp.weixin.qq.com/s/5YR2pgxgB5K-_B6QpN0uSw)

# vue3

## 优化内容

- proxy 代替 defineProperty
- composition API
- 源码的模块化结偶
- tree shaking，源码的
- TS 的支持
- 模版解析
  - 通过 AST 解析过程获取具体那些 dom 节点是有数据绑定的，根据几个分类进行打标记，减少了不必要的 dom 的比较和更新

## diff 算法优化

- TODO

## 参考:

- [Vue2 和 Vue3 的响应式原理比对](https://juejin.cn/post/7124351370521477128)
