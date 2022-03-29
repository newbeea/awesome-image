---
title: Usage
description: ''
position: 3
category: Awesome Image
---
## Basic usage
- Set image size
- Set image styles
- Slot `loading` can be used to fill image area before loaded

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
## Lazy loading
Use the `IntersectionObserver` to load a image when it enters the visual area.
- Use `lazy` (default: `false`) to enable `lazyload`
- Use `imageLazyOffset` (default: `0px`) set how many pixels to load the image in advance
- If progressive loading is used at the same time, use `placeholderLazyOffset` (default: `0px`) set how many pixels to load the thumbnail image in advance
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

## Progressive loading
`Progressive loading` uses a 48px-wide blured image (generated in advance or dynamically with image service) as placeholder, and displays it smoothly with a gradient animation when loading placeholder and the original image. Supports `progressive loading` of images before client `hydrate` in SSR mode.
- Configuration of `imageUrlGenerator` is required to get the `48px-wide blured image` [More](/url)
- Use `progressive` (default: `false`) property to control whether progressive loading is enabled
- Setup `duration` (default: `1`, second) property to control the duration of the fade-in animation

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

## Responsive loading
`Responsive loading` loads images of different sizes depending on the screen width (generated in advance or dynamically with image service)
- Configuration of `imageUrlGenerator` is required to get the image url for different sizes [More](/url)
- Use `responsive` (default: `false`) property to control whether responsive loading is enabled
- Use `breakpoints` (default: `[640, 768, 1024, 1280, 1536]`) property to control the optional image width
- Use `sizes` (default: `100vw`) property to control how the image width is selected

### Simple Example
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
Load 640,768,1024,1280,1536 images based on the screen width, such as 1024px-wide image when the screen width is 1000px.

### Complex Example
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
As used above:
- When the screen width is less than`640px`: width is `100vw`, choose the image which width is `640px` according to `breakpoints`
- When the screen width is less than`1200px`: width is `1000px`, choose the image which width is `1024px` according to `breakpoints`
- For the rest of the case: width is `50vw`, corresponding to `breakpoints`:
  - When the screen width is less than `1280px`: choose the image which width is `640px`
  - When the screen width is less than `2048px`: choose the image which width is `1024px`
  - When the screen width is less than `2880px`: choose the image which width is `1440px`

## WebP
Some image providers or self-development services offer the ability to automatically load images in `WEBP` format. For cases where auto-WebP is not supported, you can specify `auto-webp` as `true` (default `false`) to add the ability to be compatible with `WEBP` format. Compatible browsers will automatically load webp images.

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
`//cdn.com/image.jpg?format=webp` will be loaded as above ([imageUrlGenerator](/url))

## Other image processing parameters
- `quanlity` set picture quality
- `format` set image format

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
`//cdn.com/image.jpg?quanlity=90&format=png` will be loaded as above ([imageUrlGenerator](/url))

## Attribute
### src
- **Type:** `string`

  Image url

### width / height
- **Type:** `number`

### lazy
- **Type:** `boolean`
- **Default:** `false`

### imageLazyOffset
- **Type:** `string`
- **Default:** `'0px'`

  When lazy loading, how many pixels to load the image in advance

### placeholderLazyOffset
- **Type:** `string`
- **Default:** `'0px'`

  When lazy loading, how many pixels to load the placeholder image in advance

### progressive
- **Type:** `boolean`
- **Default:** `false`


### duration
- **Type:** `number`
- **Default:** `1`

  The number of seconds of progressive animation during progressive loading

### auto-webp
- **Type:** `boolean`
- **Default:** `false`

  Whether to use the auto-load WebP compatibility mode

### responsive
- **Type:** `boolean`
- **Default:** `false`

  Whether to load responsively

### breakpoints
- **Type:** `array`
- **Default:** `[640, 768, 1024, 1280, 1536]`

  Optional image size for responsive loading. [More](#complex-example)

### sizes
- **Type:** `string`
- **Default:** `'100vw'`

  How to select the image to load according to the screen size when loading responsively. [More](#complex-example)

### quanlity
- **Type:** `number`

### format
- **Type:** `string`

### imageUrlGenerator
- **Type:** `function`
- **Default:** `(url) => url`

  Image url generation function. [详见](/url)


## Example
<code-sandbox :src="'https://codesandbox.io/embed/image-basic-46wt0n?fontsize=14&hidenavigation=1&theme=dark'"></code-sandbox>