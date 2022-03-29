---
title: Introduction
description: 'Awesomeimage is a universal image component that supports `lazy`/`progressive`/`responsive`/`automatic webp` which compatible with Vue2/Vue3/NUXT.It can also be paired with the official WebGL filter library or a custom WebGL filter component, or the WebGL transition component for a cooler photo display or button effect.'
position: 1
category: 'Awesome Image'

---
<Banner></Banner>
<alert>
  AwesomeImage WebGL Filter: @awesome-image/filter-glitch
</alert>

Awesomeimage is a universal image component that supports `lazy`/`progressive`/`responsive`/`automatic webp` which compatible with Vue2/Vue3/NUXT.

It can also be paired with the official WebGL filter library or a custom WebGL filter component, or the WebGL transition component for a cooler photo display or button effect.

## Features

- Lazy loading —— set when to load the image and placeholder image separately
- Responsive loading  ——   load images of different sizes based on screen width
- Progressive loading  ——  load a 48px blured image as placeholder, then display the image smoothly
- SSR  ——  support server-side rendering, specify non-lazy loading for the first screen, load the images before `hydrating`, and compatible with the progressive effect, improve the first screen loading experience
- WEBP compatibility —— you can use the `auto-webp` property to add a webp compatible notation when using an image service that does not support automatic webp
- WebGL filter —— `WebGL Filter Component` can be used in `AsImage` component to processe image [More](/filter/introduction)

- WebGL transition  ——  you can use the webgl image transition component `AsTransition` to switch image with awesome webgl effect. Support [GLTransitions](https://gl-transitions.com/) and custom WebGL image transitions [More](/transition/introduction)
- Custom image url generator  ——  @awesome-image/services has built-in image url generator rules such as fastly and upyun, you can customize other image url generator functions [more](/url)

## Show Case
### Lazy / Responsive / Progressive / SSR
<img src="/show.gif" width="804" height="450" alt=""/>

### WebGL Filter (@awesome-image/filter-fake3d)
<img src="/fake3d.gif" width="804" height="450" alt=""/>

### WebGL Transition
<img src="/transition.gif" width="804" height="450" alt=""/>


