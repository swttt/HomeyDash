import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import settings from './settings'
import widgets from './widgets'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    settings,
    widgets
  },
  plugins: [createPersistedState()]
})

export default store
