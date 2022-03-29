---
title: Usage
description: ''
position: 7
category: Webgl Transition
---
## Basic usage
- Use `AsImage` as `AsTransition`'s `images` slot
- Use image index as parameter to call scoped variable `toGroupWithIndex` which is a function, and then use the return value as  `AsImage`'s `to-group` property to bind image resource.

Example
```html

<template>
  <AsTransition>
    <template
      #images="{
        toGroupWithIndex
      }"
    >
      <AsImage
        class="demoimage"
        v-for="(src, index) in imagelist"
        :key="index"
        :to-group="toGroupWithIndex(index)"
        :width="999"
        :height="1424"
        :src="src"
      >
      </AsImage>
    </template>
  </AsTransition>
</template>

```

## Use the built-in image transition
- Setup `transition`, [More](/transition/build-in)

```html

<template>
  <AsTransition
    :transition="{
      name: 'directionalwrap'
    }"
  >
    <template
      #images="{
        toGroupWithIndex
      }"
    >
      <AsImage
        class="demoimage"
        v-for="(src, index) in imagelist"
        :key="index"
        :to-group="toGroupWithIndex(index)"
        :width="999"
        :height="1424"
        :src="src"
      >
      </AsImage>
    </template>
  </AsTransition>
</template>

```

## Control image switching
- Use component methods `prev` and `next` to switch image
- Use component methods `setActiveIndex` to switch to the specified image
- Listen `change` event, get `currentIndex` and `previousIndex`

```html
// vue3 setup
<script lang="ts" setup>
const activeIndex = ref(0)
const transitionRef = ref<typeof AsTransition>()

const next = () => {
  transitionRef.value?.next()
}
const prev = () => {
  transitionRef.value?.prev()
}
const setActiveItem = () => {
  transitionRef.value?.setActiveItem(2)
}

const onChange = (activeIndex, oldIndex) => {
  activeIndex.value = activeIndex
}
</script>
```



## Attributes
### initial-index
- **Type:** `number`
- **Default:** `0`

  Initial Image Index

### speed
- **Type:** `number`
- **Default:** `50`

  Switching animation speed

### auto-play
- **Type:** `boolean`
- **Default:** `true`

  Automatic image switching

### interval
- **Type:** `number`
- **Default:** `3000`

  Interval between auto switching

### transition
- **Type:** `Transition`
- **Default:** `{ name: 'default' }`

  Image transition effect

## Methods
### prev
  The last slide
### next
  Next slide
### setActiveIndex
- **Parameter:**
  -  Image index to switch, starting at 0

## Events
### change
- **Callback Parameter:**
  - Index of currently active slide
  - Index to last slide

## Example
<code-sandbox :src="'https://codesandbox.io/embed/image-group-basic-nncsy7?fontsize=14&hidenavigation=1&theme=dark'"></code-sandbox>