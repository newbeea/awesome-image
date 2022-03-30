import theme from '@nuxt/content-theme-docs'

export default theme({
  components: [
    './components', // default level is 0
    { path: '~~/node_modules/@nuxt/content-theme-docs/src/components/', level: 1 },
  ],
  docs: {
  },
  css: ['~~/style.css'],
  i18n: {
    locales: () => [{
      code: 'zh',
      iso: 'zh-CN',
      file: 'zh-CN.js',
      name: '中文',
    }, {
      code: 'en',
      iso: 'en-US',
      file: 'en-US.js',
      name: 'English',
    }],
    defaultLocale: 'en',
  },
  buildModules: [
    '@nuxtjs/composition-api/module',
  ],
  plugins: ['~~/plugins/as-image.js'],
})
