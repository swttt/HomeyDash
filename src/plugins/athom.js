export default async ({
  Vue
}) => {
  Vue.filter('round', function (value) {
    if (!value) return ''

    value = value.toFixed(2)
    return value
  })

  Vue.prototype.$athomCloud = new window.AthomAPI.AthomCloudAPI({
    clientId: process.env.CLIENT,
    clientSecret: process.env.SECRET,
    redirectUrl: process.env.CALLBACK
  })

  Vue.prototype.$homeyAPI = window.AthomAPI.HomeyAPI

  Vue.prototype.$athomCloud
    .on('token', token => {
      window.localStorage.setItem('token', JSON.stringify(token))
    })
    .on('logout', () => {
      window.localStorage.removeItem('token')
    })
}
