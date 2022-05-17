---
title: Image url generator
description: ''
position: 4
category: Awesome Image
---

Components like lazy load/progressive load/response load/auto webp, etc. need to be used with the image link generator function `ImageUrlGenerator`, which receives different image parameters in different situations. According to the image parameter, the `image URL` needed by the corresponding image service is generated, and the corresponding image is finally obtained by this `image URL`.

## Usage

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

## Built-in image link generation function
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

## Custom image url generation function
You can easily write your own image url generator, and feel free to submit your image provider's function to `@awesome-image/services`
### Interface
```js
export interface ImageOptions {
  width?: number
  height?: number
  blur?: number
  quanlity?: number
  format?: string
}
export interface ImageUrlGenerator {
  (url: string, options: ImageOptions): string
}

```

### Function parameter
When used, the component passes different parameters to the `ImageUrlGenerator` to generate the corresponding image url
#### `progressive`
Options used to generate the blured thumbnail
````js
const imageOptions = {
  width: 48,
  blur: 5
}
````
For example
```js
const image = 'https://cdn.com/image.jpg'
const url = yourGenerator(image, imageOptions) 
console.log(url) // https://cdn.com/image.jpg?w=48&b=5
```

#### `responsive`
Options used to generate the different sizes required for the response, the width of which is generated based on the `breakpoints` property
````js
const imageOptions = {
  // other options
  width: 640, // according to breakpoints
}
````
#### `format` 
Options for `format` property
````js
const imageOptions = {
  // other options
  format: 'png',
}
````

#### `quanlity`
Options for `quanlity` property
````js
const imageOptions = {
  // other options
  quanlity: 90, // according to `quanlity` props
}
````

#### `auto-webp`
Options for `auto-webp` property
````js
const imageOptions = {
  // other options
  format: 'webp',
}
````

#### other
TODO

### Example
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