<template>

<div class="container">
  <div class="box" data-x="3" data-y="3"> Box 1</div>
  <div class="box"> Box 2</div>
</div>
</template>

<script>
import Packery from "packery"
import Draggabilly from "draggabilly"

export default {
  data() {
    return {
      widgets: window.localStorage.getItem('widgets'),
      draggies: []
    }
  },
  components: {
  },
  mounted() {

    var draggableElems = document.querySelectorAll('.box');
    // array of Draggabillies
    // init Draggabillies
    for(var i = 0, len = draggableElems.length; i < len; i++) {
      var draggableElem = draggableElems[i];
      var draggie = new Draggabilly(draggableElem, {
        containment: '.container',
        grid: [ 10, 10 ],
        position: [0,3]
      });
      draggie.on( 'dragEnd', ( event, pointer ) => {
        console.log(this.draggies)
      })
      console.log(draggie)
      draggie.position.x = 3
      draggie.position.y =2
      this.draggies.push(draggie);
      // console.log(this.draggies);
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
  position absolute
  top 0
  bottom 0
  right 0
  left 0
  margin 0px 10px 10px 10px

.box
  height 100px
  width 200px
  background-color white
  padding 5px


</style>
