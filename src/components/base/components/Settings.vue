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
                  Plugins
                </q-item>
                <q-item v-for="plugin in plugins" :key="plugin.id">
                  <q-item-main>
                    <q-item-tile label>{{plugin.name}}</q-item-tile>
                  </q-item-main>
                  <q-item-side right>
                    <q-toggle v-model="settings.plugins[plugin.id].enabled" color="teal" />
                  </q-item-side>
                </q-item>
              </q-tab-pane>
              <!-- Load tabs based on available plugins -->
              <template v-for="plugin in plugins" v-if="plugin.components.settings && settings.plugins[plugin.id].enabled">
              <q-tab slot="title" :label="plugin.name" :name="plugin.id" />
              <q-tab-pane :name="plugin.id">
                <div :is="plugins[plugin.id].components.settings" :plugin="plugin" :settings="settings.plugins[plugin.id]"> </div>
              </q-tab-pane>
              </template>

              <q-tab slot="title" label="Info" name="info" />
              <q-tab-pane name="info">
                <q-item class="subhead text-teal">
                  Patreon
                </q-item>
                <q-item>
                  <q-item-main>
                    If you like my project, please consider becoming a Patron! With your support i can keep the server and coffee running.
                    <br/><br/>
                    <center><a href="https://www.patreon.com/bePatron?u=9768305" target="_blank" class="text-teal" style="font-size:20px;">Become a Patron now!</a></center>
                    <br/>
                  </q-item-main>
                </q-item>
                <q-item class="subhead text-teal">
                  Privacy & Cookies
                </q-item>
                <q-item>
                  HomeyDash is using analytic cookies to see how the dashboard is used and where it could improve. I do care about your privacy, so no personal information is stored. For that same reason i am not using Google analytics but Matomo.
                </q-item>
                <q-item class="subhead text-red">
                  Danger Zone
                </q-item>
                <q-item>
                  Only use the remove local storage button if you are 100% sure you want to clear all settings.
                </q-item>
                <q-item>
                  <q-btn color="red" style="width: 100%;" v-on:click="clearStorage()" icon="delete">REMOVE LOCAL STORAGE</q-btn>
                </q-item>
              </q-tab-pane>

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

import plugins from '@/plugin-system/'


export default {
  data() {
    return {
      modal: false,
      powerUsageOptions: [],
      plugins: plugins
    }
  },
  components: {
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
    },
    clearStorage() {
        localStorage.removeItem('vuex');
        setTimeout(() => {
          location.reload();
        }, 1000);

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
  margin-bottom 50px

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
