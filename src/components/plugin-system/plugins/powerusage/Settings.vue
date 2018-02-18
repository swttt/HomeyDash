<template>
<div>
  <q-list v-if="!loading">
    <q-item>
      <q-item-main>
        <q-select dark frame-color="white" v-model="settings.defaultDevice" float-label="Select a default power meter device" radio :options="powerUsageOptions" />
      </q-item-main>
    </q-item>
  </q-list>
  <div v-if="loading">
    <center><q-spinner style="margin-top:25px;" color="teal-4" size="50px" /></center>
  </div>
</div>
</template>

<script>
export default {
  props: ['plugin', 'settings'],
  data() {
    return {
      powerUsageOptions: [],
      loading: true
    }
  },
  async created() {
    // Get devices
    let devices = await this.$homey.devices.getDevices();
    await _.forEach(devices, device => {
      if(device.capabilities.measure_power) {
        let option = {};
        option.label = device.name;
        option.value = device.id;
        this.powerUsageOptions.push(option);
      }
    });
    this.loading = false;
  }
}
</script>
