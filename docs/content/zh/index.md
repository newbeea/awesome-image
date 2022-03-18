---
title: 介绍
description: 'sfsd'
position: 1
category: ''
features:
  - 懒加载 —— 分别设置图片和placeholder加载时机
  - 响应式加载  ——  根据屏幕宽度加载不同尺寸图片
  - 渐进式加载  ——  加载宽度为48px模糊缩率图作为placeholder，并且加载过程平滑过渡
  - webp兼容  ——  使用不支持自动webp的图片服务时，可以使用autoWebp参数添加webp兼容写法
  - 自定义图片处理  ——  @vue-awesome-image/services内置fastly、upyun等图片处理规则，可自由定制其他图片url转换函数
  - WebGL滤镜  ——  以在图片组件AsImage内使用滤镜组件，支持自定义WebGL图片处理效果
  - 轮播过渡  ——  可以使用轮播图片组件AsImageGroup，支持gl-transitions过渡效果，支持自定义WebGL图片过渡效果
---
<Banner></Banner>
<alert>
AsImage WebGL滤镜
</alert>

AsImage 是一个支持 `懒加载` / `渐进加载` / `响应加载` / `自动webp的`、兼容 `vue2` / `vue3` / `nuxt` 的通用图片组件，可搭配内置或自定义WebGL滤镜组件、WebGL过渡组件实现更酷炫的图片展示效果。

## 特性

<list :items="features"></list>

## 效果
### 懒加载 / 渐进加载 / 响应加载 / SSR
<img src="/show.gif" width="804" height="450" alt=""/>

### WebGL滤镜 (@vue-awesome-image/filter-fake3d)
<img src="/fake3d.gif" width="804" height="450" alt=""/>

### WebGL过渡
<img src="/transition.gif" width="804" height="450" alt=""/>


