


// WIDGETS
export const addWidget = (state, widget) => {
  let newBox = {};
  newBox.components = widget.components;
  newBox.name = widget.name;
  newBox.id = widget.id;
  newBox.author = widget.author;
  newBox.description = widget.description;
  newBox.width = widget.width;
  newBox.height = widget.height;
  newBox.x = 0;
  newBox.y = 0;
  newBox.guid = widget.guid;
  newBox.settings = widget.settings;

  state.widgets.push(newBox);
}

export const removeWidget =(state, widget) => {
  var index = state.widgets.findIndex(item => item.guid === widget.guid)
  state.widgets.splice(index, 1);
  delete state.settings.widgets[widget.guid];
}


export const updateWidgets = (state, widgets) => {
  state.widgets = widgets;
}

// SETTINGS
export const updateSettings = (state, newSettings) => {
  state.settings = newSettings;
}
