<template>
  <grid-layout ref="container" class="container"
            :layout="widgets"
            :col-num="12"
            :row-height="30"
            :is-draggable="true"
            :is-resizable="true"
            :is-mirrored="false"
            :vertical-compact="true"
            :margin="[10, 10]"
            :use-css-transforms="true"
            @layout-updated="layoutUpdatedEvent"
            :maxRows="totalRows"


    >

        <grid-item class="box" v-for="item in widgets" :key="item.name"
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

export default {
  data() {
    return {
      totalRows: null
    }
  },
  components: {
    GridLayout,
    GridItem
  },
  created() {
    // console.log(Math.round((window.innerHeight - 200) / 30))
    this.totalRows = Math.floor((window.innerHeight - 120) / 40);
    console.log(this.totalRows)
    console.log(window)
  },
  methods: {
    layoutUpdatedEvent(value) {
      this.widgets = value
    }
  },
  computed: {
    widgets: {
      get() {
            console.log('Change!')
            return this.$store.state.widgets
        },
        set(value) {
          this.$store.commit('updateWidgets', value)
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
  top 0
  bottom 0
  right 0
  left 0
  max-height:100%!important;
  margin 0px 10px 10px 10px

.box
  background-color white
  padding 5px


</style>
