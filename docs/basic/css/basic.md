# 盒子模型

两种盒子模型，IE 盒子模型和标准盒子模型
盒模型的组成，由里向外 content,padding,border,margin

## IE 盒子模型

width 表示 content+padding+border 这三个部分的宽度

## 标准盒子模型

width 指 content 部分的宽度

# BFC

BFC 它决定了元素如何对其内容进行定位，以及与其它元素的关系和相互作用，当涉及到可视化布局时，Block Formatting Context（块级文档格式化） 提供了一个环境，HTML 在这个环境中按照一定的规则进行布局。

## 触发 BFC 使用的一些 CSS 属性

```css
position: absolute
position: fixed
overflow: hidden
display: inline-block
display: table-cell
display: flex
```

# 居中

## 水平居中

### 行内元素

```css
text-align: center;
```

### 块级元素

```css
margin: 0 auto
position:absolute +left:50%+ transform:translateX(-50%)
display:flex + justify-content: center
```

## 垂直居中

```css
设置 line-height 等于 height
position：absolute +top:50% + transform:translateY(-50%)
display:flex + align-items: center
display:table + display:table-cell + vertical-align: middle;
```

# Flex

## 参考

- [flex](https://juejin.cn/post/6844903474774147086)

# Animation

# Transition
