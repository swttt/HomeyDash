<template>
<div class="buienradar">
</div>
</template>

<script>
export default {
  props: ['widget']
}
</script>

<style lang="stylus" scoped>
@import '~variables'

.buienradar
  position relative
  background url(https://api.buienradar.nl/image/1.0/RadarMapNL?w=250&h=300)
</style>
