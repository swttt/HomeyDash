// Configuration for your app

module.exports = function (ctx) {
  return {
    // app plugins (/src/plugins)
    plugins: [
      'axios',
      'athom',
      'vtouch'
    ],
    css: [
      'app.styl'
    ],
    animations: [
      'fadeIn',
      'fadeOut'
    ],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons',
      'ionicons',
      'mdi',
      'fontawesome',
    ],
    supportIE: false,
    vendor: {
      add: [],
      remove: []
    },
    build: {
      env: ctx.dev ? { // so on dev we'll have
        CLIENT: JSON.stringify('59e881ac57256a350db0fcf8'),
        SECRET: JSON.stringify('daJ0BQBWd1Jq1eIwU8msjS4qg0hM0YYLPhoLAE5U'),
        CALLBACK: JSON.stringify('http://homeydash.local:8081')
      } : { // and on build (production):
        CLIENT: JSON.stringify('59e881ac57256a350db0fcf8'),
        SECRET: JSON.stringify('daJ0BQBWd1Jq1eIwU8msjS4qg0hM0YYLPhoLAE5U'),
        CALLBACK: JSON.stringify('https://' + process.env.URL)
      },
      scopeHoisting: true,
      vueRouterMode: 'history',
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      // useNotifier: false,
      extendWebpack(cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules|quasar)/
        })
      }
    },
    devServer: {
      // https: true,
      port: 8081,
      open: true // opens browser window automatically
    },
    framework: 'all',
    // framework: {
    //   components: [
    //     'QLayout',
    //     'QLayoutHeader',
    //     'QLayoutDrawer',
    //     'QPageContainer',
    //     'QPage',
    //     'QToolbar',
    //     'QToolbarTitle',
    //     'QBtn',
    //     'QIcon',
    //     'QList',
    //     'QListHeader',
    //     'QItem',
    //     'QItemMain',
    //     'QItemSide',
    //     'QInput'
    //   ],
    //   directives: [
    //     'Ripple'
    //   ],
    //   // Quasar plugins
    //   plugins: [
    //     'Notify'
    //   ]
    // },
    // animations: 'all' --- includes all animations
    animations: [],
    pwa: {
      cacheExt: 'js,html,css,ttf,eot,otf,woff,woff2,json,svg,gif,jpg,jpeg,png,wav,ogg,webm,flac,aac,mp4,mp3',
      manifest: {
        name: 'HomeyDash',
        short_name: 'HomeyDash-PWA',
        description: 'Dashboard app for Homey',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#396976',
        theme_color: '#009688',
        icons: [{
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      extendWebpack(cfg) {
        // do something with cfg
      },
      packager: {
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      }
    },

    // leave this here for Quasar CLI
    starterKit: '1.0.0'
  }
}
