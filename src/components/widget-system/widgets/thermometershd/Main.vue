<template>
  <div class="thermometer" v-if="!loading">
    <i class="fa fa-thermometer-full fa-2x icon" aria-hidden="true" v-if="widget.settings.icon"></i>
    <div class="data"><span class="temperature">{{ device.state.measure_temperature }}</span><span class="unit">{{ device.capabilities.measure_temperature.units.en }}</span></div>
    <h5>{{ widget.settings.name }}</h5>
    <small class="text-grey" v-if="widget.settings.room">{{ device.zone.name }}</small>
  </div>
</template>

<script>
export default {
  props: ['widget'],
  data () {
    return {
      device: {},
      loading: true
    }
  },
  async mounted () {
    await this.getThermometer()
    this.loading = false
  },
  methods: {
    async getThermometer () {
      this.device = await this.$homey.devices.getDevice({ id: this.widget.settings.thermometer })
      await this.$homey.devices.subscribe()
      this.device.on('$state', state => {
        // console.log(state);
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~variables'

  .thermometer
    text-align center
    padding 6px

  .thermometer .icon
    padding 6px 0

  .thermometer .data
    padding-top 5px

  .thermometer .temperature
    font-size 2.2rem

  .thermometer .unit
    font-size 1rem
    padding-left 6px
</style>
