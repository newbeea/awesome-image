---
title: 安装
description: ''
position: 2
category: AsImage
---

## Vue/Nuxt

### 安装 `@vue-awesome-image/as-image`

<code-group>
  <code-block label="Vue" active>

  ```bash
  yarn add @vue-awesome-image/as-image
  ```

  </code-block>
  <code-block label="Nuxt">

  ```bash
 yarn add @vue-awesome-image/as-image
 yarn add @nuxtjs/composition-api
  ```

  </code-block>
  
</code-group>

### 引入样式

```bash
import '@vue-awesome-image/as-image/dist/style.css'
```
### 使用
#### 全局使用
<code-group>
  <code-block label="Vue2" active>

  ```js[main.js]
  import VueAsImage from '@vue-awesome-image/as-image'
  // import { imageUrlGeneratorFP } from '@vue-awesome-image/services'
  // read more about http://imageUrlGenerator
  Vue.use(VueAsImage, {
    imageUrlGenerator: yourImageUrlGenerator 
  })

  ```

  </code-block>
  <code-block label="Vue3" active>

  ```js[main.js]
  import VueAsImage from '@vue-awesome-image/as-image'
  // import { imageUrlGeneratorFP } from '@vue-awesome-image/services'
  // read more about http://imageUrlGenerator
  createApp().use(VueAsImage, {
    imageUrlGenerator: yourImageUrlGenerator 
  })

  ```

  </code-block>
  <code-block label="Nuxt">


  ```js[./plugins/as-image.js]
  // add ./plugins/as-image.js

  import VueAsImage from '@vue-awesome-image/as-image'
  // import { imageUrlGeneratorFP } from '@vue-awesome-image/services'
  // read more about http://imageUrlGenerator
  Vue.use(VueAsImage, {
    imageUrlGenerator: yourImageUrlGenerator 
  })

  ```

  ```js[nuxt.config.js]
  // add plugin path to nuxt.config.js
  {
    plugins: [
      '~~/plugins/as-image.js'
    ]
  }
  ```

  </code-block>
  
</code-group>


#### 局部使用
```html
<script>  
import { AsImage } from '@vue-awesome-image/as-image'
// import { imageUrlGeneratorFP } from '@vue-awesome-image/services'
// read more about http://imageUrlGenerator
export default {
  components: {
    AsImage
  }
}
</script>
<template>
  <AsImage
    class="banner"
    :image-url-generator="yourImageUrlGenerator"
    :width="2800"
    :height="1400"
    :src="'//d3skwsdk169y0b.cloudfront.net/image/banner/1.jpg'"
    :lazy="true"
    :progressive="true"
    :responsive="true">
    <template #loading>
      <div class="placeholder"></div>
    </template>
  </AsImage>
</template>

```


## 浏览器

### 引入 `@vue-awesome-image/as-image`

<code-group>
  <code-block label="Vue2" active>

  ```bash
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.0/dist/vue.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@vue/composition-api/dist/vue-composition-api.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vue-demi@0.12.1/lib/index.iife.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@vue-awesome-image/as-image@1.0.11/dist/vue2/index.umd.js"></script>
  ```

  </code-block>
  <code-block label="Vue3">

  ```bash
  <script src="https://cdn.jsdelivr.net/npm/vue@3.2.31/dist/vue.global.prod.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vue-demi@0.12.4/lib/index.iife.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@vue-awesome-image/as-image/dist/vue3/index.umd.js"></script>
  ```

  </code-block>
  
</code-group>


### 引入样式



```bash
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@vue-awesome-image/as-image/dist/style.css"
/>
```


### 使用

<code-sandbox :src="'https://codesandbox.io/embed/image-basic-46wt0n?fontsize=14&hidenavigation=1&theme=dark'"></code-sandbox>