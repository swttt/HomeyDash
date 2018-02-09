<template>
<div class="row justify-center items-center content-center power-row">
  <div v-show="!settings.powerUsageDevice" class="col col-4 col-xs-11 col-md-4 settings-box">
    <p>No default power measure device found, please go to your settings and select one.</p>
    <q-btn color="teal" style="margin: 0 auto;" v-on:click="openSettings()" icon="settings">
      Settings
    </q-btn>
  </div>
  <div v-if="settings.powerUsageDevice && this.device.id" class="col col-4 col-xs-11 col-md-4 settings-box">
    You selected the device {{device.name}} <br/>
    Todays total power used is {{dayUsage}} kwh. <br/>
    This weeks total power used it {{weekUsage}} kwh.
  </div>
</div>
</template>


<script>
import * as moment from 'moment';
import {
  EventBus
} from 'src/eventBus';
export default {
  components: {},
  data() {
    return {
      device: {},
      insightData: {},
      dayData: [],
      weekData: []
    }
  },
  async mounted() {
    console.log();
    if(this.$store.state.settings.powerUsageDevice) {
      this.device = await this.$homey.devices.getDevice({
        id: this.$store.state.settings.powerUsageDevice
      });


      let insightDataDay = await this.$homey.insights.getEntries({
        uri: 'homey:device:' + this.device.id,
        name: 'meter_power',
        start: moment().startOf('day').utc().format(),
        end: moment().utc().format()
      });
      this.dayData = this.csvJSON(insightDataDay);

      let insightDataWeek = await this.$homey.insights.getEntries({
        uri: 'homey:device:' + this.device.id,
        name: 'meter_power',
        start: moment().startOf('week').utc().format(),
        end: moment().utc().format()
      });
      this.weekData = this.csvJSON(insightDataWeek);
  }
},
methods: {
    openSettings() {
      EventBus.$emit('openSettings')
    },
    csvJSON(csv) {
      var lines = csv.split("\n");
      var result = [];
      var headers = ['date', 'value'];
      for(var i = 0; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split(",");
        for(var j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j];
        }
        if(currentline[0]) {
          result.push(obj);
        }
      }
      return result;
    }
  },

  computed: {
    settings: {
      get() {
        return this.$store.state.settings
      }
    },
    dayUsage: {
      get() {
        let result = '0';
        let length = this.dayData.length - 1
        if(this.dayData.length > 0){
          result = this.dayData[length].value -  this.dayData[0].value
        }

        return result;
      }
    },
    weekUsage: {
      get() {
        let result = '0';
        let length = this.weekData.length - 1
        if(this.weekData.length > 0){
          result = this.weekData[length].value -  this.weekData[0].value
        }

        return result;
      }
    },
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'

.power-row
  position absolute
  overflow hidden
  top 0
  bottom 0
  right 0
  left 0

.settings-box
  background-color rgba(0, 0, 0, 0.5)
  border-radius 10px
  padding 20px
  color white
  text-align center
  h4
    width 100%
    /* text-align center */

</style>
