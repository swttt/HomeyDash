import plugins from 'components/plugin-system/'
import _ from 'lodash'

const routes = [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      {
        name: 'Dashboard',
        path: '',
        components: {
          main: () => import('components/base/views/Dashboard'),
          toolbar: () => import('components/base/toolbars/DashboardToolbar'),
          sidebar: null
        }
      }
    ]
  }

  // { // Always leave this as last one
  //   path: '*',
  //   component: () => import('pages/404')
  // }
]

// const routes = [{
//   name: 'Dashboard',
//   path: '/',
//   components: {
//     main: () => import('components/base/views/Dashboard'),
//     toolbar: () => import('components/base/toolbars/DashboardToolbar'),
//     sidebar: null
//   }
// }]

_.forEach(plugins, plugin => {
  var obj = {}
  obj.name = plugin.name
  obj.components = plugin.components
  obj.path = plugin.path
  routes[0].children.push(obj)
})

export default routes
// export default [
//   {
//     path: '/',
//     component: () => import('layouts/default'),
//     children: [
//       { path: '', component: () => import('pages/index') }
//     ]
//   },
//
//   { // Always leave this as last one
//     path: '*',
//     component: () => import('pages/404')
//   }
// ]
