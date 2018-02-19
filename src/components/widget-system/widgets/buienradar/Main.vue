<template>
<div v-bind:style="{ width: widget.w + 'px', height: widget.h + 'px'  }" class="buienradar">
</div>
</template>

<script>
export default {
  props: ['widget'],
  data() {
    return {}
  },
  created() {
    console.log(this.widget);
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'

.buienradar
  position relative
  background url(https://api.buienradar.nl/image/1.0/RadarMapNL?w=250&h=300)
  /* -webkit-background-size cover
  -moz-background-size cover
  -o-background-size cover
  background-size cover */
</style>
