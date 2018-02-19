<template>
<q-toolbar slot="header">
  <q-btn v-if="$route.matched[0].components.sidebar" flat @click="$root.$children[0].$refs.layout.toggleLeft()">
    <q-icon name="menu" />
  </q-btn>
  <q-toolbar-title>
    {{$route.name}}
    <span slot="subtitle" v-if="$route.name == 'Devices' && $route.params.zone">
        {{$route.name}}
      </span>
  </q-toolbar-title>

  <!-- Edit mode -->
  <q-btn v-show="editMode" color="white" flat style="margin-left:20px;"  v-on:click="openWidgets()">
    <q-icon name="add" /> ADD WIDGET
  </q-btn>
  <q-btn icon="exit to app" v-show="editMode" color="red" round small style="margin-left:20px;"  v-on:click="quitEdit()"/>

  <!-- Normal mode -->
  <q-btn icon="edit" v-show="!editMode" color="white" flat style="margin-left:20px;"  v-on:click="startEdit()">
    EDIT MODE
  </q-btn>
  <q-btn round small flat style="margin-left:20px;" v-show="!editMode" v-on:click="openSettings()" icon="settings" />

</q-toolbar>
</template>

<script>
import store from 'src/store';
import {
  EventBus
} from 'src/eventBus';

export default {
  data() {
    return {
      editMode: false
    }
  },
  components: {

  },
  mounted() {
    EventBus.$on('editModeOn', () => {
      this.editMode = true;
    });
    EventBus.$on('editModeOff', () => {
      this.editMode = false;
    });
  },
  created() {

  },
  methods: {
    startEdit() {
      EventBus.$emit('editModeOn')
    },
    quitEdit() {
      EventBus.$emit('editModeOff')
    },
    openSettings(){
      EventBus.$emit('openSettings')
    },
    openWidgets(){
      EventBus.$emit('openWidgets')
    }
  }
}
</script>

<style>
.layout-header,
.q-toolbar {
  border: 0!important;
  background: rgba(255, 255, 255, 0)!important;
}
</style>
