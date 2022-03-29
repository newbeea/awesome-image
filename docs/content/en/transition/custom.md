---
title: Custom transition
description: ''
position: 10
category: Webgl Transition
---

Refer to `GLTransitions` for easy implementation of your own transition effects.

## Implement
### Interface

```js
export interface Transition {
  shader?: string
  uniforms?: Record<string, any>
}
```
### Conception
#### shader
`fragment shader` code to complete the transition effect
- Define a variable, constant or declare a 'uniform' variable
- `vec4 transition(vec2 uv)` Defines a transition function
  - Parameter `uv`: Image coordinates for each point
- The built-in function `getFromColor`: gets the pixel value of the `uv` coordinate point of the current image
- The built-in function `getToColor`: gets the pixel value of the target graph `uv` coordinate point
- The built-in `uniform` variable
  - `progress`: transition progress (0 - 1)
  - `next` transition direction, next is `true`, previous is `false`

#### uniforms
- custom `uniform` varialbles in `shader`




## Usage
### Use `next` `progress`
```html
<script setup>
import GLTransitions from "gl-transitions";
const customTransition = {
  shader: `
    uniform float youruniform;
    vec4 transition(vec2 uv) {
      vec4 a = getFromColor(uv);
      vec4 b = getToColor(uv);
      if ( next )
        return mix(a, b, step(uv.x, progress));
      else
        return mix(b, a, step(uv.x, 1. - progress));
    }

  `,
  uniforms: {
    youruniform: 0
  },
}
</script>
<template>
  <AsTransition
    :transition="customTransition"
    ...
  </AsTransition>
</template>
```
### Example
Switching forward and backward has different effects

<code-sandbox :src="'https://codesandbox.io/embed/image-group-transition-next-og6v88?fontsize=14&hidenavigation=1&theme=dark'"></code-sandbox>
