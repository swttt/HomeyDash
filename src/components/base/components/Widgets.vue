<template>
<div>
  <q-modal v-model="modal" no-backdrop-dismiss maximized :content-css="{background: 'rgba(0, 0, 0, 0.9)'}">

    <q-modal-layout footer-class="widgets">

      <!-- Widgets header -->
      <q-toolbar slot="header">
        <q-toolbar-title v-if="!widget">
          Select a widget type
        </q-toolbar-title>
        <q-toolbar-title v-if="widget">
          Widget info
        </q-toolbar-title>
      </q-toolbar>

      <!-- Widgets footer -->
      <div slot="footer">
        <q-btn v-if="!widget" color="grey-5" outline style="margin:20px;" icon="close" v-on:click="closeWidgets()">
          CANCEL
        </q-btn>
        <q-btn v-if="widget" color="grey-5" outline style="margin:20px;" icon="arrow_back" v-on:click="modalBack()">
          BACK
        </q-btn>
        <q-btn v-if="widget" color="teal" outline style="margin:20px;" icon="add" v-on:click="addWidget(widget)">
          ADD
        </q-btn>
      </div>

      <div class="widgets-content" v-if="!widget">
        <div class="row justify-center items-center gutters-md" style="position:absolute;top:30px;bottom:50px;left:10px;right:10px;">
          <div class="col-2" v-for="widget in widgets" style="padding:10px;">
            <q-btn color="teal" class="widget" v-on:click="selectWidget(widget)" outline>{{widget.name}}</q-btn>
          </div>
        </div>
      </div>

      <div class="widgets-content" v-if="widget">
        <div class="row justify-center" style="position:absolute;top:50px;bottom:50px;left:10px;right:10px;">
          <div class="col col-4 col-xs-12 col-md-4 col-lg-4">
            <!-- <h4>{{widget.name}}</h4>
            <span class="label">Author</span>
            <p>{{widget.description}}</p> -->

            <q-list style="padding-bottom: 100px;">
              <q-item>
                <q-item-main>
                  <q-item-tile label>
                    <h5>{{widget.name}}</h5></q-item-tile>
                </q-item-main>
              </q-item>
              <q-item>
                <q-item-side left icon="fa-user" color="teal" />
                <q-item-main>
                  {{widget.author}}
                </q-item-main>
              </q-item>
              <q-item>
                <q-item-side left icon="info" color="teal" />
                <q-item-main>
                  {{widget.description}}
                </q-item-main>
              </q-item>
              <q-item v-if="widget.type">
                <q-item-main>
                  <q-item-tile label>
                    <h5>Settings</h5></q-item-tile>
                </q-item-main>
              </q-item>
              <q-item v-if="widget.type">
                <q-item-main>
                  <component :is="widget.components.settings" :widget="widget"> </component>
                </q-item-main>
              </q-item>
            </q-list>
          </div>
        </div>
      </div>

    </q-modal-layout>



  </q-modal>
</div>
</template>

<script>
import {
  EventBus
} from 'src/eventBus';

import widgets from '@/widget-system/'

export default {
  data() {
    return {
      modal: false,
      widget: null,
      widgets: widgets
    }
  },
  components: {

  },
  async mounted() {

    // Object.defineProperty(this.widgets, 'simplebox', { configurable: false });
    console.log(this.widgets);
    // Event
    EventBus.$on('openWidgets', () => {
      this.modal = true;
      // this.widgets = widgets;
    });
  },
  methods: {
    selectWidget(widget) {
      this.widget = widget


      // this.$store.dispatch('addWidget')
    },
    async closeWidgets() {
      this.modal = await false;
      console.log('Modal: ' + this.modal);
    },
    async addWidget(widget) {
      await this.$store.dispatch('addWidget', widget)
      await this.closeWidgets();
      this.widget = null;
      EventBus.$emit('widgetAdded');
    },
    async modalBack() {
      // await this.$store.commit('removeWidget', this.widget);
      this.widget = null;
    }
  }
}
</script>

<style lang="stylus">

.layout-footer.widgets
  background rgba(0,0,0,0)!important
  text-align center
  width 100vw

.widgets-content
  color white

.q-list
  border 0px!important

h4, h5, h6
  color #009688

.subhead
  color white
  font-weight bold
  font-size 16px

.widget
  height 100px
  width 100%
</style>
