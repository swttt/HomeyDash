<template>
<div>
  <div class="row" v-if="!$route.params.zone">
    <h5>
      <q-icon name="fa-arrow-left" /> Select a zone in the sidebar
    </h5>
  </div>

  <div class="row devices" v-else>
    <div  class="col-lg-2 col-md-2 col-xs-4 col-sm-2" v-for="device in devices" v-if="device.zone.id === $route.params.zone && device.class == 'light' || device.class == 'other'">
      <component :is="device.class" :device="device">
        <!-- inactive components will be cached! -->
      </component>
    </div>

  </div>
</div>
</template>

<script>
import light from '@/widgets/devices/Light'
import other from '@/widgets/devices/Other'

export default {
  components: {
    light,
    other
  },
  data() {
    return {
      // initializing for second tab to be selected by default
      devices: {}
    }
  },
  async mounted() {
    await this.$homey.devices.subscribe();
    this.devices = await this.$homey.devices.getDevices();
    _.forEach(this.devices, device => {
      device.on('$state', state => {
        // console.log(state);
      })
    });
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
@import '~variables'

h5
  width 100%
  color $neutral
  text-align center


</style>
