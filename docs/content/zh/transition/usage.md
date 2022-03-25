---
title: 使用
description: ''
position: 7
category: Webgl Transition
---
## 基本使用
- 将图片组件 `AsImage` 作为过渡组件 `AsTransition` 的 `images` 插槽子组件
- 以图片 `index` 为参数，调用作用域变量 `toGroupWithIndex`，并将返回值绑定到 `AsImage` 的 `to-group` 属性，完成图片资源绑定。

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

## 使用内置图片过渡效果
- 设置 `transition` 属性, [详见](/transition/build-in)

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

## 控制图片切换
- 使用组件方法 `prev` `next` 进行图片切换
- 使用组件方法 `setActiveIndex` 切换到指定图片
- 监听 `change` 事件，获取 `当前图片索引` 和 `上一张图片索引`

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



## 属性说明
### initial-index
- **类型：** `number`
- **默认：** `0`

  初始图片索引

### speed
- **类型：** `number`
- **默认：** `50`

  图片切换动画速度

### auto-play
- **类型：** `boolean`
- **默认：** `true`

  自动切换图片

### interval
- **类型：** `number`
- **默认：** `3000`

  自动切换图片时，每次切换的图片间隔

  是否懒加载

### transition
- **类型：** `Transition`
- **默认：** `{ name: 'default' }`

  图片切换过渡效果

## 方法
### prev
  上一张
### next
  下一张
### set-active-index
- **参数：**
  - 需要切换的图片索引，从0开始

## 事件
### change
- **回调参数：**
  - 目前激活的幻灯片的索引
  - 原幻灯片的索引

## 示例
<code-sandbox :src="'https://codesandbox.io/embed/image-group-basic-nncsy7?fontsize=14&hidenavigation=1&theme=dark'"></code-sandbox>