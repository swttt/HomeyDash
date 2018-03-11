<template>
  <div id="q-app" >
    <div class="bg"> </div>
    <router-view v-if="!loading && !multipleHomeys" />

    <div v-else class="row loading justify-center" style="height: 100vh;">
      <div class="self-center">
        <img src="statics/logo.png" /><br/>
        <center v-if="loading">
          <q-spinner size="50px" color="grey-7" /><br/>
          <p style="margin: 20px;color:rgb(97, 97, 97);">LOADING...</p>
        </center>
        <q-list v-if="!loading && multipleHomeys" link no-border style="background-color:rgba(0,0,0,0.5);">
          <q-list-header>Select a Homey</q-list-header>
            <q-item v-for="homey in allHomeys" @click.native="selectHomey(homey.id)"  :key="homey.id">
            <q-item-main style="color:white;" :label="homey.name" />
              <q-item-side right>
                <q-item-tile icon="keyboard_arrow_right" color="white" />
              </q-item-side>
            </q-item>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import queryString from 'query-string'
import lodash from 'lodash'

export default {
  name: 'App',
  data () {
    return {
      loading: true,
      multipleHomeys: true,
      allHomeys: []
    }
  },
  methods: {
    async selectHomey (id) {
      this.loading = await true
      this.multipleHomeys = await false

      let selectedHomey = await this.$homeyAPI.forHomeyObject(lodash.find(this.allHomeys, function (homey) {
        return homey.id === id
      }))
      Vue.prototype.$homey = await selectedHomey
      this.loading = false
    }
  },
  async created () {
    let token = window.localStorage.getItem('token')
    if (token) {
      token = await this.$athomCloud.setToken(JSON.parse(token))
    }
    let qs = queryString.parse(window.location.search)
    if (qs.code) {
      token = await this.$athomCloud.authenticateWithAuthorizationCode(qs.code)
      window.history.pushState({}, '', '/')
    }
    if (!token) {
      document.location.href = this.$athomCloud.getLoginUrl()
    }

    let user = await this.$athomCloud.getAuthenticatedUser()
    let userHomeys = await user.getHomeys()
    this.allHomeys = userHomeys
    if (userHomeys.length === 1) {
      this.multipleHomeys = false
      let firstHomey = await this.$homeyAPI.forHomeyObject(userHomeys[0])
      Vue.prototype.$homey = await firstHomey
      this.loading = false
    } else {
      this.multipleHomeys = true
      this.loading = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.q-list-highlight > .q-item:hover, .q-item-highlight:hover, .q-list-link > .q-item:hover, .q-item-link:hover
  background rgba(0, 0, 0, 0.3)!important
</style>
