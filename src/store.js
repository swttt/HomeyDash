import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import _ from 'lodash';

Vue.use(Vuex);

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

//VUEX Stores
const store = new Vuex.Store({
  state: {
    widgets: [],
    settings: {
      powerUsageDevice: ""
    }
  },
  mutations: {
    // WIDGETS
    addWidget (state) {
      let newBox = {};
      newBox.name = "Box " + state.widgets.length;
      newBox.w = 1;
      newBox.h = 1;
      newBox.x = 0;
      newBox.y = 0;
      newBox.i = state.widgets.length;
      state.widgets.push(newBox);
    },
    removeWidget(state, widget){
      var index = state.widgets.findIndex(item => item.i === widget.i)
      state.widgets.splice(index, 1);
    },
    updateWidgets (state, newWidgets){
      state.widgets = newWidgets;
    },
    // SETTINGS
    updateSettings (state, newSettings){
      state.settings = newSettings;
    }
  },
  getters: {
   getWidgets: state => {
     return state.widgets;
   }
 },
  plugins: [createPersistedState()]
});

export default store;
