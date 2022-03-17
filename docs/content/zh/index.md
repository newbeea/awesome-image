---
title: 介绍
description: ''
position: 1
category: ''
features:
  - Feature 1
  - Feature 2
  - Feature 3
---

<AsImage
  class="banner"
  :width="2800"
  :height="1400"
  :duration="1"
  :src="'//d3skwsdk169y0b.cloudfront.net/image/banner/1.jpg'"
  :progressive="true"
  :responsive="false">
</AsImage>

<img src="/preview.png" class="light-img" width="1280" height="640" alt=""/>
<img src="/preview-dark.png" class="dark-img" width="1280" height="640" alt=""/>

[Module]() for [NuxtJS](https://nuxtjs.org).

<alert type="success">

Your documentation has been created successfully!

</alert>

## Features

<list :items="features"></list>

<p class="flex items-center">Enjoy light and dark mode:&nbsp;<app-color-switcher class="inline-flex ml-2"></app-color-switcher></p>
