<template>
<div>
  <h1>{{time}}<br/><small>{{day}}</small></h1>
</div>
</template>

<script>
import * as moment from 'moment';

export default {
  props: ['widget'],
  data() {
    return {
      time:'',
      day: '',
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
        this.day = moment().format('D. MMMM YYYY');
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
  padding-left 15px
  padding-top 30px
  padding-bottom 15px
  width 100%
  text-align left
  line-height 30px

  small
    font-size 30px
    line-height 30px
    padding-left 35px

</style>
