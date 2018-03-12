<template>
    <div class="col-12">
      <q-list link no-border>
        <q-item tag="label">
          <q-item-main>
            <q-input stack-label="Title" placeholder="Your title here e.g. Living room" dark color="teal" v-model="widget.settings.name" />
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
            <q-item-tile label>Show thermometer icon</q-item-tile>
          </q-item-main>
          <q-item-side right>
            <q-toggle dark color="teal" v-model="widget.settings.icon" />
          </q-item-side>
        </q-item>
        <q-item tag="label">
          <q-item-main>
            <q-select dark v-model="widget.settings.thermometer" :options="thermometers" stack-label="Select which thermometer to show" />
          </q-item-main>
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
      thermometers: []
    }
  },
  created () {
    this.getThermometers()
  },
  methods: {
    async getThermometers () {
      let devices = await this.$homey.devices.getDevices()
      _.forEach(devices, device => {
        if (device.capabilities.measure_temperature) {
          this.thermometers.push({
            label: device.name,
            value: device.id
          })
        }
      })
    }
  }
}
</script>
