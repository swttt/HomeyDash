<template>
<!-- Don't drop "q-app" class -->
<div id="q-app">
  <header></header>
  <main>
    <q-layout id="layout" ref="layout" view="lhh LpR fFf" :right-breakpoint="1100">
      <router-view slot="header" v-if="!selectHomey" name="toolbar"></router-view>
      <router-view class="scroll" slot="left" v-if="$route.matched[0].components.sidebar && !selectHomey" name="sidebar"></router-view>

      <router-view v-if="!selectHomey" name="main"></router-view>
      <q-tabs v-if="!selectHomey" slot="navigation">
          <q-route-tab slot="title" icon="dashboard" to="/" exact label="Dashboard" />
        <q-route-tab v-for="plugin in plugins" :key="plugin.id" v-if="settings.plugins[plugin.id].enabled" slot="title" :icon="plugin.icon" :to="plugin.link" exact :label="plugin.name" />
      </q-tabs>
      <div v-if="selectHomey">
        <div class="row justify-center" style="height:100vh;">
          <div style="min-width:250px;margin-top:20%;">
            <q-list style="background-color:white;" highlight separator>
              <q-list-header>Select a Homey</q-list-header>
              <q-item v-for="homey in homeys" :key="homey" v-on:click="loadHomey(homey.id)">
                <!-- <q-item-side>
                  <q-item-tile avatar>
                    <img src="/statics/img/icon.svg" style="padding:5px;"/>
                  </q-item-tile>
                </q-item-side> -->
                <q-item-main :label="homey.name" />

              </q-item>
            </q-list>

          </div>
        </div>
      </div>
      <settings/>
    </q-layout>
  </main>
</div>
</template>

<script>
/*
 * Root component
 */

import settings from '@/base/components/Settings'
import plugins from '@/plugins/'
export default {
  data() {
    return {
      // initializing for second tab to be selected by default
      selectHomey: true,
      homeys: [],
      plugins: plugins
    }
  },
  components: {
    settings,
    plugins
  },
  async created() {
    if(this.$homey) {
      this.selectHomey = false;
    } else {

      let user = await this.$athomCloud.getAuthenticatedUser()
      this.homeys = user.getHomeys();
      // console.log(this.homeys)
    }
  },
  methods: {
    loadHomey(id) {
      console.log(id)
      window.location.href = "/?cloudid=" + id
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

<style>
* {
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: -moz-none;
  -o-user-select: none;
  user-select: none;
}

html,
body {
  position: fixed !important;
  top: 0;
  bottom: 0;
  overflow: hidden !important;
}

#layout {
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  background: url(assets/bg.jpg) no-repeat center center fixed !important;
  -webkit-background-size: cover !important;
  -moz-background-size: cover !important;
  -o-background-size: cover !important;
  background-size: cover !important;
}

.layout-aside {
  background-color: #E0E1E2;
  border: 0 !important;
}

.layout-footer {
  border: 0 !important;
  position: fixed;
  bottom: 0;
  /* Status bar height on iOS 11.0 */
  padding-bottom: constant(safe-area-inset-bottom);
  /* Status bar height on iOS 11+ */
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
