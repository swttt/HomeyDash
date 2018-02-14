// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
require(`./themes/app.ios.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
// require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

// Uncomment the following lines if you need IE11/Edge support
// require(`quasar/dist/quasar.ie`)
// require(`quasar/dist/quasar.ie.${__THEME}.css`)

import Vue from 'vue'
import Quasar, * as All from 'quasar'
import router from './router'
import lodash from 'lodash'
import VueLodash from 'vue-lodash'
window._ = require('lodash');
import VueTouch from 'vue-touch'
import queryString from 'query-string'
import {
  Platform
} from 'quasar'
import {
  AddressbarColor
} from 'quasar'
AddressbarColor.set('#4f4f4f')

import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import store from './store';




const {
  AthomCloudAPI,
  HomeyAPI
} = require('athom-api')

navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

Vue.config.productionTip = false

Vue.filter('round', function(value) {
  if (!value) return ''

  value = value.toFixed(2)
  return value;
});

Vue.use(Vuex)
Vue.use(VueTouch, {
  name: 'v-touch'
})
// Vue.use(VueLodash, lodash)
Vue.use(Quasar, {
  components: All,
  directives: All
}) // Install Quasar Framework

if (__THEME === 'mat') {
  // require('quasar-extras/roboto-font')
}
import 'quasar-extras/material-icons'
import 'quasar-extras/ionicons'
import 'quasar-extras/fontawesome'
import 'quasar-extras/animate'



if (DEV) {
  Vue.prototype.$athomCloud = new AthomCloudAPI({
    clientId: '59e881ac57256a350db0fcf8',
    clientSecret: 'daJ0BQBWd1Jq1eIwU8msjS4qg0hM0YYLPhoLAE5U',
    redirectUrl: 'http://homeydash.local:8081',
  });
}
if (PROD) {
  Vue.prototype.$athomCloud = new AthomCloudAPI({
    clientId: '59e881ac57256a350db0fcf8',
    clientSecret: 'daJ0BQBWd1Jq1eIwU8msjS4qg0hM0YYLPhoLAE5U',
    redirectUrl: 'http://homeyda.sh',
  });
}

async function init() {
  Vue.prototype.$homeyAPI = HomeyAPI;
  Vue.prototype.$athomCloud
    .on('token', token => {
      window.localStorage.setItem('token', JSON.stringify(token));
    })
    .on('logout', () => {
      window.localStorage.removeItem('token');
    })
  let token = window.localStorage.getItem('token');
  if (token) {
    token = await Vue.prototype.$athomCloud.setToken(JSON.parse(token))
  }
  let qs = queryString.parse(window.location.search);
  if (qs.code) {
    token = await Vue.prototype.$athomCloud.authenticateWithAuthorizationCode(qs.code);
    window.history.pushState({}, "", "/");
  }
  if (!token) {
    document.location.href = Vue.prototype.$athomCloud.getLoginUrl();
  }

  Vue.prototype.$athomCloud.getAuthenticatedUser()
    .then( user => user.getHomeys() )
    .then(result => {
      if (result.length === 1) {
        Vue.prototype.$homeyAPI.forHomeyObject(result[0])
          .then(result => {
            Vue.prototype.$homey = result;
            new Vue({
              el: '#q-app',
              router,
              store,
              render: h => h(require('./App').default)
            });
          });
      }
      else {
        if (qs.cloudid) {
          Vue.prototype.$homeyAPI.forHomeyObject(lodash.find(result, function(homey) {
              return homey.id === qs.cloudid;
            }))
            .then(result => {
              Vue.prototype.$homey = result;
              /* eslint-disable no-new */
              new Vue({
                el: '#q-app',
                router,
                store,
                render: h => h(require('./App').default)
              })
            });
        }
        else {
          new Vue({
            el: '#q-app',
            router,
            store,
            render: h => h(require('./App').default)
          })
        }
      }
    })
    .catch(error => {
      console.log(error);
    });
}

init()
