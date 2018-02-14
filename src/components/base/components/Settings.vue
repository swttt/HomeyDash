<template>
<div>
  <q-modal v-model="modal" no-backdrop-dismiss maximized :content-css="{background: 'rgba(0, 0, 0, 0.9)'}">
    <q-modal-layout footer-class="settings">

      <!-- Settings header -->
      <q-toolbar slot="header">
        <q-toolbar-title>
          Settings
        </q-toolbar-title>
      </q-toolbar>

      <!-- Settings footer -->
      <div slot="footer">
        <q-btn color="grey-5" outline style="margin:20px;" icon="close" v-on:click="closeModal()">
          CANCEL
        </q-btn>
        <q-btn v-on:click="saveSettings()" color="teal" icon="done" outline style="margin:20px;">
          SAVE
        </q-btn>
      </div>

      <!-- Settings body -->
      <div class="settings-content">
        <div class="row justify-center">
          <div class="col col-4 col-xs-12 col-md-4 col-lg-4">
            <q-tabs inverted color="teal">

              <q-tab default slot="title" label="General" name="general" />
              <q-tab-pane name="general">
                <q-item class="subhead text-teal">
                  Disable plugins
                  </q-item>
                <q-item v-for="plugin in plugins" :key="plugin.id">
                  <q-item-main>
                    <q-item-tile label>{{plugin.name}}</q-item-tile>
                  </q-item-main>
                  <q-item-side right>
                    <q-toggle  v-model="settings.plugins[plugin.id].hidden" color="teal" />
                  </q-item-side>
                </q-item>
              </q-tab-pane>
              <!-- Load tabs based on available plugins -->
              <template v-for="plugin in plugins" v-if="plugin.settings">
              <q-tab slot="title" :label="plugin.name" :name="plugin.id" />
              <q-tab-pane :name="plugin.id">
                <div :is="plugins[plugin.id].settings" :plugin="plugin" :settings="settings"> </div>
              </q-tab-pane>

              <q-tab default slot="title" label="Info" name="info" />
              <q-tab-pane name="info">
                <q-item class="subhead text-teal">
                  Patreon
                  </q-item>
                <q-item >
                  <q-item-main>
                  If you like my project, please consider becoming a Patron! With your support i can keep the server and coffee running.
                  <br/><br/>
                  <center><a href="https://www.patreon.com/bePatron?u=9768305" class="text-teal" style="font-size:20px;">Become a Patron now!</a></center>
                  <br/>
                  </q-item-main>
                </q-item>
                <q-item class="subhead text-teal">
                  Privacy & Cookies
                  </q-item>
                  <q-item>
                    HomeyDash is using analytic cookies to see how the dashboard is used and where it could improved. I do care about your privacy, so no personal information is stored. For that same reason i am not using Google analytics but Matomo.
                    </q-item>
              </q-tab-pane>

            </template>

            </q-tabs>
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

import plugins from '@/plugins/'


export default {
  data() {
    return {
      modal: false,
      powerUsageOptions: [],
      plugins: plugins
    }
  },
  components:{
    plugins
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
    async saveSettings() {
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

.q-list
  border 0px!important

h6
  color #009688
  font-size 22px

.subhead
  color white
  font-weight bold
  font-size 16px
</style>
