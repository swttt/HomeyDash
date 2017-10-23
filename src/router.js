import Vue from 'vue'
import VueRouter from 'vue-router'

import Devices from '@/Devices'
import Devices_sidebar from '@/Devices_sidebar'
import Dashboard from '@/Dashboard'
import Spotify from '@/Spotify'

const {
  AthomCloudAPI,
  HomeyAPI
} = require('athom-api')

Vue.use(VueRouter)

/*
 * Uncomment this section and use "load()" if you want
 * to lazy load routes.
function load (component) {
  // '@' is aliased to src/components
  return () => import(`@/${component}.vue`)
}
*/

const router = new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */
  // mode: 'history',
  routes: [
  {
    name: 'Devices',
    path: '/devices/:zone?',
    components: {
      main: Devices,
      sidebar: Devices_sidebar
    }
  },
  {
    name: 'Dashboard',
    path: '/',
    components: {
      main: Dashboard,
      sidebar: null
    }
  },
  {
    name: 'Spotify',
    path: '/spotify',
    components: {
      main: Spotify,
      sidebar: null
    }
  }]
});




export default router
