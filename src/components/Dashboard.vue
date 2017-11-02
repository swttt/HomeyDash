<template>
<div class="grid">
  <div class="grid-sizer"></div>
  <div class="grid-item" >Box1</div>
  <div class="grid-item" >box2</div>
  <div class="grid-item" >box3</div>
</div>
</template>

<script>
import Packery from "packery"
import Draggabilly from "draggabilly"
export default {
  data() {
    return {

    }
  },
  components: {

  },
  mounted() {

    var pckry = new Packery('.grid', {
      // options
      itemSelector: '.grid-item',
      gutter: 10,
      percentPosition: true,
      horizontal: true,
      rowHeight: 60
    });
    var draggableElems = document.querySelectorAll('.grid-item');
    // array of Draggabillies
    var draggies = []
    // init Draggabillies
    for(var i = 0, len = draggableElems.length; i < len; i++) {
      var draggableElem = draggableElems[i];
      var draggie = new Draggabilly(draggableElem, {
        // options...
      });
      pckry.bindDraggabillyEvents(draggie)
      draggies.push(draggie);
    }

  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
@import '~variables'

.grid
  min-width 100%
  height 100vh
  background-color rgba(0, 0, 0, 0.34)!important

.grid-item
  float left
  width 20%
  height 60px
  background #e6e5e4
  border 2px solid #b6b5b4

.grid-item--width2
  width 40%


</style>
