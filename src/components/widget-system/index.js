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

    const createWidget = {
      id: widgetData.id,
      name: widgetData.name,
      description: widgetData.description,
      width: widgetData.width,
      height: widgetData.height,
      components: widgetData.components,
      settings: widgetData.settings
    };

    widgets[createWidget.id] = createWidget;
  });
}

importAll(require.context('./widgets/', true, /\.json$/));

export default widgets;
