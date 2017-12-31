<template>
<q-toolbar slot="header">
  <q-btn v-if="$route.matched[0].components.sidebar" flat @click="$root.$children[0].$refs.layout.toggleLeft()">
    <q-icon name="menu" />
  </q-btn>
  <q-toolbar-title>
    {{$route.name}}
    <span slot="subtitle" v-if="$route.name == 'Devices' && $route.params.zone">
        {{$route.params.zone}}
      </span>
  </q-toolbar-title>
  <q-btn flat>
    <q-icon name="settings" />
  </q-btn>
</q-toolbar>
</template>

<script>

export default {
  data() {
    return {

    }
  },
  components: {

  },
  mounted() {

  },
  methods: {

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
