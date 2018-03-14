<template>
  <div class="dim" v-if="!loading">
    <q-slider
      v-model="dim"
      :min="0"
      :max="100"
      :step="1"
      color="teal"
      label
      label-always
      snap
      @input="changeDim"
    />
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
      loading: true,
      dim: 0,
      timeout: 1000
    }
  },
  async mounted () {
    await this.getDimDevice()
    this.loading = false
  },
  methods: {
    async getDimDevice () {
      this.device = await this.$homey.devices.getDevice({ id: this.widget.settings.device })
      this.dim = this.device.state.dim * 100
      await this.$homey.devices.subscribe()
      this.device.on('$state', state => {
        this.dim = this.device.state.dim * 100
      })
    },
    changeDim (newVal) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        var dimLevel = newVal / 100
        this.device.setCapabilityValue('dim', dimLevel)
      }, 1000)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~variables'

  .dim
    text-align center
    padding 6px
    padding-top 0
</style>
