---
title: 介绍
description: 'AwesomeImage 是一个支持 `懒加载` / `渐进加载` / `响应加载` / `自动webp`、兼容 `vue2` / `vue3` / `nuxt` 的通用图片组件，可搭配内置或自定义WebGL滤镜组件、WebGL过渡组件实现更酷炫的图片展示或按钮效果'
position: 1
category: 'Awesome Image'

---
<Banner></Banner>
<alert>
  AwesomeImage WebGL Filter: @awesome-image/filter-glitch
</alert>

AwesomeImage 是一个支持 `懒加载` / `渐进加载` / `响应加载` / `自动webp`、兼容 `vue2` / `vue3` / `nuxt` 的通用图片组件。

另外可搭配官方WebGL滤镜库或自定义WebGL滤镜组件、WebGL过渡组件实现更酷炫的图片展示或按钮效果。

## 特性

- 懒加载 —— 分别设置图片和placeholder加载时机
- 响应式加载  ——  根据屏幕宽度加载不同尺寸图片
- 渐进式加载  ——  加载宽度为48px模糊缩率图作为placeholder，并且加载过程平滑过渡
- SSR  ——  支持服务端渲染，对于首屏图片指定非懒加载，可以在 `注水` 前加载图片，并兼容渐进效果，提升首屏加载体验
- webp兼容  ——  使用不支持自动webp的图片服务时，可以使用autoWebp参数添加webp兼容写法
- WebGL滤镜  ——  以在图片组件AsImage内使用滤镜组件，支持自定义WebGL图片处理效果 [详见](/filter/introduction)
- 轮播过渡  ——  可以使用轮播图片过渡组件AsTransition，支持[GLTransitions](https://gl-transitions.com/) 过渡效果，支持自定义WebGL图片过渡效果 [详见](/transition/introduction)
- 自定义图片处理  ——  @awesome-image/services内置fastly、upyun等图片处理规则，可自由定制其他图片url转换函数 [详见](/url)

## 效果
### 懒加载 / 渐进加载 / 响应加载 / SSR
<img src="/show.gif" width="804" height="450" alt=""/>

### WebGL滤镜 (@awesome-image/filter-fake3d)
<img src="/fake3d.gif" width="804" height="450" alt=""/>

### WebGL过渡
<img src="/transition.gif" width="804" height="450" alt=""/>


