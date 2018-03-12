<template>
<<<<<<< HEAD:src/components/widget-system/widgets/togglebuttonshd/Main.vue
  <div class="onoff" v-if="!loading" v-on:click="switchDevice" >
    <div class="icon" v-bind:style="{ maskImage: 'url(' + widget.settings.icon + ')' }"></div>
=======
  <div class="onoff" v-if="!loading" v-on:click="switchDevice">
    <div class="icon" v-bind:style="{ maskImage: 'url(' + this.widget.settings.icon + ')' }"></div>
>>>>>>> de7f689ef842ee83e1a5283e32b9d8689b7b0627:src/components/widget-system/widgets/togglebuttonhd/Main.vue
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
      state: true
    }
  },
  async mounted () {
    await this.getOnOffDevice()
    this.loading = false

    setTimeout(() => {
      if (this.state) {
        document.querySelector('.icon').style.backgroundColor = this.widget.settings.oncolor
      } else {
        document.querySelector('.icon').style.backgroundColor = this.widget.settings.offcolor
      }
    }, 1000)
  },
  methods: {
    async getOnOffDevice () {
      this.device = await this.$homey.devices.getDevice({ id: this.widget.settings.onoff })
      this.state = this.device.state.onoff
      await this.$homey.devices.subscribe()
    },
    async switchDevice () {
      if (this.state) {
        this.device.setCapabilityValue('onoff', false)
        this.state = false
        document.querySelector('.icon').style.backgroundColor = this.widget.settings.offcolor
      } else {
        this.device.setCapabilityValue('onoff', true)
        this.state = true
        document.querySelector('.icon').style.backgroundColor = this.widget.settings.oncolor
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
