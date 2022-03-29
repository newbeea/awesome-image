---
title: Filter Library
description: ''
position: 13
category: Webgl Filter
---
The filter library is in the form of a stand-alone package, and the corresponding filter component package is installed for use. The filter library continues to grow, and you are welcome to submit your outstanding filter.

## `@awesome-image/filter-glitch`
Glitch effect

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

## `@awesome-image/filter-fake3d`
Fake 3D，`shader` from [akella](https://github.com/akella/fake3d)

<code-sandbox :src="'https://codesandbox.io/embed/image-filter-fake3d-0673d4?fontsize=14&hidenavigation=1&theme=dark'"></code-sandbox>

### Attribute

#### depth
- **Type:** `string`

  The depth map corresponding to the original image, can be generated using Midas[MiDaS](https://huggingface.co/spaces/pytorch/MiDaS)
#### scaleX / scaleY
- **Type:** `number`
- **Default:** `1`

  Amount of the depth offset, you can change according to the depth image.

#### mouse
- **Type:** `{ x: number y: number}`

You can override the default mouse hover effect by manually controlling the mouse value

Move the mouse over the image (needs to click on mobile) to see the effect



## `@awesome-image/filter-crt`
Retro display effect, `shader` from [pixi](https://github.com/pixijs/filters)

<code-sandbox :src="'https://codesandbox.io/embed/image-filter-crt-ier9bu?fontsize=14&hidenavigation=1&theme=dark'"></code-sandbox>

## `@awesome-image/filter-ascii`
ASCII character effect,`shader` from [pixi](https://github.com/pixijs/filters)

<code-sandbox :src="'https://codesandbox.io/embed/image-filter-ascii-dpotsq?fontsize=14&hidenavigation=1&theme=dark'"></code-sandbox>

### Attribute
#### pixel-size
- **Type:** `number`
- **Default:** `8`

  Character size


## `@awesome-image/filter-hexagon`
Hexagon mosaic effect, `shader` from [pixi](https://github.com/pixijs/filters)

<code-sandbox :src="'https://codesandbox.io/embed/image-filter-hexagon-7jz4tt?fontsize=14&hidenavigation=1&theme=dark'"></code-sandbox>

### Attribute
#### scale
- **Type:** `number`
- **Default:** `15`

  Hexagon size


## `more`
TODO