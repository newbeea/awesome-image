# Universal vue component template
- Building Universal Vue Libraries for Vue 2 & 3
- Using vue-demi but you don't need to write "render" function, "template" and "tsx" are supported!

## Usage
### Use this template or clone it
### Install
  ```
  yarn
  ```
### Develop
  ```
  yarn run dev
  ```
### Build
  ```
  yarn run build
  ```
### Publish
Change package name, publish and install it to test in vue2/3

If you want to use 'npm link' project locally, you need to edit "package.module" "package.main" according to vue version.
```
// vue2
{
  "name": "your-component",
  "module": "./dist/vue2/index.es.js",
  "main": "./dist/vue2/index.umd.js",
  ...
  }
```
```
// vue3
{
  "name": "your-component",
  "module": "./dist/vue3/index.es.js",
  "main": "./dist/vue3/index.umd.js",
  ...
  }
```

## Example
Install 'universal-vue-template' which built by this template in vue2 or vue3, it will work correctly.
```
yarn add universal-vue-template
```

```
import Universal from 'universal-vue-template'
import 'universal-vue-template/dist/style.css'
```

Vue2 example
[src](https://github.com/newbeea/universal-vue-component-template/tree/master/examples/vue2)
[preview](https://universal-vue-component-2.vercel.app/)

Vue3 example
[src](https://github.com/newbeea/universal-vue-component-template/tree/master/examples/vue3)
[preview](https://universal-vue-component-3.vercel.app/)
