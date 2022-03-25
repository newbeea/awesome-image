---
title: 自定义滤镜
description: ''
position: 14
category: Webgl Filter
---

参考滤镜库你可以很方便的实现自己的滤镜效果。当前滤镜库使用 [@gl-widget/gl-widget](https://www.philxu.cn/gl-widget/gl-widget.html) 一个面向UI的轻量化（14kb）、插件化 `WebGL` 渲染引擎搭建，提供了方便的 `WebGL` 环境搭建，图片渲染，`uniform` 更新等功能。当然你也可以选择原生方式或其他 `WebGL` 库。


## 如何开始
### 模板
```html
<template>
  <div ref="webglContainer" />
</template>
```

### 初始化 WebGL
- 使用dom初始化
- 根据图片设置canvas大小，设置css 100%

```html
<script setup>
import { GLWidget, Texture } from '@gl-widget/gl-widget'
const webglContainer = ref<HTMLElement>()
onMounted(async() => {
  const glWidget = new GLWidget({
    element: webglContainer.value,
  })

  glWidget.setSize(webglContainer.value.clientWidth, webglContainer.value.clientWidth / props.image.naturalWidth * props.image.naturalHeight, { width: '100%' })
})
</script>
```

### uniform 与 shader
- uniform
  - 传递画布大小 `resolution` = glWidget.getSize()
  - 传递图片 `image` = new Texture(props.image.currentSrc)
- fragmentShader
  - 根据图片等 `uniform` 处理图片
```html
<script setup>
const shader = {
  fragmentShader: `
    precision highp float;
    uniform vec2 resolution;
    uniform float time;
    uniform sampler2D image;
    float rand () {
      return fract(sin(time)*1e4);
    }
    void main () {
      vec2 uv = gl_FragCoord.xy/resolution.xy;
      vec2 uvR = uv;
      vec2 uvB = uv;

      if (sin(time) > -0.2) {
        uvR.x = uv.x * 1.0 - rand() * 0.02 * 0.8;
        uvB.y = uv.y * 1.0 + rand() * 0.02 * 0.8;

        if(uv.y < rand() && uv.y > rand() -0.1)
        {
          uv.x = (uv + 0.02 * rand()).x;
        }
      }

      vec4 c;
      c.r = texture2D(image, uvR).r;
      c.g = texture2D(image, uv).g;
      c.b = texture2D(image, uvB).b;
      c.a = 1.;

      gl_FragColor = c;
    }
  `,
  uniforms: {
    image: {
      value: new Texture(props.image?.currentSrc),
    },
    resolution: {
      value: glWidget.getSize(),
    },
    time: {
      value: 0,
    },
  },
}
</script>
```
### 开始绘制
- 每帧动画，可以在此处改变变量完成动画效果
- 渲染背景
```html
<script setup>
function animate() {
  shader.uniforms.time.value += 0.01
}
glWidget.renderBackground(shader, animate)
</script>
```
### 示例

自定义实现 `@awesome-image/filter-glitch` 效果

<code-sandbox :src="'https://codesandbox.io/embed/image-filter-custom-vdw5ih?fontsize=14&hidenavigation=1&theme=dark'"></code-sandbox>


## 其他
以上就是自定义滤镜的步骤，可以参考滤镜库代码，其中处理了 `onload` 时图片尺寸为 `0` 的情况、`resize` 事件的处理。图片处理 `Shader` 部分可以学习[pixi](https://github.com/pixijs/filters)，你还可以逛逛 [Shadertoy](https://www.shadertoy.com), 上面有好多酷炫的shader，可能给你带来启发。