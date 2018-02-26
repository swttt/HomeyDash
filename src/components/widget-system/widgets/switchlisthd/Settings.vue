<template>
<div class="col-12">
  <p>Select devices for in your widget</p>
  <q-select
      dark
      multiple
      toggle

      color="teal"
      v-model="widget.settings.devices"
      :options="switches"
    />
</div>
</template>

<script>
export default {
  props: ['widget'],
  data() {
    return {
      switches: [],
      selected: []
    }
  },
  created() {

    this.getSwitches();
    console.log(this.switches)
  },
  methods:{
    async getSwitches(){
      await this.$homey.devices.subscribe();
      let devices = await this.$homey.devices.getDevices();
      _.forEach(devices, device => {
        if(device.capabilities.onoff){
          this.widget.settings.homeyDevices[device.id] = device;
          let option = {}
          option.label = device.name;
          option.value = device.id;
          this.switches.push(option);
        }
      });
    }
  }
}
</script>
