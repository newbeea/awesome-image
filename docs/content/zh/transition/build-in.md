---
title: 内置过渡效果
description: ''
position: 4
category: Webgl Transition
---

## 使用
### `transition` 属性
- 通过 `name` 指定内置效果
- 通过 `uniforms` 配置效果支持的选项
```js
export interface Transition {
  name?: string
  shader?: string
  uniforms?: Record<string, any>
}
```
### 示例
```html
<template>
  <AsTransition
    :transition="{
      name: 'windowslice',
      uniforms: {
        count: 10,
        smoothness: 5
      }
    }"
    ...
  </AsTransition>
</template>
```

## default
渐变过渡效果

```html

<template>
  <AsTransition
    :transition="{
      name: 'default'
    }"
  >
    ...
  </AsTransition>
</template>

```

## windowslice
百叶窗效果
### `transition` 参数
- `name`  'windowslice'
- `uniforms`
  - count: 叶片个数
  - smoothness: 越大过渡越慢

```html

<template>
  <AsTransition
    :transition="{
      name: 'windowslice',
      uniforms: {
        count: 10,
        smoothness: 5
      }
    }"
  >
    
    ...
  </AsTransition>
</template>

```
### 示例
<code-sandbox :src="'https://codesandbox.io/embed/image-group-basic-forked-99kefs?fontsize=14&hidenavigation=1&theme=dark'"></code-sandbox>


## directionalwrap
百叶窗效果
### `transition` 参数
- `name`  'directionalwrap'
- `uniforms`
  - direction: 过渡方向
    {
      x: -1,
      y: 1
    } 

### 示例
<code-sandbox :src="'https://codesandbox.io/embed/image-transition-directionalwrap-sfugdu?fontsize=14&hidenavigation=1&theme=dark'"></code-sandbox>

## `more`
TODO