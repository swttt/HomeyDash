/*
export const someGetter = (state) => {}
 */
export const getWidgets = (state) => {
  return state.widgets
}

export const getWidget = (state) => (id) => {
  console.log(state.widgets.find(widget => widget.id === id))
  return state.widgets.find(widget => widget.id === id)
}
