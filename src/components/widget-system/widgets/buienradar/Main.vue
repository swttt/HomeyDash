<template>
<div class="buienradar" :style="{ 'background': 'url(' + url + ')' }">
</div>
</template>

<script>
export default {
  props: ['widget'],
  data() {
    return {
      interval: null,
      url: "//api.buienradar.nl/image/1.0/RadarMapNL?w=250&h=300"
    }
  },
  created(){
    this.getRadar();
  },
  methods:{
    getRadar(){
      this.interval = setTimeout(() => {
        this.url = "//api.buienradar.nl/image/1.0/RadarMapNL?w=250&h=300" + '&random=' + Math.random();
        this.getRadar();
    }, 300000);
    }
  },
  beforeDestroy () {
    clearTimeout(this.interval);
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'

.buienradar
  position relative
  /* background url(https://api.buienradar.nl/image/1.0/RadarMapNL?w=250&h=300) */
</style>
