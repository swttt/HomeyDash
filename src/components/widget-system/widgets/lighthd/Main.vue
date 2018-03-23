<template>
  <div class="light" v-if="!loading">
    <v-touch v-on:tap="switchDevice">
      <div class="icon" v-bind:style="{ maskImage: 'url(' + widget.settings.icon + ')', backgroundColor: widget.settings.offcolor }"></div>
      <h5>{{ widget.settings.name }}</h5>
      <small class="text-grey" v-if="widget.settings.room">{{ device.zone.name }}</small>
    </v-touch>
    <q-list>
      <q-item v-if="widget.settings.dim">
        <q-item-side icon="brightness_medium" />
        <q-item-main>
          <q-slider
            :value="dim"
            :min="0"
            :max="1"
            :step="0.1"
            color="teal"
            snap
            @change="changeDim"
          />
        </q-item-main>
      </q-item>
      <q-item v-if="widget.settings.colortemperature">
        <q-item-side icon="brightness_3" />
        <q-item-main>
          <q-slider
            :value="colortemperature"
            :min="0"
            :max="1"
            :step="0.1"
            color="teal"
            snap
            @change="changeColortemperature"
          />
        </q-item-main>
      </q-item>
    </q-list>
    <q-color-picker
      :value="color"
      dark
      color="teal"
      @change="changeColor"
    />
  </div>
</template>

<script>
var convert = require('color-convert')

export default {
  props: ['widget'],
  data () {
    return {
      device: {},
      loading: true,
      state: false,
      dim: 0,
      colortemperature: 0,
      color: '#ffffff',
      timeout: null
    }
  },
  async mounted () {
    await this.getLight()
    this.loading = false

    setTimeout(() => {
      if (this.state) {
        this.$el.querySelector('.icon').style.backgroundColor = this.widget.settings.oncolor
      }
    }, 1000)
  },
  methods: {
    async getLight () {
      this.device = await this.$homey.devices.getDevice({ id: this.widget.settings.device })
      this.state = this.device.state.onoff
      this.dim = this.device.state.dim
      this.colortemperature = this.device.state.light_temperature
      var hue = this.device.state.light_hue * 360
      var saturation = this.device.state.light_saturation * 100
      var dimLevel = this.device.state.dim * 100
      this.color = '#' + convert.hsv.hex(hue, saturation, dimLevel).toLowerCase()

      await this.$homey.devices.subscribe()
      this.device.on('$state', state => {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.timeout = null
          this.state = this.device.state.onoff
          if (this.device.state.onoff) {
            this.$el.querySelector('.icon').style.backgroundColor = this.widget.settings.oncolor
          } else {
            this.$el.querySelector('.icon').style.backgroundColor = this.widget.settings.offcolor
          }
          if (this.device.state.dim !== this.dim) {
            this.dim = this.device.state.dim
          }
          if (this.device.state.light_temperature !== this.colortemperature) {
            this.colortemperature = this.device.state.light_temperature
          }
          var hue = this.device.state.light_hue * 360
          var saturation = this.device.state.light_saturation * 100
          var dimLevel = this.device.state.dim * 100
          var newColor = '#' + convert.hsv.hex(hue, saturation, dimLevel).toLowerCase()
          if (newColor !== this.color) {
            this.color = newColor
          }
        }, 2000)
      })
    },
    async switchDevice () {
      if (this.state) {
        this.device.setCapabilityValue('onoff', false)
        this.state = false
        this.$el.querySelector('.icon').style.backgroundColor = this.widget.settings.offcolor
      } else {
        this.device.setCapabilityValue('onoff', true)
        this.state = true
        this.$el.querySelector('.icon').style.backgroundColor = this.widget.settings.oncolor
      }
    },
    changeDim (newVal) {
      this.dim = newVal
      this.device.setCapabilityValue('dim', newVal)
    },
    changeColortemperature (newVal) {
      this.colortemperature = newVal
      this.device.setCapabilityValue('light_temperature', (1 - newVal))
    },
    changeColor (newVal) {
      var hsv = convert.hex.hsv(newVal)
      var hue = hsv[0] / 359
      var saturation = hsv[1] / 100
      this.device.setCapabilityValue('light_hue', hue)
      this.device.setCapabilityValue('light_saturation', saturation)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~variables'

  .light
    text-align center
    padding 6px
    padding-top 0

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

  .light .q-item
    padding-left 0
    padding-right 0

  .light .q-item-section + .q-item-section
    margin-left 0
</style>
