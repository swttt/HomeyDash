import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import _ from 'lodash';

Vue.use(Vuex);

function guid() {
        function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

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
      newBox.id = guid();


      state.widgets.push(newBox);
    },
    removeWidget(state, widget){
      var index = state.widgets.findIndex(item => item.id === widget.id)
      state.widgets.splice(index, 1);
    },
    updateWidgets (state, widgets){
      state.widgets = widgets;
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
