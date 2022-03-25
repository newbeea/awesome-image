---
title: 安装
description: ''
position: 6
category: Webgl Transition
---
## 前提
需安装 `@awesome-image/image` [详见](/setup)
## Vue/Nuxt

### 安装 `@awesome-image/transition`

<code-group>
  <code-block label="Vue" active>

  ```bash
  yarn add @awesome-image/transition
  ```

  </code-block>
  <code-block label="Nuxt">

  ```bash
 yarn add @awesome-image/transition
 yarn add @nuxtjs/composition-api
  ```

  </code-block>
  
</code-group>

### 使用
#### 全局使用
<code-group>
  <code-block label="Vue2" active>

  ```js[main.js]
  import AsTransition from '@awesome-image/transition'
  import '@awesome-image/transition/dist/style.css'
  Vue.use(AsTransition)

  ```

  </code-block>
  <code-block label="Vue3">

  ```js[main.js]
  import AsTransition from '@awesome-image/transition'
  import '@awesome-image/transition/dist/style.css'
  createApp().use(AsTransition)

  ```

  </code-block>
  <code-block label="Nuxt">


  ```js[./plugins/as-image-transition.js]
  // add ./plugins/as-image-transition.js

  import AsTransition from '@awesome-image/transition'
  import '@awesome-image/transition/dist/style.css'
  Vue.use(AsTransition)

  ```

  ```js[nuxt.config.js]
  // add plugin path to nuxt.config.js
  {
    plugins: [
      '~~/plugins/as-image-transition.js'
    ]
  }
  ```

  </code-block>
  
</code-group>


#### 局部使用
```html
<script>  
import AsImage from '@awesome-image/image'
import '@awesome-image/image/dist/style.css'
import AsTransition from '@awesome-image/transition'
import '@awesome-image/transition/dist/style.css'
export default {
  components: {
    AsImage,
    AsTransition
  }
}
</script>
<template>
<AsTransition>
  <template
    #images="{
      toGroupWithIndex
    }"
  >
    <AsImage
      class="demoimage"
      :width="999"
      :height="1424"
      :src="'//d3skwsdk169y0b.cloudfront.net/image/fake3d/mount.jpg'"
      :to-group="toGroupWithIndex(0)"
    >
    </AsImage>
    <AsImage
      class="demoimage"
      :width="999"
      :height="1424"
      :src="'//d3skwsdk169y0b.cloudfront.net/image/fake3d/canyon.jpg'"
      :to-group="toGroupWithIndex(1)"
    >
    </AsImage>
  </template>
</AsTransition>
</template>

```


## 浏览器

### 引入 `@awesome-image/image`

<code-group>
  <code-block label="Vue2" active>

  ```bash
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.0/dist/vue.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@vue/composition-api/dist/vue-composition-api.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vue-demi@0.12.1/lib/index.iife.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@awesome-image/image/dist/vue2/index.umd.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@awesome-image/transition/dist/vue2/index.umd.js"></script>
  ```

  </code-block>
  <code-block label="Vue3">

  ```bash
  <script src="https://cdn.jsdelivr.net/npm/vue@3.2.31/dist/vue.global.prod.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vue-demi@0.12.4/lib/index.iife.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@awesome-image/image/dist/vue3/index.umd.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@awesome-image/transition/dist/vue3/index.umd.js"></script>
  ```

  </code-block>
  
</code-group>


### 引入样式



```bash
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@awesome-image/image/dist/style.css"
/>
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@awesome-image/transition/dist/style.css"
/>
```


### 使用

<code-sandbox :src="'https://codesandbox.io/embed/image-group-basic-nncsy7?fontsize=14&hidenavigation=1&theme=dark'"></code-sandbox>