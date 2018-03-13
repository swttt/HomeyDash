<template>
<v-touch v-on:press="longPress" v-on:tap="setLock" class="device">

  <div class="icon" v-bind:class="[device.state.locked ? 'on' : 'off']" :style="'-webkit-mask-image: url('+$homey._baseUrl+device.icon+')'"></div>
  <div class="name">{{device.name}}</div>
  <div class="info">{{device.state.locked ? 'LOCKED' : 'UNLOCKED'}}</div>
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

      <q-item v-if="device.capabilities.locked">
        <q-item-side class="text-white">
          Lock state
        </q-item-side>
        <q-item-main class="text-right">
          <q-toggle unchecked-icon="fa-unlock"
  checked-icon="fa-lock" color="teal" v-model="device.state.locked" @blur="setLock" @focus="setLock" />
        </q-item-main>
      </q-item>

      <q-item v-if="device.capabilities.lock_mode">
        <q-item-side class="text-white">
          Lock mode
        </q-item-side>
        <q-item-main class="text-right text-white">
          {{device.state.lock_mode.en}}
        </q-item-main>
      </q-item>

    </q-list>
    <center><q-btn style="margin-top:50px;" v-on:click="modalState(false)" icon="close" outline color="white">close</q-btn></center>
  </q-modal>
</v-touch>
</template>

<script>

export default {
  props: ['device'],
  data () {
    return {
      showModal: false
    }
  },
  methods: {
    longPress (ev) {
      if (navigator.vibrate) {
        navigator.vibrate(150)
      }
      this.showModal = true
    },
    setLock () {
      this.device.setCapabilityValue('locked', !this.device.state.locked)
    },
    modalState (state) {
      this.showModal = state
    }
  },
  mounted () {

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
      -webkit-mask-position top center
      -webkit-mask-repeat no-repeat
    .info
      position absolute
      left 7px
      bottom 7px
      font-size 0.8em
      color $secondary
      font-weight 300
      max-width 100%
      overflow hidden
      text-align left
      text-overflow ellipsis
      white-space nowrap
    .battery
      position absolute
      top 3px
      right 7px
    .off
      background-color $red
      opacity 0.7
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
