<template>
    <div class="col-12">
      <q-list no-border>
        <q-item tag="label">
          <q-item-main>
            <q-input stack-label="Title" placeholder="Your title here e.g. Living room" dark color="teal" v-model="widget.settings.name" />
          </q-item-main>
        </q-item>
        <q-item tag="label">
          <q-item-main>
            <q-select filter filter-placeholder="Search device..." dark v-model="widget.settings.thermometer" :options="thermometers" stack-label="Select which thermometer to show" @input="hasHumidity" />
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
            <q-item-tile label>Show icon(s)</q-item-tile>
          </q-item-main>
          <q-item-side right>
            <q-toggle dark color="teal" v-model="widget.settings.icon" />
          </q-item-side>
        </q-item>
        <q-item tag="label" v-if="this.humidity">
          <q-item-main>
            <q-item-tile label>Show humidity</q-item-tile>
          </q-item-main>
          <q-item-side right>
            <q-toggle dark color="teal" v-model="widget.settings.humidity" />
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
      thermometers: [],
      humidity: false
    }
  },
  created () {
    this.getThermometers()
    this.showHumidity()
  },
  methods: {
    async getThermometers () {
      let devices = await this.$homey.devices.getDevices()
      _.forEach(devices, device => {
        if (device.capabilities.measure_temperature) {
          this.thermometers.push({
            label: device.name,
            sublabel: device.zone.name,
            value: device.id
          })
        }
      })
    },
    async showHumidity () {
      if (!(this.widget.settings.thermometer instanceof Array)) {
        var device = await this.$homey.devices.getDevice({ id: this.widget.settings.thermometer })
        if (device.capabilities.measure_humidity) {
          this.humidity = true
        }
      }
    },
    async hasHumidity (newValue) {
      var device = await this.$homey.devices.getDevice({ id: newValue })
      if (device.capabilities.measure_humidity) {
        this.humidity = true
      } else {
        this.humidity = false
        this.widget.settings.humidity = false
      }
    }
  }
}
</script>
