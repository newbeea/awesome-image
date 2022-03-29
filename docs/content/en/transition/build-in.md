---
title: Built-in transition effect
description: ''
position: 8
category: Webgl Transition
---

## Usage
### `transition`
- Specify the built-in effect by name
- Configure the options that effect support
```js
export interface Transition {
  name?: string
  uniforms?: Record<string, any>
}
```
### Example
```html
<template>
  <AsTransition
    :transition="{
      name: 'windowslice',
      uniforms: {
        count: 10,
        smoothness: 5
      }
    }"
    ...
  </AsTransition>
</template>
```

## default
Gradient transition effect

```html

<template>
  <AsTransition
    :transition="{
      name: 'default'
    }"
  >
    ...
  </AsTransition>
</template>

```

## windowslice
Louver effect
### `transition`
- `name`  'windowslice'
- `uniforms`
  - count: number of slices
  - smoothness: The bigger the transition, the slower it goes

```html

<template>
  <AsTransition
    :transition="{
      name: 'windowslice',
      uniforms: {
        count: 10,
        smoothness: 5
      }
    }"
  >
    
    ...
  </AsTransition>
</template>

```
### Example
<code-sandbox :src="'https://codesandbox.io/embed/image-group-basic-forked-99kefs?fontsize=14&hidenavigation=1&theme=dark'"></code-sandbox>


## directionalwrap
Big wave effect
### `transition`
- `name`  'directionalwrap'
- `uniforms`
  - direction: Direction of wave
    {
      x: -1,
      y: 1
    } 

### Example
<code-sandbox :src="'https://codesandbox.io/embed/image-transition-directionalwrap-sfugdu?fontsize=14&hidenavigation=1&theme=dark'"></code-sandbox>

## `more`
TODO