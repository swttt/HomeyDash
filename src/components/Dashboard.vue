<template>
<container class="row" :layout.sync="layoutJson">
  <box class="col-3"  boxId="box-a">
    <h1>Box 1</h1>
  </box>
  <box boxId="box-b">
    <h1>Box 2</h1>
  </box>
</container>
</template>

<script>
import {
  Container,
  Box
} from '@dattn/dnd-grid'
export default {
  data() {
    return {
      layoutJson: [{
          id: 'box-a',
          hidden: false,
          pinned: false,
          position: {
            x: 0,
            y: 0,
            w: 1,
            h: 1
          }
        },
        {
          id: 'box-b',
          hidden: false,
          pinned: false,
          position: {
            x: 1,
            y: 0,
            w: 1,
            h: 1
          }
        },
      ]
    }
  },
  components: {
    Container,
    Box,
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
@import '~variables'



</style>
