<template>
<div class="col-12">

  <q-list no-border>
  <q-item tag="label">
    <q-item-main label="Enable title" />
    <q-item-side right>
      <q-toggle dark color="teal" v-model="widget.settings.showHeader" />
    </q-item-side>
  </q-item>
  <q-item tag="label" v-if="widget.settings.showHeader">
    <q-item-main>
      <q-input stack-label="Title" placeholder="Your title here e.g. Living room" dark color="teal" v-model="widget.settings.headerName" />
    </q-item-main>
  </q-item>
    <q-item tag="label">
      <q-item-main>
        <q-select
          stack-label="Select devices"
            dark
            multiple
            color="teal"
            filter
            filter-placeholder="Search device..."
            :display-value="`${ widget.settings.devices.length } device${ widget.settings.devices.length !== 1 ? 's' : '' } selected`"
            v-model="widget.settings.devices"
            :options="switches"
          />
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
      switches: [],
      selected: []
    }
  },
  created () {
    this.getSwitches()
    console.log(this.switches)
  },
  methods: {
    async getSwitches () {
      await this.$homey.devices.subscribe()
      let devices = await this.$homey.devices.getDevices()
      _.forEach(devices, device => {
        if (device.capabilities.onoff) {
          this.widget.settings.homeyDevices[device.id] = device
          let option = {}
          option.label = device.name
          option.value = device.id
          option.sublabel = device.zone.name
          this.switches.push(option)
        }
      })
    }
  }
}
</script>
