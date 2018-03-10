<template>
<q-layout class="layout" view="lHh LpR fFf" :right-breakpoint="1100">
  <q-layout-header>
    <router-view name="toolbar"></router-view>
  </q-layout-header>

  <q-layout-footer>
    <q-tabs>
        <q-route-tab slot="title" icon="dashboard" :to="{ name: 'Dashboard' }" exact label="Dashboard" />
        <q-route-tab v-for="plugin in plugins" :key="plugin.id" v-if="settings.plugins[plugin.id].enabled" slot="title" :icon="plugin.icon" :to="plugin.link" exact :label="plugin.name" />
    </q-tabs>
  </q-layout-footer>

  <q-layout-drawer side="left" v-model="sidebarOpen" v-if="$route.matched[1].components.sidebar">
    <router-view name="sidebar"></router-view>
  </q-layout-drawer>

  <q-page-container>
    <router-view name="main" />
  </q-page-container>
  <settings />
</q-layout>
</template>

<script>
import {
  openURL
} from 'quasar'
import settings from 'components/base/views/Settings'
import plugins from 'components/plugin-system/'

export default {
  name: 'LayoutDefault',
  data () {
    return {
      plugins: plugins,
      sidebarOpen: true
    }
  },
  components: {
    settings,
    plugins
  },
  methods: {
    openURL,
    switchSidebar () {
      this.sidebarOpen = !this.sidebarOpen
    }
  },
  mounted () {
    this.$root.$on('sidebar', this.switchSidebar)
  },
  beforeDestroy () {
    this.$root.$off('sidebar')
  },
  computed: {
    settings: {
      get () {
        return this.$store.state.settings
      }
    }
  }
}
</script>

<style>
</style>
