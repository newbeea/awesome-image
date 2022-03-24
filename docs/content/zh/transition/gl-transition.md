---
title: GLTransitions
description: ''
position: 5
category: Webgl Transition
---

[GLTransitions](https://gl-transitions.com/) 是开源的WebGL过渡效果库，包含大量过渡效果，所有效果都能在 `AsTransition` 中使用。

## 安装

<code-group>
  <code-block label="node" active>

  ```bash
  yarn add gl-transitions
  ```

  </code-block>
  <code-block label="html">

  ```bash
  <script src="https://unpkg.com/gl-transitions/gl-transitions.js"></script>
  ```

  </code-block>
  
</code-group>

## 使用
### `transition` 属性
- 将GLTransitions[x].glsl 赋值给 `shader`
- 将GLTransitions[x].defaultParams 赋值给 `uniforms`, 可根据需求修改参数

```js
export interface Transition {
  shader?: string
  uniforms?: Record<string, any>
}
```
```html
<script>
import GLTransitions from "gl-transitions";
</script>
<template>
  <AsTransition
    :transition="{
      shader: GLTransitions[0].glsl,
      uniforms: GLTransitions[0].defaultParams
    }"
    ...
  </AsTransition>
</template>
```
### 示例
点击刷新按钮切换随机效果

<code-sandbox :src="'https://codesandbox.io/embed/image-group-transition-b81gdl?fontsize=14&hidenavigation=1&theme=dark'"></code-sandbox>
