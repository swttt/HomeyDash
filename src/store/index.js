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

//

let pluginObject = {}
_.forEach(plugins, plugin => {
  var obj = {}
  obj.enabled = plugin.enabled;
  plugin.settings.forEach((setting) => {
    // check settings type
    if(setting.type == "string"){
      if(setting.default){
        obj[setting.id] = setting.default;
      }
      else{
        obj[setting.id] = "";
      }
    }
    else if(setting.type == "object"){
      if(setting.default){
        obj[setting.id] = setting.default;
      }
      else{
        obj[setting.id] = {};
      }
    }
    else if(settings.type == "array"){
      if(setting.default){
        obj[setting.id] = setting.default;
      }
      else{
        obj[setting.id] = [];
      }
    }


  });
  pluginObject[plugin.id] = obj;
});
console.log(pluginObject);
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



export default store;
