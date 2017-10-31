<template>
<div>
  <div class="row" v-if="!$route.params.zone">
    <h5>
      <q-icon name="fa-arrow-left" /> Select a zone in the sidebar
    </h5>
  </div>

  <div class="row devices" v-else>

    <!-- ONOFF Capabilities -->
    <div v-if="device.zone.id === $route.params.zone && device.capabilities.onoff && !device.capabilities.alarm_motion && device.class != 'windowcoverings'" class="col-lg-2 col-md-2 col-xs-4 col-sm-2" v-for="device in devices">
      <onoff :device="device" />
    </div>

    <!-- LOCK -->
    <div v-if="device.zone.id === $route.params.zone && device.capabilities.locked" class="col-lg-2 col-md-2 col-xs-4 col-sm-2" v-for="device in devices">
      <lock :device="device" />
    </div>

    <!-- MOTION -->
    <div v-if="device.zone.id === $route.params.zone && device.capabilities.alarm_motion" class="col-lg-2 col-md-2 col-xs-4 col-sm-2" v-for="device in devices">
      <motion :device="device" />
    </div>

    <div v-if="device.zone.id === $route.params.zone && !device.capabilities.alarm_motion && device.class == 'sensor'" class="col-lg-2 col-md-2 col-xs-4 col-sm-2" v-for="device in devices">
      <sensor :device="device" />
    </div>

    <!-- WINDOWBLINDS -->
    <div v-if="device.zone.id === $route.params.zone && device.class == 'windowcoverings' && device.capabilities.dim" class="col-lg-2 col-md-2 col-xs-4 col-sm-2" v-for="device in devices">
      <windowblinds :device="device" />
    </div>

  </div>
</div>
</template>

<script>
import onoff from '@/widgets/devices/Onoff'
import lock from '@/widgets/devices/Lock'
import motion from '@/widgets/devices/Motion'
import windowblinds from '@/widgets/devices/Windowblinds'
import sensor from '@/widgets/devices/Sensor'

export default {
  components: {
    onoff,
    lock,
    motion,
    windowblinds,
    sensor
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
