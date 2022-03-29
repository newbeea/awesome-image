---
title: Custom filters
description: ''
position: 14
category: Webgl Filter
---

Check out the filters gallery to make it easy to create your own filters. The current filter library uses `@gl-widget/gl-widget`, a UI-oriented lightweight (14kb) , plug-in WebGL rendering engine, which provides easy WebGL environment building, image rendering, uniform updating and more. You can also choose native or other WebGL libraries.


## How to start
### Template
```html
<template>
  <div ref="webglContainer" />
</template>
```

### Initialize WebGL
- Initializes using the DOM
- Set the canvas size based on the image, set `css: 100%`

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
  - Pass the canvas size `resolution` = glWidget.getSize()
  - Pass the image `image` = new Texture(props.image.currentSrc)
- fragmentShader
  - Process the image
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
### Rendering
- For every frame of animation, you can change the variable here to complete the animation effect
- Render the background
```html
<script setup>
function animate() {
  shader.uniforms.time.value += 0.01
}
glWidget.renderBackground(shader, animate)
</script>
```
### Example

Create filter like `@awesome-image/filter-glitch`

<code-sandbox :src="'https://codesandbox.io/embed/image-filter-custom-vdw5ih?fontsize=14&hidenavigation=1&theme=dark'"></code-sandbox>


## More
These are the steps for customizing filters, and you can checkout filter library code, which handles the onload picture size of 0, resize event handling. You can learn about the [pixi](https://github.com/pixijs/filters) about `shader`, and you can browse the [Shadertoy](https://www.shadertoy.com), which has a number of cool shaders that may inspire you.