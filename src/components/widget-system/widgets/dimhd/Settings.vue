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
          <q-select ilter filter-placeholder="Search device..." dark v-model="widget.settings.device" :options="dimdevices" stack-label="Select which dim capable device to show" />
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
      dimdevices: []
    }
  },
  created () {
    this.getDimDevices()
  },
  methods: {
    async getDimDevices () {
      let devices = await this.$homey.devices.getDevices()
      _.forEach(devices, device => {
        if (device.capabilities.dim) {
          this.dimdevices.push({
            label: device.name,
            sublabel: device.zone.name,
            value: device.id
          })
        }
      })
    }
  }
}
</script>
