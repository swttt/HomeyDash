import Vue from 'vue'
import VueRouter from 'vue-router'

// Base Components
import DashboardToolbar from '@/base/toolbars/DashboardToolbar'
import BasicToolbar from '@/base/toolbars/BasicToolbar'
import Dashboard from '@/base/components/Dashboard'



import plugins from '@/plugin-system/'

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
const routes = [
  {
    name: 'Dashboard',
    path: '/',
    components: {
      main: Dashboard,
      toolbar: DashboardToolbar,
      sidebar: null
    }
  }]

  _.forEach(plugins, plugin => {
    var obj = {};
    obj.name = plugin.name;
    obj.components = plugin.components;
    obj.path = plugin.path;
    routes.push(obj);
  });

const router = new VueRouter({
   routes
});

router.beforeEach((to, from, next) => {
  if (PROD) {
    _paq.push(['setReferrerUrl', from.path]);
    _paq.push(['setCustomUrl', to.path]);
    _paq.push(['setDocumentTitle', 'HomeyDash - ' + to.name]);
    _paq.push(['trackPageView']);
  }
  next();
});




export default router
