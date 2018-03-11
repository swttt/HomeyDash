/*
export const someMutation = (state) => {
}
*/
export const updateSettings = (state, newSettings) => {
  state.settings = JSON.stringify(newSettings)
}
