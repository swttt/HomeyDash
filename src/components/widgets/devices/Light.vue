<template>
<v-touch v-on:press="test(device)" v-on:tap="setOnoff" class="device">
  <div class="icon" v-bind:class="[device.state.onoff ? 'on' : 'off']" :style="'-webkit-mask-image: url('+$homey._baseUrl+device.icon+')'"></div>
  <div class="name">{{device.name}}</div>

  <q-modal class="device-modal" v-model="showModal" minimized v-on:tap="showModal = false" :no-backdrop-dismiss="false">
    <q-slider v-if="device.capabilities.dim" v-model="device.state.dim" :min="0" :max="1" :step="0.1" @change="setDim" />
  </q-modal>
</v-touch>
</template>

<script>
import _ from 'lodash';

export default {
  props: ['device'],
  data() {
    return {
      // initializing for second tab to be selected by default
      showModal: false
    }
  },
  methods: {
    test(device){
      if (navigator.vibrate) {
      	navigator.vibrate(150);
      }
      this.showModal = true;
    },
    setOnoff(){
        this.device.setCapabilityValue('onoff', !this.device.state.onoff)
    },
    setDim: _.debounce((value)=>{
      console.log(value)
      this.device.setCapabilityValue('dim', value)
    }, 200)
  }
}


  </script>

  <style lang="stylus">
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

  .modal.device-modal
    overflow visible
    background rgba(0,0,0,0.8)!important
    .modal-content
      height 120px
      padding-top 40px
      background rgba(0,0,0,0)
      box-shadow 0 0 0 0
      h4
        color $neutral
      .q-slider
        margin 0 auto
        width 250px
      .q-slider-track
        height 75px
        border-radius 5px
        background rgba(255,255,255,1)
      .q-slider-handle
        /*display none*/
        height 75px
        width 5px
        box-shadow 0 0 0 0
        background $primary
        border-radius 0!important


  </style>
