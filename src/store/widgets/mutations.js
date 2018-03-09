function guid () {
  return new Promise((resolve, reject) => {
    function s4 () {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
    }
    resolve(s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4())
  })
}

// WIDGETS
export const addWidget = async (state, widget) => {
  let newWidget = {}
  newWidget = widget
  newWidget.guid = await guid()
  newWidget.x = 0
  newWidget.y = 0
  state.widgets.push(widget)
}

export const removeWidget = (state, widget) => {
  var index = state.widgets.findIndex(item => item.guid === widget.guid)
  state.widgets.splice(index, 1)
}

export const updateWidgets = (state, widgets) => {
  state.widgets = widgets
}

export const updateWidget = (state, widget) => {
  state.widgets[widget.guid] = widget
}
