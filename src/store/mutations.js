
function guid() {
        function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

// WIDGETS
export const addWidget = (state) => {
  let newBox = {};
  newBox.name = "Box " + state.widgets.length;
  newBox.w = 1;
  newBox.h = 1;
  newBox.x = 0;
  newBox.y = 0;
  newBox.id = guid();


  state.widgets.push(newBox);
}

export const removeWidget =(state, widget) => {
  var index = state.widgets.findIndex(item => item.id === widget.id)
  state.widgets.splice(index, 1);
}

export const updateWidgets = (state, widgets) => {
  state.widgets = widgets;
}

// SETTINGS
export const updateSettings = (state, newSettings) => {
  state.settings = newSettings;
}
