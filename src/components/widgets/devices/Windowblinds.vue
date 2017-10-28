<template>
<v-touch v-on:press="longPress" v-on:tap="setBlind" class="device">

  <div class="icon on" :style="'-webkit-mask-image: url('+$homey._baseUrl+device.icon+')'"></div>
  <div class="name">{{device.name}}</div>
  <div class="info">{{blindState}} <span v-if="device.state.dim"> - {{Number((device.state.dim*100).toFixed(0))}}%</span></div>
<div class="battery" v-if="device.capabilities.measure_battery && device.state.measure_battery !== null">
    <q-icon color="teal" v-if="device.state.measure_battery > 80" name="fa-battery-4" />
    <q-icon color="teal" v-else-if="device.state.measure_battery < 81 && device.state.measure_battery > 50" name="fa-battery-3" />
    <q-icon color="teal" v-else-if="device.state.measure_battery < 51 && device.state.measure_battery > 25" name="fa-battery-2" />
    <q-icon color="orange" v-else-if="device.state.measure_battery < 56 && device.state.measure_battery > 10" name="fa-battery-1" />
    <q-icon color="red" v-else-if="device.state.measure_battery < 10" name="fa-battery-0" />
</div>

  <q-modal no-backdrop-dismiss style="background-color: rgba(0, 0, 0, 0.85)" class="device-modal" :content-css="{background: 'rgba(0, 0, 0, 0)', boxShadow: '0 0 0 0', border: '0 0 0 0'}" v-model="showModal" minimized>
    <q-list no-border>
      <q-list-header class="text-teal">{{device.name}}</q-list-header>
      <q-item v-if="device.capabilities.dim">
        <q-item-side class="text-white">
          {{device.capabilities.dim.title.en}}
        </q-item-side>
        <q-item-main class="text-right">
          <q-slider color="teal" v-if="device.capabilities.dim" v-model="device.state.dim" :min="0" :max="1" :step="0.01" @change="setDim" />
        </q-item-main>
      </q-item>

      <q-item v-if="device.capabilities.onoff">
        <q-item-side class="text-white">
          {{device.capabilities.onoff.title.en}}
        </q-item-side>
        <q-item-main class="text-right">
          <q-toggle icon="fa-power-off" color="teal" v-model="device.state.onoff" @blur="setOnoff" @focus="setOnoff" />
        </q-item-main>
      </q-item>

      <q-item v-for="(value, key) in device.capabilities" :key="key" v-if="value.getable  && value.units">
        <q-item-side class="text-white">
          {{value.title.en}}
        </q-item-side>
        <q-item-main class="text-right text-white">
          <span>{{device.state[key] || '-' }} <span v-if="value.units">{{value.units.en}}</span></span>
          <!-- <span v-else>-</span> -->
        </q-item-main>
      </q-item>

    </q-list>
    <center>
      <q-btn style="margin-top:50px;" v-on:click="modalState(false)" icon="close" outline color="white">close</q-btn>
    </center>
  </q-modal>
</v-touch>
</template>

<script>
import _ from 'lodash';

export default {
  props: ['device'],
  data() {
    return {
      showModal: false,
    }
  },
  methods: {
    longPress(ev){
        if (navigator.vibrate) {
          navigator.vibrate(150);
        }
        this.showModal = true;
    },
    setBlind(){
        if(this.device.state.dim > 0){
          this.device.setCapabilityValue('dim', 0)
        }
        else{
          this.device.setCapabilityValue('dim', 1)
        }
    },
    setDim: _.debounce(function(value){
      console.log(value)
      this.device.setCapabilityValue('dim', value)
    }, 100),
    modalState(state){
      this.showModal = state
    }
  },
  mounted(){

  },
  computed:{
    blindState(){
      if(this.device.state.dim > 0){
        return 'OPEN'
      }
      else{
        return 'CLOSED'
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
    background-color rgba(0, 0, 0, 0.5)
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
    .battery
      position absolute
      top 3px
      right 7px
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




  </style>
