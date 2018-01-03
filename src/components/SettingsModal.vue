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
        <q-btn color="teal" icon="done" outline style="margin:20px;">
          SAVE
        </q-btn>
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
      modal: false
    }
  },
  mounted() {
    EventBus.$on('openSettings', () => {
      this.modal = true;
    });
  },
  methods: {
    closeModal(){
      this.modal = false;
    }
  }
}
</script>

<style lang="stylus">

.layout-footer.settings
  background rgba(0,0,0,0)!important
  text-align center
  width 100vw

</style>
