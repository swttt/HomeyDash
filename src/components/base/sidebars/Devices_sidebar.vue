<template>
<div>
  <q-side-link item exact v-for="zone in zones" v-bind:key="zone.id" :to="{ name: 'Devices', params: { zone: zone.id } }">
    <q-item-side>
      <img icon :src="'data:image/png;base64,'+zone.icon" style="height:24px;padding:2px;display:inline-block;" />
    </q-item-side>
    <q-item-main :label="zone.name" />
  </q-side-link>
</div>
</template>

<script>
export default {
  data() {
    return {
      zones: {}
    }
  },
  async mounted() {
    this.zones = await this.$homey.zones.getZones({
      icons: 'png'
    });
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
@import '~variables'

a
  color $primary
  :hover
    background-color $tertiary

</style>
