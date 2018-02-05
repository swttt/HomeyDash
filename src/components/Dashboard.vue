<template>
<div class="container">

  <q-transition group appear enter="fadeIn" leave="fadeOut">
  <div v-for="item in widgets" v-bind:class="{ edit: editMode }" :key="item.name" :itemId="item.i" :x="item.x" :y="item.y" class="box">
    {{item.name}}
  </div>
  </q-transition>

</div>
</template>

<script>
import Draggabilly from "draggabilly"

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
      draggies: []
    }
  },
  components: {
    // GridLayout,
    // GridItem
  },
  mounted() {
    EventBus.$on('editModeOff', () => {
      this.editMode = false;
    });
    EventBus.$on('editModeOn', () => {
      this.editMode = true;
    });

    EventBus.$on('widgetAdded', () => {
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
        if(!this.editMode) {
          draggie.disable();
        }
        draggie.on('dragEnd', (event, pointer) => {
          this.widgets[event.target.getAttribute("itemId")].x = this.draggies[event.target.getAttribute("itemId")].position.x;
          this.widgets[event.target.getAttribute("itemId")].y = this.draggies[event.target.getAttribute("itemId")].position.y;
          this.$store.commit('updateWidgets', this.widgets);
        })
        this.draggies.push(draggie);
      }
    }
  },
  computed: {
    widgets: {
      get() {
        return this.$store.state.widgets
      },
      set(value) {
        this.$store.commit('updateWidgets', value)
      }
    }
  },
  watch: {
    // whenever question changes, this function will run
    editMode: function () {
      if(this.editMode){
        _.forEach(this.draggies, box => {
          box.enable();
        })
      }
      else{
        _.forEach(this.draggies, box => {
          box.disable();
        })
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
@import '~variables'

.container
  position absolute
  overflow hidden
  top 0
  bottom 0
  right 0
  left 0
  margin 0px 10px 10px 10px

.edit
  background-color rgba(255, 0, 0, 0.29)!important

.box
  padding 5px
  width 300px
  height 150px
  position absolute
  top 0
  left 0
  background-color rgba(0, 0, 0, 0.5)
  border-radius 10px
  color white


</style>
