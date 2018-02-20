<template>
<div class="container">

  <q-transition group appear enter="fadeIn" leave="fadeOut">
    <div v-for="item in widgets" v-bind:class="{ edit: editMode }" :key="item.id" :itemId="item.id" :x="item.x" :y="item.y" class="box">
      <div v-bind:style="{ width: item.width + 'px', height: item.height + 'px'  }" :is="widgettypes[item.type].components.main" :itemId="item.id" :widget="item"></div>
      <div :itemId="item.id" class="edit-mode" v-if="editMode">
        <v-touch class="close" v-show="editMode" v-on:tap="removeWidget(item)">
          <q-btn round color="red" icon="delete" /></v-touch>
          <v-touch class="edit" v-show="editMode" v-on:tap="editWidget(item)">
            <q-btn round color="orange" icon="edit" /></v-touch>
      </div>
    </div>
  </q-transition>
  <widgetsmodal />
  <editwidget />
</div>
</template>

<script>
import widgetsmodal from '@/base/components/Widgets'
import editwidget from '@/base/components/EditWidget'
import widgettypes from '@/widget-system/'
import Draggabilly from "draggabilly"
import _ from 'lodash';
Draggabilly.prototype.setPosition = function (x, y) {
  this.position.x = x;
  this.position.y = y;
  this.setLeftTop();
};

import {
  EventBus
} from 'src/eventBus';

export default {
  data() {
    return {
      editMode: false,
      draggies: [],
      widgettypes: widgettypes,
      widgetEditted: {}
    }
  },
  components: {
    widgetsmodal,
    editwidget
  },
  mounted() {
    console.log(this.widgets);
    EventBus.$on('editModeOff', () => {
      this.editMode = false;
      _.forEach(this.draggies, box => {
        box.disable();
      });
    });
    EventBus.$on('editModeOn', () => {
      this.editMode = true;
      _.forEach(this.draggies, box => {
        box.enable();
      });
    });

    EventBus.$on('saveWidget', (widget) => {
      this.$store.commit('saveWidget', widget);

    });

    EventBus.$on('widgetAdded', () => {
      _.forEach(this.draggies, box => {
        box.destroy();
      });
      setTimeout(() => {
        this.createDrag();
      }, 100);
    });

    this.createDrag();



  },
  methods: {
    createDrag() {
      this.draggies = [];
      var draggableElems = document.querySelectorAll('.box');
      // init Draggabillies
      for(var i = 0, len = draggableElems.length; i < len; i++) {
        var draggableElem = draggableElems[i];
        var draggie = new Draggabilly(draggableElem, {
          containment: '.container',
          grid: [5, 5]
        });
        // Set properties

        draggie.setPosition(draggableElem.getAttribute("x"), draggableElem.getAttribute("y"))
        draggie.id = draggableElem.getAttribute("itemId");
        if(this.editMode) {
          draggie.enable()
        } else {
          draggie.disable();
        }
        draggie.on('dragEnd', (event, pointer) => {
          var index = this.widgets.findIndex(item => item.id === event.target.getAttribute("itemId"))
          this.widgets[index].x = this.draggies[index].position.x;
          this.widgets[index].y = this.draggies[index].position.y;
          this.$store.commit('updateWidgets', this.widgets);
        })
        this.draggies.push(draggie);
      }
    },
    removeWidget(widget) {

      this.$store.commit('removeWidget', widget);

    },
    editWidget(widget){
      EventBus.$emit('editWidget', widget.id);
    }
  },
  computed: {
    widgets: {
      get() {
        return this.$store.getters.getWidgets
      },
      set(value) {
        this.$store.commit('updateWidgets', value)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
@import '~variables'

.container
  position absolute
  top 0
  bottom 0
  right 0
  left 0
  margin 0px 10px 10px 10px

.edit
  /* background-color rgba(255, 0, 0, 0.29)!important */

.box
  position absolute
  overflow hidden
  top 0
  left 0
  background-color rgba(0, 0, 0, 0.5)
  border-radius 10px
  color white

.edit-mode
  position absolute
  /* overflow hidden */
  background-color rgba(#009688, 0.29)!important
  top 0
  left 0
  right 0
  bottom 0
  border-radius 10px
  color white
  .close
    position absolute
    top -6px
    right -6px
    text-align right
    z-index 10
  .edit
    position absolute
    top -6px
    left -6px
    text-align left
    z-index 10


</style>
