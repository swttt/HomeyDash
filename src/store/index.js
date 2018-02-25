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

function guid() {
  return new Promise((resolve, reject) => {
        function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        resolve(s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4());
    });
  };


//VUEX Stores
const store = new Vuex.Store({
  mutations,
  state,
  getters,
  plugins: [createPersistedState()],
  actions: {
    addWidget({ commit, state }, widget) {
      return new Promise(async (resolve, reject) => {
          let id = await guid();
          widget.guid = id;
          commit('addWidget', widget);
          resolve(widget);
      })
    }
  }
});

export default store;
