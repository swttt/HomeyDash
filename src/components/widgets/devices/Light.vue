<template>
<v-touch v-on:press="test(device)" v-on:tap="setCapability(device, 'onoff')" class="device">
  <div class="icon" v-bind:class="[device.state.onoff ? 'on' : 'off']" :style="'-webkit-mask-image: url('+$homey._baseUrl+device.icon+')'"></div>
  <div class="name">{{device.name}}</div>
</v-touch>
</template>

<script>
export default {
  props: ['device'],
  data() {
    return {
      // initializing for second tab to be selected by default
      devices: {}
    }
  },
  methods: {
    test(device){
      if (navigator.vibrate) {
      	navigator.vibrate(150);
      }
    },
    setCapability(device, capability){
        device.setCapabilityValue(capability, !device.state.onoff)

    }
  }
}


  </script>

  <style lang="stylus" scoped>
  @import '~variables'

  .device
    height 90px
    margin 5px
    padding 5px
    text-align center
    background-color rgba(0, 0, 0, 0.12)
    border-radius 10px
    .icon
      height 50px
      width 50px
      margin 0 auto
      -webkit-mask-size contain
      -webkit-mask-position center center
      -webkit-mask-repeat no-repeat
    .off
      background-color $neutral
      opacity 0.5
    .on
      background-color $amber-7
    .name
      margin-top 10px
      color $neutral
      font-size 0.8em
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
  </style>
