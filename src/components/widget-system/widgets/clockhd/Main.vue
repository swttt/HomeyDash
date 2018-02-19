<template>
<div>
  <h1>{{time}}</h1>
</div>
</template>

<script>
import * as moment from 'moment';

export default {
  props: ['widget'],
  data() {
    return {
      time:'',
      interval: null
    }
  },
  created(){
    this.getTime();

  },
  methods:{
    getTime(){
      this.interval = setTimeout(() => {
        this.time = moment().format('H:mm:ss');
        this.getTime();
    }, 1000);
    }
  },
  beforeDestroy () {
    clearTimeout(this.interval);
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'

h1
  margin 0px
  padding-left 10px
  width 100%
  text-align left

</style>
