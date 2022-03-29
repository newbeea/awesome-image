---
title: Usage
description: ''
position: 12
category: Webgl Filter
---
## Precondition
Install `@awesome-image/image` [More](/setup)


## Install
### Vue/Nuxt

#### Install filter
`@awesome-image/filter-crt` for example. [More](/filter/lib)

<code-group>
  <code-block label="Vue" active>

  ```bash
  yarn add @awesome-image/filter-crt
  ```

  </code-block>
  <code-block label="Nuxt">

  ```bash
 yarn add @awesome-image/filter-crt
 yarn add @nuxtjs/composition-api
  ```

  </code-block>
  
</code-group>

#### Global
<code-group>
  <code-block label="Vue2" active>

  ```js[main.js]
  import FilterCrt from '@awesome-image/filter-crt'
  Vue.use(FilterCrt)

  ```

  </code-block>
  <code-block label="Vue3">

  ```js[main.js]
  import FilterCrt from '@awesome-image/filter-crt'
  createApp().use(FilterCrt)

  ```

  </code-block>
  <code-block label="Nuxt">


  ```js[./plugins/as-image-filter.js]
  // add ./plugins/as-image-filter.js

  import FilterCrt from '@awesome-image/filter-crt'
  Vue.use(FilterCrt)

  ```

  ```js[nuxt.config.js]
  // add plugin path to nuxt.config.js
  {
    plugins: [
      '~~/plugins/as-image-filter.js'
    ]
  }
  ```

  </code-block>
  
</code-group>


#### Local
```html
<script>  
import AsImage from '@awesome-image/image'
import '@awesome-image/image/dist/style.css'
import AsFilterCrt from '@awesome-image/filter-crt'
export default {
  components: {
    AsImage,
    AsFilterCrt
  }
}
</script>

```


### Browser

#### Add `@awesome-image/image`

<code-group>
  <code-block label="Vue2" active>

  ```bash
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.0/dist/vue.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@vue/composition-api/dist/vue-composition-api.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vue-demi@0.12.1/lib/index.iife.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@awesome-image/image/dist/vue2/index.umd.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@awesome-image/filter-crt/dist/vue2/index.umd.js"></script>
  ```

  </code-block>
  <code-block label="Vue3">

  ```bash
  <script src="https://cdn.jsdelivr.net/npm/vue@3.2.31/dist/vue.global.prod.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vue-demi@0.12.4/lib/index.iife.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@awesome-image/image/dist/vue3/index.umd.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@awesome-image/filter-crt/dist/vue3/index.umd.js"></script>
  ```

  </code-block>
  
</code-group>


## Usage
- Usage `filter component` as `AsImage`'s filter slot
- Passing a scope variable `image` to `filter component`

### Example
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
        <as-filter-crt :image="image"></as-filter-crt>
      </div>
    </template>
  </AsImage>
</template>

```

### Online
<code-sandbox :src="'https://codesandbox.io/embed/image-filter-crt-ier9bu?fontsize=14&hidenavigation=1&theme=dark'"></code-sandbox>