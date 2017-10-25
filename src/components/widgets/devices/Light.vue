<template>
<div v-touch-hold="longPress" v-on:click="setOnoff" class="device">

  <div class="icon" v-bind:class="[device.state.onoff ? 'on' : 'off']" :style="'-webkit-mask-image: url('+$homey._baseUrl+device.icon+')'"></div>
  <div class="name">{{device.name}}</div>
  <div class="info">{{mapOnoff}} <span v-if="device.state.dim"> - {{Number((device.state.dim*100).toFixed(0))}}%</span></div>


  <q-modal class="device-modal" :content-css="{background: 'rgba(0, 0, 0, 0.6)', border: '0 0 0 0'}" v-model="showModal" minimized>
    <q-list no-border>
      <q-list-header>{{device.name}}</q-list-header>
      <q-item>
        <q-item-side class="text-white">
          Dim
        </q-item-side>
        <q-item-main class="text-right">
          <q-slider color="white" v-if="device.capabilities.dim" v-model="dimValue" :min="0" :max="1" :step="0.1" @change="setDim" />
        </q-item-main>
      </q-item>
      <q-item>
        <q-item-side class="text-white">
          On/Off
        </q-item-side>
        <q-item-main class="text-right">
          <q-toggle v-model="device.state.onoff" />
        </q-item-main>
      </q-item>
    </q-list>

  </q-modal>
</div>
</template>

<script>
import _ from 'lodash';

export default {
  props: ['device'],
  data() {
    return {
      showModal: false,
      dimValue: this.device.state.dim
    }
  },
  methods: {
    longPress(ev){
      console.log(ev)
      if(ev.duration < 300){
        this.device.setCapabilityValue('onoff', !this.device.state.onoff)
      }
      else{
        if (navigator.vibrate) {
          navigator.vibrate(150);
        }
        this.showModal = true;
      }

    },
    setOnoff(){
      console.log('click')
        this.device.setCapabilityValue('onoff', !this.device.state.onoff)
    },
    setDim: _.debounce(function(value){
      console.log(value)
      this.device.setCapabilityValue('dim', value)
    }, 100)
  },
  computed:{
    mapOnoff(){
      if(this.device.state.onoff){
        return 'ON'
      }
      else{
        return 'OFF'
      }
    }
  }
}


  </script>

  <style lang="stylus" scoped>
  @import '~variables'


  .device
    height 90px
    margin 5px
    text-align left
    background-color rgba(0, 0, 0, 0.3)
    border-radius 10px
    position relative
    .icon
      height 38px
      width 38px
      position relative
      top 7px
      left 7px
      -webkit-mask-size contain
      -webkit-mask-position top left
      -webkit-mask-repeat no-repeat
    .info
      position absolute
      left 7px
      bottom 7px
      font-size 0.8em
      color $secondary
      font-weight 300
    .off
      background-color $neutral
      opacity 0.2
    .on
      background-color $cyan-8
    .name
      position absolute
      bottom 24px
      left 7px
      right 7px
      color $neutral
      font-size 0.8em
      max-width 100%
      overflow hidden
      text-align left
      text-overflow ellipsis
      white-space nowrap




  </style>
