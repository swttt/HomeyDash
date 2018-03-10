import _ from 'lodash'
import plugins from 'components/plugin-system/'

let pluginObject = {}
_.forEach(plugins, plugin => {
  var obj = {}
  obj.enabled = plugin.enabled
  plugin.settings.forEach((setting) => {
    // check settings type
    if (setting.type === 'string') {
      if (setting.default) {
        obj[setting.id] = setting.default
      } else {
        obj[setting.id] = ''
      }
    } else if (setting.type === 'object') {
      if (setting.default) {
        obj[setting.id] = setting.default
      } else {
        obj[setting.id] = {}
      }
    } else if (setting.type === 'array') {
      if (setting.default) {
        obj[setting.id] = setting.default
      } else {
        obj[setting.id] = []
      }
    } else if (setting.type === 'number') {
      if (setting.default) {
        obj[setting.id] = setting.default
      } else {
        obj[setting.id] = 0
      }
    }
  })
  pluginObject[plugin.id] = obj
})

export default {
  plugins: pluginObject,
  widgets: {}
}
