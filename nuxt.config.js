module.exports = {
  mode: 'universal',

  vue: {
    config: {
      productionTip: false,
      devtools: false,
    },
  },

  env: {
    FRONTEND_URL: process.env.FRONTEND_URL || '',
    API_KEY: process.env.API_KEY || '',
    API_LANG: process.env.API_LANG || 'en-US',
    API_COUNTRY: process.env.API_COUNTRY || 'GB',
    API_YOUTUBE_KEY: process.env.API_YOUTUBE_KEY || '',
    GA: process.env.GA || '',
  },

  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/pwa',
  ],

  plugins: [
    '~/plugins/lazyload.js',
    '~/plugins/filters.js',
    { src: '~/plugins/ga.js', ssr: false },
  ],

  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/global.scss',
  ],

  /*
  ** Headers of the page
  */
  head: {
    title: 'Browse Movies, TV Shows and People',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Browse Movies, TV Shows and People' },
      { hid: 'author', name: 'author', content: 'Jason Ujma-Alvis' },
      { hid: 'og:locale', property: 'og:locale', content: 'en_GB' },
      { hid: 'og:title', property: 'og:title', content: 'Movies App' },
      { hid: 'og:description', property: 'og:description', content: 'Browse Movies, TV Shows and People' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://movies.jason.codes/' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: 'Movies' },
      { name: 'twitter:description', content: 'Browse Movies, TV Shows and People' },
      { name: 'twitter:site', content: '@jasonujmaalvis' },
      { name: 'twitter:creator', content: '@jasonujmaalvis' },
      { name: 'twitter:image', content: 'https://movies.jason.codes/icon-medium.png' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Roboto:300,400,500' },
    ],
  },

  /*
  ** Customize the progress bar color
  */
  loading: {
    color: '#2196f3',
  },

  /*
   * Customize manifest.json
   */
  manifest: {
    name: 'Movies',
    short_name: 'Movies',
    description: 'Browse Movies, TV Shows and People',
    theme_color: '#2196f3',
    background_color: '#000000',
  },

  /*
  ** Build configuration
  */
  build: {
    loaders: {
      cssModules: {
        camelCase: true,
        localIdentName: '[local]_[hash:base64:5]',
      },
    },

    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },
};
