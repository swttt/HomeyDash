<template>
<v-touch v-on:press="longPress" v-on:tap="setOnoff" class="device">
  <div class="icon" v-bind:class="[device.state.onoff ? 'on' : 'off']" :style="'-webkit-mask-image: url('+$homey._baseUrl+device.icon+')'"></div>
  <div class="name">{{device.name}}</div>
  <div class="info">{{mapOnoff}} <span v-if="device.state.dim"> - {{device.state.dim*100}}%</span></div>

  <q-modal no-backdrop-dismiss style="background-color: rgba(0, 0, 0, 0.85)" class="device-modal" :content-css="{background: 'rgba(0, 0, 0, 0)', boxShadow: '0 0 0 0', border: '0 0 0 0'}" v-model="showModal" minimized>
    <q-list no-border>
      <q-list-header class="text-teal">{{device.name}}</q-list-header>
      <q-item v-if="device.capabilities.dim">
        <q-item-side class="text-white">
          Dim
        </q-item-side>
        <q-item-main class="text-right">
          <q-slider color="teal" v-if="device.capabilities.dim" v-model="device.capabilities.dim" :min="0" :max="1" :step="0.01"  />
        </q-item-main>
      </q-item>
      <q-item v-if="device.capabilities.onoff">
        <q-item-side class="text-white">
          On/Off
        </q-item-side>
        <q-item-main class="text-right">
          <q-toggle color="teal" v-model="device.state.onoff" @blur="setOnoff" @focus="setOnoff" />
        </q-item-main>
      </q-item>
    </q-list>
    <center><q-btn style="margin-top:50px;" v-on:click="modalState(false)" icon="close" outline color="white">close</q-btn></center>
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
    longPress(ev){
        if (navigator.vibrate) {
          navigator.vibrate(150);
        }
        this.showModal = true;
    },
    setOnoff(){
        this.device.setCapabilityValue('onoff', !this.device.state.onoff)
    },
    setDim: _.debounce(function(value){
      console.log(value)
      this.device.setCapabilityValue('dim', value)
    }, 100),
    modalState(state){
      this.showModal = state
    }
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
  },
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
      -webkit-mask-position center left
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
      background-color $teal
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

  .modal.device-modal
    background rgba(0,0,0,0.8)!important
    .modal-content
      overflow visible
      min-height 120px
      padding-top 40px
      background rgba(0,0,0,0)
      box-shadow 0 0 0 0
      text-align center
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
