<template>
<div>
  <q-modal v-if="widget" v-model="editModal" no-backdrop-dismiss maximized :content-css="{background: 'rgba(0, 0, 0, 0.9)'}">

    <q-modal-layout footer-class="widgets">

      <!-- Widgets header -->
      <q-toolbar slot="header">
        <q-toolbar-title>
          Edit Widget
        </q-toolbar-title>
      </q-toolbar>

      <!-- Widgets footer -->
      <div slot="footer">
        <q-btn color="grey-5" outline style="margin:20px;" icon="close" v-on:click="closeModal()">
          CANCEL
        </q-btn>
        <q-btn color="teal" outline style="margin:20px;" icon="add" v-on:click="saveWidget()">
          SAVE
        </q-btn>
      </div>

      <div class="widgets-content">
        <div class="row justify-center" style="position:absolute;top:50px;bottom:50px;left:10px;right:10px;">
          <div class="col col-4 col-xs-12 col-md-4 col-lg-4">
            <!-- <h4>{{widgetSelected.name}}</h4>
            <span class="label">Author</span>
            <p>{{widgetSelected.description}}</p> -->

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
              <q-item v-if="widget">
                <q-item-main>
                  <q-item-tile label>
                    <h5>Settings</h5></q-item-tile>
                </q-item-main>
              </q-item>
              <q-item v-if="widget">
                <q-item-main>
                  <component :is="widgets[widget.id].components.settings" :key="widget.guid" :widget.sync="widget" :settings.sync="settings[widget.guid]"> </component>
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
      editModal: false,
      widgets: widgets,
      widget: null
    }
  },
  components: {

  },
  created() {


  },
  mounted(){
    // Event
    EventBus.$on('editWidget', async (widget) => {
      console.log('edit this: ', widget)
      this.widget = await widget;
      this.editModal = true;
    });
  },
  methods: {
    saveWidget() {
      this.$store.commit('editWidgetSettings', this.settings);
      this.closeModal();
      console.log('widget update: ', this.widget);
    },
    closeModal(){
      EventBus.$emit('exitEdit');
      this.editModal = false;
      console.log('editModal: '+ this.editModal)
    }
  },
  computed: {
    settings: {
      get() {
        return this.$store.getters.getWidgetsSettings
      }
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
