<template>
<div class="content" v-if="widget.settings.centered">
  <q-item-title class="text-white"><center>{{widget.settings.text}}</center></q-item-title>
  </div>
<div class="content" v-else>
  <q-item-title class="text-white">{{widget.settings.text}}</q-item-title>
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
