<template>
<!-- Don't drop "q-app" class -->
<div id="q-app">
  <header></header>
  <main>
    <q-layout id="layout" ref="layout" view="lhh LpR fFf" :right-breakpoint="1100">
      <q-toolbar v-if="!selectHomey" slot="header">
        <q-btn v-if="$route.matched[0].components.sidebar" flat @click="$refs.layout.toggleLeft()">
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title>
          {{$route.name}}
        </q-toolbar-title>
        <q-btn flat>
          <q-icon name="settings" />
        </q-btn>
      </q-toolbar>
      <router-view id="sidebar" v-if="$route.matched[0].components.sidebar && !selectHomey" slot="left" name="sidebar"></router-view>
      </router-view>
      <router-view v-if="!selectHomey" name="main"></router-view>
      <q-tabs v-if="!selectHomey" slot="navigation">
        <q-route-tab slot="title" icon="dashboard" to="/" exact label="Dashboard" />
        <q-route-tab slot="title" icon="power" :to="{ name: 'Devices'}" replace exact label="Devices" />
        <q-route-tab slot="title" icon="fa-spotify" to="/spotify" exact label="Spotify" />
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
                <q-item-main :label="homey.name"/>

              </q-item>
            </q-list>

          </div>
        </div>
      </div>
    </q-layout>
  </main>
</div>
</template>

<script>
/*
 * Root component
 */
export default {
  data() {
    return {
      // initializing for second tab to be selected by default
      selectHomey: true,
      homeys: []
    }
  },
  async created() {
    if(this.$homey) {
      this.selectHomey = false;
    } else {
      this.homeys = await this.$athomCloud.getHomeys()
      // console.log(this.homeys)
    }
  },
  methods: {
    loadHomey(id){
      console.log(id)
      window.location.href = "/?cloudid="+id
    }
  }
}
</script>

<style>
html, body{

}
#layout {
  background: url(assets/bg.jpg) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  position: absolute!important;
  top:0!important;
  left:0!important;
  right:0!important;
  bottom:0!important;
}

.layout-aside {
  background-color: #E0E1E2;
  border: 0!important;
}

.layout-footer {
  border: 0!important;
}

.layout-header,
.q-toolbar {
  border: 0!important;
  background: rgba(255, 255, 255, 0)!important;
}
</style>
