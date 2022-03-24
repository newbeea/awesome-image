---
title: 自定义过渡效果
description: ''
position: 10
category: Webgl Transition
---

参考 `GLTransitions` 你可以很方便的实现自己的过渡效果。


## 实现
### 接口

```js
export interface Transition {
  shader?: string
  uniforms?: Record<string, any>
}
```
### 概念
#### shader
`fragment shader` 代码，完成过渡效果
- 定义变量 常量或声明 `uniform` 变量
- `vec4 transition(vec2 uv)` 定义过渡函数
  - 参数 `uv` 图片每个点坐标
- 内置 `getFromColor` 获取当前图 `uv` 坐标点像素值
- 内置 `getToColor` 获取目标图 `uv` 坐标点像素值
- 内置 `uniform` 变量
  - `progress` 切换进度 0 - 1
  - `next` 切换方向，下一张为 `true`，上一张为 `false`

#### uniforms
- `shader` 中自定义的 `uniform` 变量




## 使用
### 使用 `next` `progress`
```html
<script setup>
import GLTransitions from "gl-transitions";
const customTransition = {
  shader: `
    uniform float youruniform;
    vec4 transition(vec2 uv) {
      vec4 a = getFromColor(uv);
      vec4 b = getToColor(uv);
      if ( next )
        return mix(a, b, step(uv.x, progress));
      else
        return mix(b, a, step(uv.x, 1. - progress));
    }

  `,
  uniforms: {
    youruniform: 0
  },
}
</script>
<template>
  <AsTransition
    :transition="customTransition"
    ...
  </AsTransition>
</template>
```
### 示例
向前和向后切换有不同效果

<code-sandbox :src="'https://codesandbox.io/embed/image-group-transition-next-og6v88?fontsize=14&hidenavigation=1&theme=dark'"></code-sandbox>

水波纹效果

<code-sandbox :src="'https://codesandbox.io/embed/image-group-transition-custom-xk355h?fontsize=14&hidenavigation=1&theme=dark'"></code-sandbox>
