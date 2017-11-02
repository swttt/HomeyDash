<template>
<div class="row container">
  <div class="col-3 box"> Box 1</div>
  <div class="col-2 box" >Box 2</div>
  <div class="col-3 box" >Box 3</div>
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

    var draggableElems = document.querySelectorAll('.box');
    // array of Draggabillies
    var draggies = []
    // init Draggabillies
    for(var i = 0, len = draggableElems.length; i < len; i++) {
      var draggableElem = draggableElems[i];
      var draggie = new Draggabilly(draggableElem, {
        containment: '.container',
        grid: [ 5, 5 ]
      });
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

.container
  min-width 100%
  min-height 100vh

.box
  height 100px
  background-color white


</style>
