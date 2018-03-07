import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import _ from 'lodash';

import plugins from '@/plugin-system/'
import * as getters from './getters'
import * as mutations from './mutations'

Vue.use(Vuex);

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

let pluginObject = {}
_.forEach(plugins, plugin => {
  var obj = {}
  obj.enabled = plugin.enabled;
  plugin.settings.forEach((setting) => {
    // check settings type
    if (setting.type == "string") {
      if (setting.default) {
        obj[setting.id] = setting.default;
      }
      else {
        obj[setting.id] = "";
      }
    }
    else if (setting.type == "object") {
      if (setting.default) {
        obj[setting.id] = setting.default;
      }
      else {
        obj[setting.id] = {};
      }
    }
    else if (settings.type == "array") {
      if (setting.default) {
        obj[setting.id] = setting.default;
      }
      else {
        obj[setting.id] = [];
      }
    }
    else if (settings.type == "number") {
      if (setting.default) {
        obj[setting.id] = setting.default;
      }
      else {
        obj[setting.id] = 0;
      }
    }

  });
  pluginObject[plugin.id] = obj;
});

const state = {
  widgets: [],
  settings: {
    plugins: pluginObject,
    widgets: {}
  }
}




//VUEX Stores
const store = new Vuex.Store({
  mutations,
  state,
  getters,
  plugins: [createPersistedState()],
  actions: {
    addWidget({ commit, state }, widget) {
      return new Promise(async (resolve, reject) => {
          widget.guid = '';

          commit('addWidget', widget);
          resolve(widget);
      })
    }
  }
});

export default store;
