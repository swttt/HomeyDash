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

      <div class="widgets-content">
      <div v-if="!widget">
        <div class="row gutters-md">
          <div class="col-3 col-xs-6 col-sm-4 col-md-3 col-lg-2" v-for="widget in widgets" :key="widget.id" style="padding:10px;">
            <q-btn color="teal" class="widget" v-on:click="selectWidget(widget)" outline>{{widget.name}}</q-btn>
          </div>
        </div>
      </div>

      <div v-if="widget">
        <div class="row justify-center">
          <div class="col col-6 col-xs-12 col-md-6 col-lg-6">
            <q-list>
              <q-item>
                <q-item-main>
                  <q-item-tile label>
                    <h4>{{widget.name}}</h4></q-item-tile>
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
              <q-item v-if="widget.components.settings">
                <q-item-main>
                  <q-item-tile label>
                    <h5>Settings</h5></q-item-tile>
                </q-item-main>
              </q-item>
              <q-item v-if="widget.components.settings">
                <q-item-main>
                  <component :is="widget.components.settings" :widget="widget"> </component>
                </q-item-main>
              </q-item>
            </q-list>
          </div>
        </div>
      </div>
    </div>

    </q-modal-layout>

  </q-modal>
</div>
</template>

<script>

import widgets from 'components/widget-system/'

export default {
  data () {
    return {
      modal: false,
      widget: null,
      widgets: widgets
    }
  },
  components: {

  },
  mounted () {
    // Event
    this.$root.$on('openWidgets', () => {
      this.modal = true
    })
  },
  beforeDestroy () {
    this.$root.$off('openWidgets')
  },
  methods: {
    selectWidget (widget) {
      this.widget = widget

      // this.$store.dispatch('addWidget')
    },
    async closeWidgets () {
      this.modal = await false
      console.log('Modal: ' + this.modal)
    },
    async addWidget (widget) {
      await this.$store.dispatch('widgets/addWidget', widget)
      await this.closeWidgets()
      this.widget = null
      this.$root.$emit('widgetAdded')
    },
    async modalBack () {
      // await this.$store.commit('removeWidget', this.widget);
      this.widget = null
    }
  }
}
</script>

<style lang="stylus">

.widgets-content
  color white

.q-list
  border 0px!important

h4, h5, h6
  color #009688
  margin 0

.subhead
  color white
  font-weight bold
  font-size 16px

.widget
  height 100px
  width 100%
</style>
