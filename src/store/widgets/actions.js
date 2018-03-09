export const addWidget = ({
  commit,
  state
}, widget) => {
  return new Promise(async (resolve, reject) => {
    widget.guid = ''

    commit('addWidget', widget)
    resolve(widget)
  })
}
