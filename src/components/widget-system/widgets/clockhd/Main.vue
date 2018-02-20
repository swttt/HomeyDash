<template>
<div class="row">
  <div class="col-12" style="text-align:center;">
    <span class="time">{{time}}</span>
  </div>
  <div class="col-12">
    <span class="day" v-if="widget.settings.showDay">{{day}}</span>
  </div>
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
        this.time = moment().format('HH:mm:ss');
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

.time
  font-size 64px
  font-weight 200
  margin-left 0 auto
  display inline-block
  text-align left
  width 230px

.day
  font-size 20px
  width 100%
  text-align center
  display inline-block
  margin-top -10px
  padding-bottom 10px

  small
    font-size 30px
    line-height 30px
    padding-left 35px

</style>
