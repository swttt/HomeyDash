<template>

<q-list no-border>
<q-list-header class="text-teal" v-if="widget.settings.room">{{ device.zone.name }}</small></q-list-header>
  <q-list-header class="text-white">{{device.name}}<i class="fa fa-bolt fa-2x icon" aria-hidden="true" v-if="widget.settings.icon"></i></q-list-header>

  <q-item v-for="(value, key) in device.capabilities" :key="key" v-if="value.getable && !value.setable">
    <q-item-side class="text-white" v-if="device.capabilitiesOptions[key].title">
      {{device.capabilitiesOptions[key].title.en}}
    </q-item-side>
    <q-item-side class="text-white" v-else>
      {{value.title.en}}
    </q-item-side>
    <q-item-main class="text-right text-white">
      <span v-if="typeof(device.state[key]) === 'boolean' && key.substring(0, 5) == 'alarm'"><q-icon v-if="!device.state[key]" color="green" name="fa-check" /><q-icon v-else color="red" name="fa-exclamation-triangle" /></span>
      <span v-else> <span v-if="device.state[key] != null">{{device.state[key]}}</span><span v-else>-</span> <span v-if="value.units">{{value.units.en}}</span></span>
      <!-- <span v-else>-</span> -->
    </q-item-main>
  </q-item>

</q-list>


</template>



<script>
export default {
    props: ['widget'],
    data() {
        return {
            device: {},
            loading: true
        }
    },
    async mounted() {
        await this.getPowermeter();
        this.loading = false;
    },
    methods: {
        async getPowermeter() {
            this.device = await this.$homey.devices.getDevice({ id: this.widget.settings.pusage });
            await this.$homey.devices.subscribe();
            this.device.on('$state', state => {
                console.log(state);
            });
        }
    }
}
</script>

<style lang="stylus" scoped>
    @import '~variables'


      .icon
        height 38px
        width 38px
        font-size 38px
        line-height 30px
        vertial-align text-top
        position relative
        top 7px
        left 7px
        -webkit-mask-size contain
        -webkit-mask-position top left
        -webkit-mask-repeat no-repeat
        .on
          color $red
        .off
          color $teal


      .icon.off
        background-color $teal
        opacity 1
      .icon.on
        background-color $red


</style>
