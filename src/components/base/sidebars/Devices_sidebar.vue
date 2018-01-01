<template>
<div>
  <div v-for="zone in sortByIndex(nestedZones)">
    <q-side-link item exact v-bind:key="zone.id" :to="{ name: 'Devices', params: { zone: zone.id } }">
      <q-item-side>
        <img icon :src="'data:image/png;base64,'+zone.icon" style="height:24px;padding:2px;display:inline-block;" />
      </q-item-side>
      <q-item-main :label="zone.name" />
    </q-side-link>
    <div v-for="child in sortByIndex(zone.children)" >
      <q-side-link item exact v-bind:key="child.id" :to="{ name: 'Devices', params: { zone: child.id } }">
        <q-item-side style="padding-left:35px;">
          <img icon :src="'data:image/png;base64,'+child.icon" style="height:24px;padding:2px;display:inline-block;" />
        </q-item-side>
        <q-item-main :label="child.name" />
      </q-side-link>
      <div v-for="child in sortByIndex(child.children)" >
        <q-side-link  item exact v-bind:key="child.id" :to="{ name: 'Devices', params: { zone: child.id } }">
          <q-item-side style="padding-left:70px;">
            <img icon :src="'data:image/png;base64,'+child.icon" style="height:24px;padding:2px;display:inline-block;" />
          </q-item-side>
          <q-item-main :label="child.name" />
        </q-side-link>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import _ from 'lodash';

export default {
  data() {
    return {
      zones: {},
      nestedZones: {}
    }
  },
  async created() {
    this.zones = await this.$homey.zones.getZones({
      icons: 'png'
    });
    this.nestedZones = this.buildTree(this.zones, 'id', 'parent', 'children');
  },
  methods: {
    buildTree(flatList, idFieldName, parentKeyFieldName, fieldNameForChildren) {
      var rootElements = [];
      var lookup = {};

      _.forEach(flatList, function (flatItem) {
        var itemId = flatItem[idFieldName];
        lookup[itemId] = flatItem;
        flatItem[fieldNameForChildren] = [];
      });

      _.forEach(flatList, function (flatItem) {
        var parentKey = flatItem[parentKeyFieldName];
        if(parentKey != null) {
          var parentObject = lookup[flatItem[parentKeyFieldName]];
          if(parentObject) {
            parentObject[fieldNameForChildren].push(flatItem);
          } else {
            rootElements.push(flatItem);
          }
        } else {
          rootElements.push(flatItem);
        }

      });
      let sortedView = _.sortBy(rootElements, [function(o) { return o.index; }]);
      return sortedView;
    },
    sortByIndex(list){
      return _.orderBy(list, 'index', 'asc');
    }
  },
  computed() {

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
