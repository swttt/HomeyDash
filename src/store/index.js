import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import _ from 'lodash';

import plugins from '@/plugins/'
import * as getters from './getters'
import * as mutations from './mutations'

Vue.use(Vuex);

let pluginObject = {}
_.forEach(plugins, plugin => {
  var obj = {}
  obj.hidden = plugin.hidden || false;
  _.forEach(plugin.store, (setting, key) => {
    obj[key] = setting;
  });
  pluginObject[plugin.id] = obj;
});




const state = {
  widgets: [],
  settings: {
    plugins: pluginObject
  }
}
//VUEX Stores
const store = new Vuex.Store({
  mutations,
  state,
  getters,
  plugins: [createPersistedState()]
});

if (module.hot) {
  module.hot.accept([
    './getters',
    './mutations'
  ], () => {
    store.hotUpdate({
      getters: require('./getters'),
      mutations: require('./mutations')
    })
  })
}

export default store;
