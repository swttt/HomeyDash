<template>
    <div class="col-12">
        <q-input stack-label="Title" placeholder="Your title here e.g. Living room" dark color="teal" v-model="widget.settings.name" />
        <q-select dark v-model="widget.settings.pusage" :options="powermeter" stack-label="Select which powermeter to show" />
<q-list-header>Details to show</q-list-header>
<q-item tag="label">
<q-item-main>
<q-item-tile label>Show room</q-item-tile>
</q-item-main>
    <q-item-side right>
        <q-toggle dark v-model="widget.settings.room" color="teal" />
    </q-item-side>
  </q-item>
  <q-item tag="label">
  <q-item-main>
  <q-item-tile label>Show power icon</q-item-tile>
  </q-item-main>
      <q-item-side right>
          <q-toggle dark v-model="widget.settings.icon" color="teal" />
      </q-item-side>
    </q-item>
    <q-input dark v-model="widget.width" type="number" stack-label="Widget Width" />
    </div>
</template>

<script>
import _ from 'lodash'
export default {
  props: ['widget'],
  data () {
    return {
      powermeter: []
    }
  },
  created () {
    this.getPowermeter()
  },
  methods: {
    async getPowermeter () {
      let devices = await this.$homey.devices.getDevices()
      await _.forEach(devices, device => {
        if (device.capabilities.meter_power) {
          this.powermeter.push({
            label: device.name,
            value: device.id
          })
        }
      })
    }
  }
}
</script>
