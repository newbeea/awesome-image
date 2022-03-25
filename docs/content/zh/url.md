---
title: 图片链接生成
description: ''
position: 4
category: Awesome Image
---

组件 `懒加载` / `渐进加载` / `响应加载` / `自动webp` 等功能需要搭配图片链接生成函数 `ImageUrlGenerator` 使用，`ImageUrlGenerator` 在不同情况下会接收到不同图片参数，根据图片参数生成对应图片服务所需的图片url，最终获取到对应的图片。

## 使用方式

<code-group>

  <code-block label="Global" active>

  ```js[main.js]
  import AsImage from '@awesome-image/image'
  import '@awesome-image/image/dist/style.css'
  import { imageUrlGeneratorFP } from '@awesome-image/services'

  Vue.use(AsImage, {
    imageUrlGenerator: imageUrlGeneratorFP 
  })

  ```
  </code-block>

  <code-block label="Local">

  ```html
  <script>
  import { imageUrlGeneratorFP } from '@awesome-image/services'
  export default {
    data() {
      return {
        imageUrlGenerator: imageUrlGeneratorFP
      }
    }
  }
  </script>
  <template>
    <AsImage
      :width="1280"
      :height="640"
      :imageUrlGenerator="imageUrlGeneratorFP"
      src="//cdn.com/image.jpg"
    >
    </AsImage>
  </template>
  ```
  </code-block>

</code-group>

## 内置图片链接生成函数
### `fastly`
```js
import { imageUrlGeneratorFastly } from '@awesome-image/services'
```
### `imagekit`
```js
import { imageUrlGeneratorImagekit } from '@awesome-image/services'
```
### `upyun`
```js
import { imageUrlGeneratorUpyun } from '@awesome-image/services'
```

## 自定义图片链接生成函数
你可以很方便的写自己的图片链接生成函数，并且欢迎提交常用的图片服务商对应的函数到 `@awesome-image/services`
### 函数接口
```js
export interface ImageOptions {
  width?: number
  height?: number
  blur?: number
  quantity?: number
  format?: string
}
export interface ImageUrlGenerator {
  (url: string, options: ImageOptions): string
}

```

### 函数参数
组件在使用时会在不同情况下传递不同的参数给 `ImageUrlGenerator`，来生成对应的图片地址
#### `progressive` 对应图片参数
用来生成模糊缩略图对应的图片url
````js
const imageOptions = {
  width: 48,
  blur: 5
}
````
例如
```js
const image = 'https://cdn.com/image.jpg'
const url = yourGenerator(image, imageOptions) 
console.log(url) // https://cdn.com/image.jpg?w=48&b=5
```

#### `responsive` 对应图片参数
用来生成响应式所需的不同尺寸对应的图片url，宽度根据 `breakpoints` 属性生成
````js
const imageOptions = {
  // other options
  width: 640, // according to breakpoints
}
````
#### `format` 对应图片参数
组件指定 `format` 属性时会传递的参数
````js
const imageOptions = {
  // other options
  format: 'png',
}
````

#### `quanlity` 对应图片参数
组件指定 `format` 属性时会传递的参数
````js
const imageOptions = {
  // other options
  quanlity: 90, // according to `quanlity` props
}
````

#### `auto-webp` 对应图片参数
组件使用 `auto-webp` 属性时会传递的参数
````js
const imageOptions = {
  // other options
  format: 'webp',
}
````

#### 其他参数
TODO

### 示例
```js
const imageUrlGeneratorDemo: ImageUrlGenerator
  = (url: string, options: ImageOptions = {}): string =>
{
  const query = Object.entries(options).map(kv => `${kv[0]}=${kv[1]}`)
  return `${url}?${query.join('&')}`
}
// if image url is 'https://cdn.com/image.jpg'

// progressive will generate:
// https://cdn.com/image.jpg?width=48&blur=5

// responsive: true & format: png & quanlity: 80 & breakpoints: [640, 1280] will generate:
// https://cdn.com/image.jpg?width=640&format=png&quanlity=80
// https://cdn.com/image.jpg?width=1280&format=png&quanlity=80

```