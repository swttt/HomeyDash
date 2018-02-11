<template>
<div>
  <div class="row justify-center items-center content-center power-row">
    <div v-show="!settings.powerUsageDevice" class="col col-4 col-xs-11 col-md-4 settings-box">
      <p>No default power measure device found, please go to your settings and select one.</p>
      <q-btn color="teal" style="margin: 0 auto;" v-on:click="openSettings()" icon="settings">
        Settings
      </q-btn>
    </div>
  </div>
  <div class="row justify-center" v-if="settings.powerUsageDevice">

    <div class="col-4 col-xs-11 col-md-4 info-box">
      <div class="inner relative-position">
        <q-spinner v-show="dayLoading" style="margin-top:25px;" color="teal-4" size="50px" />
        <h4 v-show="!dayLoading" class="text-teal">Today</h4>
        <p v-show="!dayLoading">{{(currentValue-todayStart) | round}} KWH <br/> <small>Yesterday: {{(yesterdayEnd-yesterdayStart) | round}} KWH</small> </p>
      </div>
    </div>

    <div class="col-4 col-xs-11 col-md-4 info-box">
      <div class="inner relative-position">
        <q-spinner v-show="weekLoading" style="margin-top:25px;" color="teal-4" size="50px" />
        <h4 v-show="!weekLoading" class="text-teal">Week</h4>
        <p v-show="!weekLoading">{{(currentValue-weekStart) | round}} KWH <br/> <small>Last week: {{( lastWeekEnd - lastWeekStart) | round}} KWH</small> </p>
      </div>
    </div>

    <div class="col-4 col-xs-11 col-md-4 info-box">
      <div class="inner relative-position">
        <q-spinner v-show="monthLoading" style="margin-top:25px;" color="teal-4" size="50px" />
        <h4 v-show="!monthLoading" class="text-teal">Month</h4>
        <p v-show="!monthLoading">{{(currentValue-monthStart) | round}} KWH <br/> <small>Last month: {{( lastMonthEnd - lastMonthStart) | round}} KWH</small> </p>
      </div>
    </div>

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
      dayLoading: true,
      weekLoading: true,
      monthLoading: true,
      currentValue: "",
      todayStart: "",
      weekStart: "",
      monthStart: "",
      yesterdayStart: "",
      lastWeekStart: "",
      lastMonthStart: "",
      yesterdayEnd: "",
      lastWeekEnd: "",
      lastMonthEnd: ""
    }
  },
  async mounted() {

    if(settings.powerUsageDevice) {
      await this.getCurrentValue();
      await this.getTodayData();
      await this.getYesterdayData();
      this.dayLoading = await false;

      await this.getThisWeekData();
      await this.getLastWeekData();
      this.weekLoading = await false;

      await this.getThisMonthData();
      await this.getLastMonthData();
      this.monthLoading = false;
    }

  },
  methods: {
    openSettings() {
      EventBus.$emit('openSettings')
    },
    async getCurrentValue() {
      await this.$homey.devices.subscribe();
      let device = await this.$homey.devices.getDevice({
        id: this.$store.state.settings.powerUsageDevice
      });
      this.currentValue = await device.state.meter_power;
      device.on('$state', state => {
        this.currentValue = state.meter_power;
      });
    },
    async getTodayData() {

      let result = await this.$homey.insights.getEntries({
        uri: 'homey:device:' + this.$store.state.settings.powerUsageDevice,
        name: 'meter_power',
        start: moment().startOf('day').utc().format(),
        end: moment().startOf('day').add(10, 'minutes').utc().format()
      });
      this.todayStart = result.split("\n")[0].split(',')[1];

    },
    async getYesterdayData() {

      let start = await this.$homey.insights.getEntries({
        uri: 'homey:device:' + this.$store.state.settings.powerUsageDevice,
        name: 'meter_power',
        start: moment().startOf('day').subtract(1, 'days').utc().format(),
        end: moment().startOf('day').subtract(1, 'days').add(1, 'hours').utc().format()
      });
      let end = await this.$homey.insights.getEntries({
        uri: 'homey:device:' + this.$store.state.settings.powerUsageDevice,
        name: 'meter_power',
        start: moment().endOf('day').subtract(1, 'days').subtract(1, 'hours').utc().format(),
        end: moment().endOf('day').subtract(1, 'days').utc().format()
      });
      this.yesterdayStart = start.split("\n")[0].split(',')[1];
      let endLines = end.split("\n");
      this.yesterdayEnd = endLines[endLines.length - 2].split(',')[1];
    },
    async getThisWeekData() {

      let result = await this.$homey.insights.getEntries({
        uri: 'homey:device:' + this.$store.state.settings.powerUsageDevice,
        name: 'meter_power',
        start: moment().startOf('week').add(1, 'days').utc().format(),
        end: moment().startOf('week').add(1, 'days').add(10, 'minutes').utc().format()
      });
      this.weekStart = result.split("\n")[0].split(',')[1];

    },
    async getLastWeekData() {

      let start = await this.$homey.insights.getEntries({
        uri: 'homey:device:' + this.$store.state.settings.powerUsageDevice,
        name: 'meter_power',
        start: moment().startOf('week').subtract(1, 'weeks').add(1, 'days').utc().format(),
        end: moment().startOf('week').subtract(1, 'weeks').add(1, 'days').add(10, 'minutes').utc().format()
      });
      let end = await this.$homey.insights.getEntries({
        uri: 'homey:device:' + this.$store.state.settings.powerUsageDevice,
        name: 'meter_power',
        start: moment().endOf('week').subtract(1, 'weeks').add(1, 'days').subtract(10, 'minutes').utc().format(),
        end: moment().endOf('week').subtract(1, 'weeks').add(1, 'days').utc().format()
      });
      this.lastWeekStart = start.split("\n")[0].split(',')[1];
      let endLines = end.split("\n");
      this.lastWeekEnd = endLines[endLines.length - 2].split(',')[1];
    },
    async getThisMonthData() {

      let result = await this.$homey.insights.getEntries({
        uri: 'homey:device:' + this.$store.state.settings.powerUsageDevice,
        name: 'meter_power',
        start: moment().startOf('month').utc().format(),
        end: moment().startOf('month').add(10, 'minutes').utc().format()
      });
      this.monthStart = result.split("\n")[0].split(',')[1];
    },
    async getLastMonthData() {

      let start = await this.$homey.insights.getEntries({
        uri: 'homey:device:' + this.$store.state.settings.powerUsageDevice,
        name: 'meter_power',
        start: moment().startOf('month').subtract(1, 'months').utc().format(),
        end: moment().startOf('month').subtract(1, 'months').add(10, 'minutes').utc().format()
      });
      let end = await this.$homey.insights.getEntries({
        uri: 'homey:device:' + this.$store.state.settings.powerUsageDevice,
        name: 'meter_power',
        start: moment().endOf('month').subtract(1, 'months').subtract(10, 'minutes').utc().format(),
        end: moment().endOf('month').subtract(1, 'months').utc().format()
      });
      this.lastMonthStart = start.split("\n")[0].split(',')[1];
      let endLines = end.split("\n");
      this.lastMonthEnd = endLines[endLines.length - 2].split(',')[1];
    }
  },
  computed: {
    settings: {
      get() {
        return this.$store.state.settings
      }
    }
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

.info-box
  padding 10px
  .inner
    background-color rgba(0, 0, 0, 0.5)
    border-radius 10px
    padding 10px
    color white
    text-align center
    height 120px
    overflow hidden
  h4
    width 100%
    padding 0px
    margin 0px
    text-transform uppercase
    font-weight 200
    font-size 32px
  p
    text-transform uppercase
    font-size 22px
    padding 10px 0px 0px 0px
    small
      color rgb(181, 181, 181)
      font-size 14px

</style>
