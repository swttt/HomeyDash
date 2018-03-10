var plugins = {}

function importAll (r) {
  r.keys()
    .forEach(Key => {
      let pluginData = r(Key)

      if (!pluginData.path) {
        pluginData.path = pluginData.link
      }

      if (!pluginData.components.main) {
        pluginData.components.main = require('./plugins/' + pluginData.id + '/Main').default
      } else {
        pluginData.components.main = require('./plugins/' + pluginData.id + '/' + pluginData.components.main).default
      }

      if (!pluginData.components.sidebar) {
        pluginData.components.sidebar = null
      } else {
        pluginData.components.sidebar = require('./plugins/' + pluginData.id + '/' + pluginData.components.sidebar).default
      }

      if (!pluginData.components.toolbar) {
        pluginData.components.toolbar = require('components/base/toolbars/BasicToolbar').default
      } else {
        pluginData.components.toolbar = require('./plugins/' + pluginData.id + '/' + pluginData.components.toolbar).default
      }

      if (pluginData.components.settings) {
        pluginData.components.settings = require('./plugins/' + pluginData.id + '/' + pluginData.components.settings).default
      }

      const createPlugin = {
        id: pluginData.id,
        name: pluginData.name,
        link: pluginData.link,
        path: pluginData.path,
        icon: pluginData.icon,
        enabled: pluginData.enabled || false,
        components: pluginData.components,
        settings: pluginData.settings
      }

      plugins[createPlugin.id] = createPlugin
    })
}

importAll(require.context('./plugins/', true, /\.json$/))

export default plugins
