import VueTouch from 'vue-touch'

export default ({
  Vue
}) => {
  console.log(VueTouch)
  Vue.use(VueTouch, {
    name: 'v-touch'
  })
}
