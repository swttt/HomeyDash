<template>
<div>
  <q-list v-if="!loading">
    <q-item >
      <q-item-main v-if="widget.settings.showHeader">
         <h5>{{widget.settings.headerName}}</h5>
        </q-item-main>
    </q-item>
    <q-item v-for="device in widget.settings.devices" :key="device">
      <q-item-main>
        {{widget.settings.homeyDevices[device].name}}<br/><small class="text-grey">{{widget.settings.homeyDevices[device].zone.name}}</small>
        </q-item-main>
      <q-item-side right>
        <q-toggle v-model="widget.settings.homeyDevices[device].state.onoff" @change="switchDevice(device)" color="teal" />
      </q-item-side>
    </q-item>
  </q-list>
</div>
</template>

<script>
export default {
  props: ['widget'],
  data () {
    return {
      devices: {},
      loading: true
    }
  },
  async mounted () {
    await this.loopDevices()
    this.loading = false
  },
  methods: {
    async loopDevices () {
      this.widget.settings.devices.forEach(async (device) => {
        this.widget.settings.homeyDevices[device] = await this.$homey.devices.getDevice({
          id: device
        })
        await this.$homey.devices.subscribe()
        this.widget.settings.homeyDevices[device].on('$state', state => {
          // console.log(state);
        })
      })
    },
    switchDevice (device) {
      console.log(this.widget.settings.homeyDevices[device].state.onoff)
      this.widget.settings.homeyDevices[device].setCapabilityValue('onoff', this.widget.settings.homeyDevices[device].state.onoff)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'

h5
  margin 0px
  padding 0px

</style>
