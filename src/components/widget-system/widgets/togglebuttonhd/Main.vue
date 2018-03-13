<template>
  <div class="onoff" v-if="!loading" v-on:click="switchDevice">
    <div class="icon" v-bind:style="{ maskImage: 'url(' + widget.settings.icon + ')', backgroundColor: widget.settings.offcolor }"></div>
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
      state: false
    }
  },
  async mounted () {
    await this.getOnOffDevice()
    this.loading = false

    setTimeout(() => {
      if (this.state) {
        this.$el.querySelector('.icon').style.backgroundColor = this.widget.settings.oncolor
      }
    }, 1000)
  },
  methods: {
    async getOnOffDevice () {
      this.device = await this.$homey.devices.getDevice({ id: this.widget.settings.onoff })
      if (this.device.capabilities.onoff) {
        this.state = this.device.state.onoff
      }
      await this.$homey.devices.subscribe()
    },
    async switchDevice () {
      if (this.device.capabilities.onoff) {
        if (this.state) {
          this.device.setCapabilityValue('onoff', false)
          this.state = false
          this.$el.querySelector('.icon').style.backgroundColor = this.widget.settings.offcolor
        } else {
          this.device.setCapabilityValue('onoff', true)
          this.state = true
          this.$el.querySelector('.icon').style.backgroundColor = this.widget.settings.oncolor
        }
      } else if (this.device.capabilities.button) {
        this.device.setCapabilityValue('button', true)
        this.$el.querySelector('.icon').style.backgroundColor = this.widget.settings.oncolor
        setTimeout(() => {
          this.$el.querySelector('.icon').style.backgroundColor = this.widget.settings.offcolor
        }, 2000)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~variables'

  .onoff
    text-align center
    padding 6px

  .icon
    display block
    width auto
    height auto
    min-height 75px
    -webkit-mask-position center center
    mask-position center center
    -webkit-mask-repeat no-repeat
    mask-repeat no-repeat
    -webkit-mask-size auto 60px
    mask-size auto 60px
</style>
