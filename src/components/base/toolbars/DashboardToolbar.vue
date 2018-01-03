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

  <q-btn v-if="editMode" color="white" flat style="margin-left:20px;" small v-on:click="addBox()">
    <q-icon name="add" /> ADD WIDGET
  </q-btn>
  <q-btn v-if="!editMode" color="white" flat style="margin-left:20px;" small v-on:click="startEdit()">
    <q-icon name="edit" /> EDIT MODE
  </q-btn>
  <q-btn v-if="editMode" color="red" style="margin-left:20px;" small v-on:click="quitEdit()">
    <q-icon name="exit to app" /> QUIT EDIT MODE
  </q-btn>
  <q-btn flat style="margin-left:20px;" v-if="!editMode">
    <q-icon name="settings" />
  </q-btn>
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
    addBox() {
      store.commit('addWidget');
      EventBus.$emit('widgetAdded')
      EventBus.$emit('editModeOn')
    },
    startEdit() {
      EventBus.$emit('editModeOn')
    },
    quitEdit() {
      EventBus.$emit('editModeOff')
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
