---
title: GLTransitions
description: ''
position: 9
category: Webgl Transition
---

[GLTransitions](https://gl-transitions.com/) is an open source WebGL transition library that contains a large number of transitions, all of which can be used in `AsTransition`

## Install

<code-group>
  <code-block label="node" active>

  ```bash
  yarn add gl-transitions
  ```

  </code-block>
  <code-block label="html">

  ```bash
  <script src="https://unpkg.com/gl-transitions/gl-transitions.js"></script>
  ```

  </code-block>
  
</code-group>

## Usage
### `transition`
- Assign GLTransitions[x].glsl to `shader`
- Assign GLTransitions[x].defaultParams to `uniforms`, the parameters can be modified according to the requirements

```js
export interface Transition {
  shader?: string
  uniforms?: Record<string, any>
}
```
```html
<script>
import GLTransitions from "gl-transitions";
</script>
<template>
  <AsTransition
    :transition="{
      shader: GLTransitions[0].glsl,
      uniforms: GLTransitions[0].defaultParams
    }"
    ...
  </AsTransition>
</template>
```
### Example
Click to change transition effects

<code-sandbox :src="'https://codesandbox.io/embed/image-group-transition-b81gdl?fontsize=14&hidenavigation=1&theme=dark'"></code-sandbox>
