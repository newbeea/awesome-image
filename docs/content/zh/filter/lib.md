---
title: 滤镜库
description: ''
position: 13
category: Webgl Filter
---
滤镜库为独立包形式，安装对应滤镜组件包来使用。滤镜库不断补充中，欢迎提交您的优先作品。

## `@awesome-image/filter-glitch`
故障效果

<Banner></Banner>

```html
<template>
  <AsImage
    class="demoimage"
    :width="1080"
    :height="722"
    :src="'/mount.jpg'"
  >
    <template #webglfilter="{ image }">
      <div>
        <as-filter-glitch :image="image"></as-filter-glitch>
      </div>
    </template>
  </AsImage>
</template>
```

## `@awesome-image/filter-3d`
伪3D效果，`shader` 来自 [akella](https://github.com/akella/fake3d)
### 属性

#### depth
- **类型：** `string`

原图对应的深度图，可以使用[MiDaS](https://huggingface.co/spaces/pytorch/MiDaS)生成
#### scaleX / scaleY
- **类型：** `number`
- **默认：** `1`

针对深度的偏移程度，根据深度图生成质量适当调整

#### mouse
- **类型：** `{ x: number y: number}`

可以手动控制 `mouse` 值来覆盖默认鼠标hover效果

鼠标在图片上移动（移动端需点击）查看效果

<code-sandbox :src="'https://codesandbox.io/embed/image-filter-fake3d-0673d4?fontsize=14&hidenavigation=1&theme=dark'"></code-sandbox>


## `@awesome-image/filter-crt`
复古显示器效果，`shader` 来自 [pixi](https://github.com/pixijs/filters)

<code-sandbox :src="'https://codesandbox.io/embed/image-filter-crt-ier9bu?fontsize=14&hidenavigation=1&theme=dark'"></code-sandbox>

## `@awesome-image/filter-ascii`
Ascii字符效果，`shader` 来自 [pixi](https://github.com/pixijs/filters)
#### pixel-size
- **类型：** `number`
- **默认：** `8`
字符大小

<code-sandbox :src="'https://codesandbox.io/embed/image-filter-ascii-dpotsq?fontsize=14&hidenavigation=1&theme=dark'"></code-sandbox>

## `@awesome-image/filter-hexagon`
六边形马赛克效果，`shader` 来自 [pixi](https://github.com/pixijs/filters)
#### scale
- **类型：** `number`
- **默认：** `15`
六边形大小

<code-sandbox :src="'https://codesandbox.io/embed/image-filter-hexagon-7jz4tt?fontsize=14&hidenavigation=1&theme=dark'"></code-sandbox>

## `more`
TODO