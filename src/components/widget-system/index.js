var widgets = {};

function importAll(r) {
  r.keys().forEach(Key => {
    let widgetData = r(Key);


    if (!widgetData.components.main)
      widgetData.components.main = require('./widgets/' + widgetData.id + '/Main').default;
    else
      widgetData.components.main = require('./widgets/' + widgetData.id + '/' + widgetData.components.main).default;

    if (widgetData.components.settings)
      widgetData.components.settings = require('./widgets/' + widgetData.id + '/' + widgetData.components.settings).default;

    let settingsObj = {};
    widgetData.settings.forEach((setting) => {
      // check settings type
      if (setting.type == "string") {
        if (setting.default) {
          settingsObj[setting.id] = setting.default;
        }
        else {
          settingsObj[setting.id] = "";
        }
      }
      else if (setting.type == "object") {
        if (setting.default) {
          settingsObj[setting.id] = setting.default;
        }
        else {
          settingsObj[setting.id] = {};
        }
      }
      else if (setting.type == "array") {
        if (setting.default) {
          settingsObj[setting.id] = setting.default;
        }
        else {
          settingsObj[setting.id] = [];
        }
      }
      else if (setting.type == "boolean") {
        if (setting.default) {
          settingsObj[setting.id] = setting.default;
        }
        else {
          settingsObj[setting.id] = false;
        }
      }
      else if (setting.type == "number") {
        if (setting.default) {
          settingsObj[setting.id] = setting.default;
        }
        else {
          settingsObj[setting.id] = false;
        }
      }
    });

    widgets.__defineGetter__(widgetData.id, function() {
      const createWidget = {
        type: widgetData.id,
        name: widgetData.name,
        description: widgetData.description,
        author: widgetData.author,
        width: widgetData.width,
        height: widgetData.height,
        components: widgetData.components,
        settings: Object.assign({}, settingsObj)
      };
      return createWidget;
    });
})}

importAll(require.context('./widgets/', true, /\.json$/));

export default widgets;
