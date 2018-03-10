<template>
<q-page class="row justify-center items-center content-center alarm-row">
    <div v-if="heimdallInstalled" class="col col-6 col-md-6 col-lg-3 col-xs-10 alarm-container">
      <q-chip color="red" class="status">
        Not working yet!!
      </q-chip>
      <h3 v-if="code.length == 0" style="font-size:28px;">Enter PIN...</h3>
      <h3 v-else style="font-size:32px;font-weight:300;"><span v-for="n in code.length" :key="n" style="padding: 0px 5px 0px 5px;position:relative;top:5px;">*</span></h3>
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
    <div v-else class="col col-8 col-md-8 col-lg-5 col-xs-10 alarm-container">
      <h4>This alarm panel only works with Heimdall, and it doesn't looks like you have it installed...</h4>
      <center>
        <q-btn class="link" icon="apps" color="teal" v-on:click="goTo('https://apps.athom.com/app/com.uc.heimdall')">Go to the appstore</q-btn>
      </center>
    </div>
</q-page>
</template>

<script>
export default {
  data () {
    return {
      // initializing for second tab to be selected by default
      code: '',
      heimdallInstalled: false
    }
  },
  created () {
    this.checkHeimdall()
  },
  methods: {
    addPin (number) {
      if (this.code.length < 6) {
        this.code = this.code + number
      }
    },
    clearPin () {
      this.code = ''
    },
    goTo (url) {
      // _paq.push(['trackEvent', 'Actions', 'Heimdall Appstore'])
      window.open(
        url,
        '_blank' // <- This is what makes it open in a new window.
      )
    },
    checkHeimdall () {
      this.$homey.apps.subscribe()
      this.$homey.apps.getApp({
        id: 'com.uc.heimdall'
      })
        .then(() => {
          console.log('Heimdall is installed.')
          this.heimdallInstalled = true
        })
        .catch((error) => {
          console.log(error)
        })
      this.$homey.apps.on('app.update', app => {
        this.heimdallInstalled = true
      })
      this.$homey.apps.on('app.delete', app => {
        if (app === 'com.uc.heimdall') {
          this.heimdallInstalled = false
        }
      })
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
  top 0
  bottom 0
  right 0
  left 0

.alarm-container
  background-color rgba(0, 0, 0, 0.5)
  border-radius 10px
  position relative
  padding 0

  button.link
    margin 10px

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

  h4
    color rgb(219, 219, 219)
    font-weight 200
    width 100%
    text-align center
    line-height 28px
    font-size 28px
    padding 5px

  .number
    font-size 36px
    text-align center
    padding 10px 0px 10px 0px
    color white

</style>
