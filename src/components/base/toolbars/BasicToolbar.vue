<template>
<q-toolbar slot="header">
  <q-btn v-if="$route.matched[1].components.sidebar" round  flat @click="$root.$emit('sidebar')">
    <q-icon name="menu" />
  </q-btn>
  <q-toolbar-title>
    {{$route.name}}
    <span slot="subtitle" v-if="$route.name == 'Devices' && $route.params.zone">
        {{currentZone}}
      </span>
  </q-toolbar-title>
  <q-btn round small flat icon="settings" v-on:click="openSettings()"/>
</q-toolbar>
</template>

<script>

export default {
  data () {
    return {
      currentZone: ''
    }
  },
  components: {

  },
  mounted () {
    if (this.$route.params.zone) {
      this.getZone(this.$route.params.zone)
    }
  },
  methods: {
    getZone (zone) {
      this.$homey.zones.getZone({id: zone})
        .then(result => {
          this.currentZone = result.name
        })
    },
    openSettings () {
      this.$root.$emit('openSettings')
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.getZone(to.params.zone)
    next()
  },
  computed: {

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
