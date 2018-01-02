<template>
  <grid-layout class="container"
            :layout="widgets"
            :col-num="12"
            :row-height="30"
            :is-draggable="true"
            :is-resizable="true"
            :is-mirrored="false"
            :vertical-compact="true"
            :margin="[10, 10]"
            :use-css-transforms="true"
    >

        <grid-item class="box" v-for="item in widgets"
                   :x="item.x"
                   :y="item.y"
                   :w="item.w"
                   :h="item.h"
                   :i="item.i">
            {{item.name}}
        </grid-item>
    </grid-layout>
</template>

<script>
// import Packery from "packery"
// import Draggabilly from "draggabilly"
import {GridLayout, GridItem} from 'vue-grid-layout'
import store from 'src/store';

export default {
  data() {
    return {

    }
  },
  components: {
    GridLayout,
    GridItem
  },
  mounted() {

  },
  methods: {
    dragEnd(ev) {
      console.log(ev);
    }
  },
  computed: {
    widgets() {
      return store.state.widgets;
    }
  },
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

.box
  background-color white
  padding 5px


</style>
