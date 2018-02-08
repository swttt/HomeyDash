<template>

<div class="row justify-center items-center content-center alarm-row">
  <q-transition appear enter="fadeIn" leave="fadeOut">
  <div class="col col-6 col-md-6 col-lg-3 col-xs-10 alarm-container">
    <q-chip color="red" class="status">
      Unarmed
    </q-chip>
    <h3 v-if="maskedCode.length == 0" style="font-size:28px;">Enter PIN...</h3>
    <h3 v-else style="font-size:32px;font-weight:300;">{{maskedCode}}</h3>
    <div class="row">
      <div class="col col-4 number">
        <q-btn big round flat v-on:click="addPin('1')">1</q-btn>
      </div>
      <div class="col col-4 number">
        <q-btn big round flat v-on:click="addPin('2')">2</q-btn>
      </div>
      <div class="col col-4 number">
        <q-btn big round flat v-on:click="addPin('3')">3</q-btn>
      </div>
      <div class="col col-4 number">
        <q-btn big round flat v-on:click="addPin('4')">4</q-btn>
      </div>
      <div class="col col-4 number">
        <q-btn big round flat v-on:click="addPin('5')">5</q-btn>
      </div>
      <div class="col col-4 number">
        <q-btn big round flat v-on:click="addPin('6')">6</q-btn>
      </div>
      <div class="col col-4 number">
        <q-btn big round flat v-on:click="addPin('7')">7</q-btn>
      </div>
      <div class="col col-4 number">
        <q-btn big round flat v-on:click="addPin('8')">8</q-btn>
      </div>
      <div class="col col-4 number">
        <q-btn big round flat v-on:click="addPin('9')">9</q-btn>
      </div>
      <div class="col col-4 number">
        <q-btn big round flat color="red" v-on:click="clearPin()">Clear</q-btn>
      </div>
      <div class="col col-4 number">
        <q-btn big round flat v-on:click="addPin('0')">0</q-btn>
      </div>
      <div class="col col-4 number">
        <q-btn big round flat color="teal">Enter</q-btn>
      </div>
    </div>
  </div>
  </q-transition>
</div>

</template>

<script>

export default {
  data() {
    return {
      // initializing for second tab to be selected by default
      code: '',
      maskedCode: ''
    }
  },
  mounted() {

  },
  methods: {
    addPin(number){
      if(this.code.length < 6){
        this.maskedCode = this.maskedCode + '*';
        this.code = this.code + number
      }
    },
    clearPin(){
      this.maskedCode = '';
      this.code = '';
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'

.status
  position absolute
  top -10px
  right 20px

.alarm-row
  position absolute
  overflow hidden
  top 0
  bottom 0
  right 0
  left 0

.alarm-container
  background-color rgba(0, 0, 0, 0.5)
  border-radius 10px
  position relative
  padding 0

  h3
    color rgb(219, 219, 219)
    font-weight 200
    width 100%
    text-align center
    line-height 28px
    font-size 28px
    position relative
    top 30px
    margin-top 10px

  .number
    font-size 36px
    text-align center
    padding 10px 0px 10px 0px
    color white


</style>
