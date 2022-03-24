---
title: 使用
description: ''
position: 3
category: AwesomeImage
---
## 基本使用
- 设置图片尺寸
- 设置图片 / 加载样式
```html
<style>
  .demoimage {
    width: 100%;
  }
  .loading {
    width: 100%;
    height: 100%;
    background: #eee;
  }
</style>
<template>
  <AsImage
    class="demoimage"
    :width="1280"
    :height="640"
    src="//cdn.com/image.jpg"
  >
    <template #loading>
      <div class="loading" />
    </template>
  </AsImage>
</template>
```
## 懒加载
懒加载使用 `IntersectionObserver` 在图片进入可视区域时加载图片。
- 使用 `lazy` (默认`false`) 属性控制是否启用懒加载, 使用 `imageLazyOffset` (默认`0px`) 设置提前多少像素加载图片
- 如果同时使用渐进加载，使用 `placeholderLazyOffset` (默认`0px`) 设置提前多少像素加载缩略图片
```html
<style>
...
</style>
<template>
  <AsImage
    class="demoimage"
    :width="1280"
    :height="640"
    :lazy="true"
    :imageLazyOffset="1000px"
    src="//cdn.com/image.jpg"
  >
    <template #loading>
      <div class="loading" />
    </template>
  </AsImage>
</template>
```

## 渐进加载
渐进加载使用一张宽度为 `48px` 的缩率图（需提前生成或搭配图片服务动态生成）作为 `placeholder`, 并在加载 `placeholder` 和 原图时通过渐显动画平滑显示。支持在 `SSR` 模式下，客户端 `hydrating` 之前渐进加载图片。
- 需配置 `imageUrlGenerator` [详见](/url) 获取对应 `48px` 缩率图
- 使用 `progressive` (默认`false`) 属性控制是否启用渐进加载
- 设置 `duration` (默认`1`, 单位秒)属性控制渐显动画时长

```html
<template>
  <AsImage
    class="demoimage"
    :width="1280"
    :height="640"
    :progressive="true"
    src="//cdn.com/image.jpg"
  >
    <template #loading>
      <div class="loading" />
    </template>
  </AsImage>
</template>
```

## 响应加载
响应加载根据屏幕宽度加载不同尺寸的图片（需提前生成或搭配图片服务动态生成）
- 需配置 `imageUrlGenerator` [详见](/url) 获取不同尺寸图片url
- 使用 `responsive` (默认`false`) 属性控制是否启用响应加载
- 使用 `breakpoints` (默认`[640, 768, 1024, 1280, 1536]`) 属性控制可选的图片宽度
- 使用 `sizes` (默认`100vw`) 属性控制如何选择图片宽度

### 简单示例
```html
<template>
  <AsImage
    class="demoimage"
    :width="1536"
    :height="640"
    :responsive="true"
    src="//cdn.com/image.jpg"
  >
    <template #loading>
      <div class="loading" />
    </template>
  </AsImage>
</template>
```
根据屏幕宽度加载 640, 768, 1024, 1280, 1536 尺寸图片，如：屏幕宽度为 `1000px` 时加载宽度为 `1024px` 图片。

### 复杂示例
```html
<template>
  <AsImage
    class="demoimage"
    :width="1440"
    :height="640"
    :responsive="true"
    :sizes="(max-width: 640px) 100vw, (max-width: 1200px) 1000px, 50vw"
    :breakpoints="[640, 1024, 1440]"
    src="//cdn.com/image.jpg"
  >
    <template #loading>
      <div class="loading" />
    </template>
  </AsImage>
</template>
```
如上使用表示：
- 屏幕宽度小于 `640px` 时按 `100%` 宽度选择图片，对应 `breakpoints`，则加载宽度为 `640px` 图片
- 屏幕宽度小于 `1200px` 时按 `1000px` 宽度选择图片，对应 `breakpoints`，则加载宽度为 `1024px` 图片
- 其余情况按 `50%` 宽度选择图片（实际使用会搭配css设置宽度为50%），对应 `breakpoints`，则:
  - 屏幕宽度小于 `1280px` 加载宽度为 `640px` 图片
  - 屏幕宽度小于 `2048px` 加载宽度为 `1024px` 图片
  - 屏幕宽度小于 `2880px` 加载宽度为 `1440px` 图片

[更多关于响应式图片内容](https://www.ruanyifeng.com/blog/2019/06/responsive-images.html)

## 加载WebP
有些图片服务商或自研服务提供了自动加载WebP格式图片的功能，对于不支持自动兼容的情况，可以指定 `auto-webp` 为 `true` (默认 `false`) ，来添加兼容WebP格式的功能，对于兼容的浏览器，自动加载webp图片。

```html
<template>
  <AsImage
    class="demoimage"
    :width="1280"
    :height="640"
    :auto="true"
    src="//cdn.com/image.jpg"
  >
    <template #loading>
      <div class="loading" />
    </template>
  </AsImage>
</template>
```
如上会加载 `//cdn.com/image.jpg?format=webp` (具体url根据 `imageUrlGenerator` [详见](/url))

## 其他图片处理参数
- `quanlity` 指定图片质量
- `format` 指定图片格式

```html
<template>
  <AsImage
    class="demoimage"
    :width="1280"
    :height="640"
    :quanlity="90"
    :format="png"
    src="//cdn.com/image.jpg"
  >
    <template #loading>
      <div class="loading" />
    </template>
  </AsImage>
</template>
```
如上会加载 `//cdn.com/image.jpg?quanlity=90&format=png` (具体url根据 `imageUrlGenerator` [详见](/url))

## 属性说明
### src
- **类型：** `string`

  原图地址

### width / height
- **类型：** `number`

### lazy
- **类型：** `boolean`
- **默认：** `false`

  是否懒加载

### imageLazyOffset
- **类型：** `string`
- **默认：** `'0px'`

  懒加载时，图片提前加载的距离

### placeholderLazyOffset
- **类型：** `string`
- **默认：** `'0px'`

  懒加载时，缩率图提前加载的距离

### progressive
- **类型：** `boolean`
- **默认：** `false`

  是否渐进式加载

### duration
- **类型：** `number`
- **默认：** `1`

  渐进式加载时，渐显动画持续秒数

### auto-webp
- **类型：** `boolean`
- **默认：** `false`

  是否使用自动加载WebP兼容模式

### responsive
- **类型：** `boolean`
- **默认：** `false`

是否响应式加载

### breakpoints
- **类型：** `array`
- **默认：** `[640, 768, 1024, 1280, 1536]`

  响应式加载时，可选的图片尺寸。[详见](#复杂示例)

### sizes
- **类型：** `string`
- **默认：** `'100vw'`

  响应式加载时，如何按照屏幕尺寸选择要加载的图片。[详见](#复杂示例)

### quanlity
- **类型：** `number`

  图片质量

### format
- **类型：** `number`

  图片格式

### imageUrlGenerator
- **类型：** `function`
- **默认：** `(url) => url`

  图片链接生成函数。[详见](/url)


## 示例
<code-sandbox :src="'https://codesandbox.io/embed/image-basic-46wt0n?fontsize=14&hidenavigation=1&theme=dark'"></code-sandbox>