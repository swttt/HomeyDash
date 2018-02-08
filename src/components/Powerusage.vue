<template>
<div class="row justify-center items-center content-center power-row">
  <div class="col col-4 col-xs-11 col-md-4 settings-box">
    <p>No default power measure device found, please go to your settings and select one.</p>
    <q-btn color="teal" style="margin: 0 auto;" v-on:click="openSettings()" icon="settings">
      Settings
    </q-btn>
  </div>
</div>
</template>


<script>
import {
  EventBus
} from 'src/eventBus';
export default {
  components: {},
  data() {
    return {
      // initializing for second tab to be selected by default
      devices: [],
      selected: {}
    }
  },
  async mounted() {
    let devices = await this.$homey.devices.getDevices();
    _.forEach(devices, device => {
      if(device.capabilities.measure_power) {
        let option = {};
        option.label = device.name;
        option.value = device.id;
        this.devices.push(option);
      }
    });
    console.log(this.devices);
  },
  methods: {
    openSettings() {
      EventBus.$emit('openSettings')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'

.power-row
  position absolute
  overflow hidden
  top 0
  bottom 0
  right 0
  left 0

.settings-box
  background-color rgba(0, 0, 0, 0.5)
  border-radius 10px
  padding 20px
  color white
  text-align center
  h4
    width 100%
    /* text-align center */

</style>
