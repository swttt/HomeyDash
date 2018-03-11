<template>
<div class="content" v-if="widget.settings.centered">
  <q-item-tile class="text-white"><center>{{widget.settings.text}}</center></q-item-tile>
  </div>
<div class="content" v-else>
  <q-item-tile class="text-white">{{widget.settings.text}}</q-item-tile>
</div>
</template>

<script>
export default {
  props: ['widget'],
  data () {
    return {
      centered: []
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'

.content
  padding 10px
</style>
