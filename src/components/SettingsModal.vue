<template>
<div>
  <q-modal v-model="modal" no-backdrop-dismiss maximized :content-css="{background: 'rgba(0, 0, 0, 0.9)'}">
    <q-modal-layout footer-class="settings">
      <q-toolbar slot="header">
        <q-toolbar-title class="text-teal">
          Settings
        </q-toolbar-title>

      </q-toolbar>

      <div slot="footer">
        <q-btn color="grey-5" outline style="margin:20px;" icon="close" v-on:click="closeModal()">
          CANCEL
        </q-btn>
        <q-btn v-on:click="saveSettings()" color="teal" icon="done" outline style="margin:20px;">
          SAVE
        </q-btn>
      </div>

      <div class="layout-padding settings-content">
        <div class="row">
          <div class="col col-4">
            <h6 color="teal">Power Usage</h6>
            <q-select dark frame-color="white" v-model="settings.powerUsageDevice" float-label="Select a device" radio :options="powerUsageOptions" />
          </div>
        </div>
      </div>


    </q-modal-layout>
  </q-modal>
</div>
</template>

<script>
import {
  EventBus
} from 'src/eventBus';

export default {
  data() {
    return {
      modal: false,
      powerUsageOptions: []
    }
  },
  async mounted() {
    // Event
    EventBus.$on('openSettings', () => {
      this.modal = true;
    });
    // Get devices
    let devices = await this.$homey.devices.getDevices();
    _.forEach(devices, device => {
      if(device.capabilities.measure_power) {
        let option = {};
        option.label = device.name;
        option.value = device.id;
        this.powerUsageOptions.push(option);
      }
    });
  },
  methods: {
    closeModal() {
      this.modal = false;
    },
    async saveSettings(){
      await this.$store.commit('updateSettings', this.settings)
      location.reload();
    }
  },
  computed: {
    settings: {
      get() {
        return this.$store.state.settings
      }
    }
  }
}
</script>

<style lang="stylus">

.layout-footer.settings
  background rgba(0,0,0,0)!important
  text-align center
  width 100vw

.settings-content
  color white

h6
  color #009688
</style>
