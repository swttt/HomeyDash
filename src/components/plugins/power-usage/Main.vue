<template>
<div>

  <q-transition appear enter="fadeIn" leave="fadeOut">
  <div class="row justify-center items-center content-center power-row">
    <div v-show="!settings.plugins['powerUsage'].defaultDevice.length" class="col col-4 col-xs-11 col-md-4 settings-box">
      <p>No default power measure device found, please go to your settings and select one.</p>
      <q-btn color="teal" style="margin: 0 auto;" v-on:click="openSettings()" icon="settings">
        Settings
      </q-btn>
    </div>
  </div>
  </q-transition>

  <q-transition appear enter="fadeIn" leave="fadeOut">
  <div class="row justify-center" v-if="settings.plugins['powerUsage'].defaultDevice.length">

    <div class="col-4 col-xs-11 col-md-4 info-box">
      <div class="inner relative-position">
        <q-spinner v-show="dayLoading" style="margin-top:25px;" color="teal-4" size="50px" />
        <h4 v-show="!dayLoading" class="text-teal">Today</h4>
        <p v-show="!dayLoading"><span v-if="currentValue && todayStart">{{(currentValue-todayStart) | round}} KWH </span> <span v-else> NO DATA </span> <br/> <small v-if="yesterdayEnd && yesterdayStart">Yesterday: {{(yesterdayEnd-yesterdayStart) | round}} KWH</small>
          <small v-else>Yesterday: No data</small>
        </p>
      </div>
    </div>

    <div class="col-4 col-xs-11 col-md-4 info-box">
      <div class="inner relative-position">
        <q-spinner v-show="weekLoading" style="margin-top:25px;" color="teal-4" size="50px" />
        <h4 v-show="!weekLoading" class="text-teal">Week</h4>
        <p v-show="!weekLoading"><span v-if="currentValue && weekStart">{{(currentValue-weekStart) | round}} KWH</span><span v-else>NO DATA</span> <br/> <small v-if="lastWeekEnd && lastWeekStart">Last week: {{( lastWeekEnd - lastWeekStart) | round}} KWH</small> <small v-else>Last week: No data</small>          </p>
      </div>
    </div>

    <div class="col-4 col-xs-11 col-md-4 info-box">
      <div class="inner relative-position">
        <q-spinner v-show="monthLoading" style="margin-top:25px;" color="teal-4" size="50px" />
        <h4 v-show="!monthLoading" class="text-teal">Month</h4>
        <p v-show="!monthLoading"><span v-if="currentValue && monthStart">{{(currentValue-monthStart) | round}} KWH</span> <span v-else>NO DATA</span> <br/> <small v-if="lastMonthEnd && lastMonthStart">Last month: {{( lastMonthEnd - lastMonthStart) | round}} KWH</small>
          <small v-else>Last month: No data</small>
        </p>
      </div>
    </div>

  </div>
  </q-transition>
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
  mounted() {

    if(this.settings.plugins['powerUsage'].defaultDevice.length) {
      this.loadDay();
      this.loadWeek();
      this.loadMonth()
    }

  },
  methods: {
    openSettings() {
      EventBus.$emit('openSettings')
    },
    async loadDay() {
      await Promise.all([
        this.getCurrentValue(),
        this.getTodayData(),
        this.getYesterdayData()
      ]);
      this.dayLoading = false;
    },
    async loadWeek() {
      await Promise.all([
        this.getThisWeekData(),
        this.getLastWeekData()
      ]);
      this.weekLoading = false;
    },
    async loadMonth() {
      await Promise.all([
        this.getThisMonthData(),
        this.getLastMonthData()
      ]);
      this.monthLoading = false;
    },
    async getCurrentValue() {
      await this.$homey.devices.subscribe();
      let device = await this.$homey.devices.getDevice({
        id: this.$store.state.settings.plugins['powerUsage'].defaultDevice
      });
      this.currentValue = await device.state.meter_power;
      console.log('Current value: ' + this.currentValue);
      device.on('$state', state => {
        this.currentValue = state.meter_power;
      });
    },
    async getTodayData() {

      let result = await this.$homey.insights.getEntries({
        uri: 'homey:device:' + this.$store.state.settings.plugins['powerUsage'].defaultDevice,
        name: 'meter_power',
        start: moment().startOf('day').utc().format(),
        end: moment().startOf('day').add(10, 'minutes').utc().format()
      });
      if(result) {
        this.todayStart = await result.split("\n")[0].split(',')[1];
        console.log('Today start: ' + this.todayStart);
      }
    },
    async getYesterdayData() {

      let start = await this.$homey.insights.getEntries({
        uri: 'homey:device:' + this.$store.state.settings.plugins['powerUsage'].defaultDevice,
        name: 'meter_power',
        start: moment().startOf('day').subtract(1, 'days').utc().format(),
        end: moment().startOf('day').subtract(1, 'days').add(10, 'minutes').utc().format()
      });
      let end = await this.$homey.insights.getEntries({
        uri: 'homey:device:' + this.$store.state.settings.plugins['powerUsage'].defaultDevice,
        name: 'meter_power',
        start: moment().endOf('day').subtract(1, 'days').subtract(10, 'minutes').utc().format(),
        end: moment().endOf('day').subtract(1, 'days').utc().format()
      });
      if(start) {
        this.yesterdayStart = await start.split("\n")[0].split(',')[1];
        console.log('Yesterday start: ' + this.yesterdayStart);
      }
      if(end) {
        let endLines = await end.split("\n");
        this.yesterdayEnd = await endLines[endLines.length - 2].split(',')[1];
        console.log('Yesterday end: ' + this.yesterdayEnd);
      }
    },
    async getThisWeekData() {

      let result = await this.$homey.insights.getEntries({
        uri: 'homey:device:' + this.$store.state.settings.plugins['powerUsage'].defaultDevice,
        name: 'meter_power',
        start: moment().startOf('isoWeek').utc().format(),
        end: moment().startOf('isoWeek').add(10, 'minutes').utc().format()
      });
      if(result) {
        this.weekStart = await result.split("\n")[0].split(',')[1];
        console.log('Week start: ' + this.weekStart);
      }
    },
    async getLastWeekData() {

      let start = await this.$homey.insights.getEntries({
        uri: 'homey:device:' + this.$store.state.settings.plugins['powerUsage'].defaultDevice,
        name: 'meter_power',
        start: moment().startOf('isoWeek').subtract(1, 'weeks').utc().format(),
        end: moment().startOf('isoWeek').subtract(1, 'weeks').add(10, 'minutes').utc().format()
      });
      let end = await this.$homey.insights.getEntries({
        uri: 'homey:device:' + this.$store.state.settings.plugins['powerUsage'].defaultDevice,
        name: 'meter_power',
        start: moment().endOf('isoWeek').subtract(1, 'weeks').subtract(10, 'minutes').utc().format(),
        end: moment().endOf('isoWeek').subtract(1, 'weeks').utc().format()
      });
      if(start) {
        this.lastWeekStart = await start.split("\n")[0].split(',')[1];
        console.log('Last week start: ' + this.lastWeekStart);
      }
      if(end) {
        let endLines = await end.split("\n");
        this.lastWeekEnd = await endLines[endLines.length - 2].split(',')[1];
        console.log('Last week end: ' + this.lastWeekEnd);
      }
    },
    async getThisMonthData() {

      let result = await this.$homey.insights.getEntries({
        uri: 'homey:device:' + this.$store.state.settings.plugins['powerUsage'].defaultDevice,
        name: 'meter_power',
        start: moment().startOf('month').utc().format(),
        end: moment().startOf('month').add(10, 'minutes').utc().format()
      });
      if(result) {
        this.monthStart = await result.split("\n")[0].split(',')[1];
        console.log('Month start: ' + this.monthStart);
      }
    },
    async getLastMonthData() {

      let start = await this.$homey.insights.getEntries({
        uri: 'homey:device:' + this.$store.state.settings.plugins['powerUsage'].defaultDevice,
        name: 'meter_power',
        start: moment().startOf('month').subtract(1, 'months').utc().format(),
        end: moment().startOf('month').subtract(1, 'months').add(10, 'minutes').utc().format()
      });
      let end = await this.$homey.insights.getEntries({
        uri: 'homey:device:' + this.$store.state.settings.plugins['powerUsage'].defaultDevice,
        name: 'meter_power',
        start: moment().endOf('month').subtract(1, 'months').subtract(10, 'minutes').utc().format(),
        end: moment().endOf('month').subtract(1, 'months').utc().format()
      });
      if(start) {
        this.lastMonthStart = await start.split("\n")[0].split(',')[1];
        console.log('Last month start: ' + this.lastMonthStart);
      }
      if(end) {
        let endLines = end.split("\n");
        this.lastMonthEnd = await endLines[endLines.length - 2].split(',')[1];
        console.log('Last month end: ' + this.lastMonthEnd);
      }
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
