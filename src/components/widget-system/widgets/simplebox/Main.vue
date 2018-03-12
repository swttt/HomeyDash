<template>
<div class="content" v-bind:class="{centered: widget.settings.centered}">
  {{widget.settings.text}}
  </div>
</template>

<script>
export default {
  props: ['widget'],
  data () {
    return {
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'

.content
  padding 10 px
.centered
  padding 10px
  text-align center
</style>
