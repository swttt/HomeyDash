<template>
  <div class="col-12">
    <q-list no-border>
      <q-item tag="label">
        <q-item-main>
          <q-input stack-label="Title" placeholder="Your title here e.g. Light" dark color="teal" v-model="widget.settings.name" />
        </q-item-main>
      </q-item>
      <q-item tag="label">
        <q-item-main>
          <q-item-tile label>Show Room</q-item-tile>
        </q-item-main>
        <q-item-side right>
          <q-toggle dark color="teal" v-model="widget.settings.room" />
        </q-item-side>
      </q-item>
      <q-item tag="label">
        <q-item-main>
          <q-select filter filter-placeholder="Search device..." dark v-model="widget.settings.device" :options="lights" stack-label="Select which light to show" @input="checkCapabilities" />
        </q-item-main>
      </q-item>
      <q-item tag="label">
        <q-item-main>
          <q-uploader dark color="teal" stack-label="Upload SVG icon" :url="'/'" :extensions="'.svg'" no-thumbnails hide-upload-button hide-upload-progress :headers="{'content-type': 'image/svg+xml' }" :send-raw="true" @add="added" />
        </q-item-main>
        <q-item-side right>
          <div id="preview" v-bind:style="{ maskImage: 'url(' + this.widget.settings.icon + ')' }"></div>
          <div class="previewtitle">Icon Preview</div>
        </q-item-side>
      </q-item>
      <q-list-header>Colors</q-list-header>
      <q-item tag="label">
        <q-item-main>
          <q-item-tile label>Off Color</q-item-tile>
        </q-item-main>
        <q-item-side right>
          <q-color dark color="teal" v-model="widget.settings.offcolor" />
        </q-item-side>
      </q-item>
      <q-item tag="label">
        <q-item-main>
          <q-item-tile label>On Color</q-item-tile>
        </q-item-main>
        <q-item-side right>
          <q-color dark color="teal" v-model="widget.settings.oncolor" />
        </q-item-side>
      </q-item>
      <q-list-header v-if="showOptions">Options</q-list-header>
      <q-item tag="label" v-if="this.hasDim">
        <q-item-main>
          <q-item-tile label>Show brightness slider</q-item-tile>
        </q-item-main>
        <q-item-side right>
          <q-toggle dark color="teal" v-model="widget.settings.dim" />
        </q-item-side>
      </q-item>
      <q-item tag="label" v-if="this.hasColortemperature">
        <q-item-main>
          <q-item-tile label>Show color temperature slider</q-item-tile>
        </q-item-main>
        <q-item-side right>
          <q-toggle dark color="teal" v-model="widget.settings.colortemperature" />
        </q-item-side>
      </q-item>
      <q-item tag="label" v-if="this.hasColor">
        <q-item-main>
          <q-item-tile label>Show color picker</q-item-tile>
        </q-item-main>
        <q-item-side right>
          <q-toggle dark color="teal" v-model="widget.settings.color" />
        </q-item-side>
      </q-item>
      <q-item tag="label">
        <q-item-main>
          <q-input dark v-model="widget.width" type="number" stack-label="Widget Width" />
        </q-item-main>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  props: ['widget'],
  data () {
    return {
      lights: [],
      hasDim: false,
      hasColortemperature: false,
      hasColor: false
    }
  },
  created () {
    this.getLights()
    this.loadCapabilities()
  },
  methods: {
    async getLights () {
      let devices = await this.$homey.devices.getDevices()
      _.forEach(devices, device => {
        if (device.class === 'light') {
          this.lights.push({
            label: device.name,
            sublabel: device.zone.name,
            value: device.id
          })
        }
      })
    },
    added (files) {
      var file = files[0]
      var reader = new FileReader()

      reader.addEventListener('load', () => {
        this.widget.settings.icon = reader.result
      }, false)

      if (file) {
        reader.readAsDataURL(file)
      }
    },
    async loadCapabilities () {
      if (!(this.widget.settings.device instanceof Array)) {
        var device = await this.$homey.devices.getDevice({ id: this.widget.settings.device })
        if (device.capabilities.dim) {
          this.hasDim = true
        }
        if (device.capabilities.light_temperature) {
          this.hasColortemperature = true
        }
        if (device.capabilities.light_hue) {
          this.hasColor = true
        }
      }
    },
    async checkCapabilities (newValue) {
      var device = await this.$homey.devices.getDevice({ id: newValue })
      if (device.capabilities.dim) {
        this.hasDim = true
      } else {
        this.hasDim = false
        this.widget.settings.dim = false
      }
      if (device.capabilities.light_temperature) {
        this.hasColortemperature = true
      } else {
        this.hasColortemperature = false
        this.widget.settings.colortemperature = false
      }
      if (device.capabilities.light_hue) {
        this.hasColor = true
      } else {
        this.hasColor = false
        this.widget.settings.color = false
      }
    }
  },
  computed: {
    showOptions: function () {
      if (this.hasDim || this.hasColortemperature || this.hasColor) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="stylus">
  #preview
    display: block
    width: auto
    height: auto
    min-height: 75px
    min-width: 75px
    background-color: #fff
    margin-left: 20px
    -webkit-mask-position center center
    mask-position center center
    -webkit-mask-repeat no-repeat
    mask-repeat no-repeat
    -webkit-mask-size auto 60px
    mask-size auto 60px

  .previewtitle
    background-color: #009688
    color: #fff
    text-align: center
    border-radius: 5px
    margin-top: 6px
    margin-left: 20px
    padding: 4px 8px
</style>
