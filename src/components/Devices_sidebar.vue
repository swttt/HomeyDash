<template>
<q-list style="border: 0;" highlight>
  <q-side-link tag="a" exact v-for="zone in zones" v-bind:key="zone.id" :to="'/devices/'+zone.id">
    <q-item>

      <q-item-side left>
        <img :src="'data:image/png;base64,'+zone.icon" style="height:24px;padding:2px;" />
      </q-item-side>
      <q-item-main>
        <q-item-tile label>{{zone.name}}</q-item-tile>
      </q-item-main>
    </q-item>
  </q-side-link>
</q-list>
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
