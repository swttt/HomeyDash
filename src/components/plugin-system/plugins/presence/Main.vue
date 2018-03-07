<template>
<div>



  <q-transition appear enter="fadeIn" leave="fadeOut">
    <div class="row justify-center" v-if="settings.plugins['weatherbyevad'].apiKey.length">
      <div class="col-10  top-box">
        <div class="inner content">
          <div class="today" v-if="today">
            <p>{{today.display_location.full}}</p>
            <p>Current weather</p>
            <p>temp {{today.temp_c}} ºC</p>
            <img :src="today.icon_url" />
            <p>{{today.icon}}</p>
          </div>
        </div>
      </div>



      <div class="col-3 info-box">
        <div class="expected" v-if="expected">
          <div class="inner relative-position">
            <div clas="row">
              <div class="col-4">
                <p> Forecast for</p>
                <p class="text-white">{{expected.txt_forecast.forecastday[2].title}}</p>
              </div>
              <div class="col-3">
                {{expected.txt_forecast.forecastday[2].fcttext_metric}}
              </div>
              <div class="col-3">
                <img :src="expected.txt_forecast.forecastday[2].icon_url" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-3 info-box">
        <div class="expected" v-if="expected">
          <div class="inner relative-position">
            <div clas="row">
              <div class="col-3">
                <p> Forecast for</p>
                <p class="text-white">{{expected.txt_forecast.forecastday[4].title}}</p>
              </div>
              <div class="col-3">
                {{expected.txt_forecast.forecastday[4].fcttext_metric}}
              </div>
              <div class="col-3">
                <img :src="expected.txt_forecast.forecastday[4].icon_url" />
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="col-3 info-box">
        <div class="expected" v-if="expected">
          <div class="inner">
            <div clas="row">
              <div class="col-3">
                <p> Forecast for</p>
                <p class="text-white">{{expected.txt_forecast.forecastday[6].title}}</p>
              </div>
              <div class="col-3">
                {{expected.txt_forecast.forecastday[6].fcttext_metric}}
              </div>
              <div class="col-3">
                <img :src="expected.txt_forecast.forecastday[6].icon_url" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-transition>
</div>
</template>

<script>
import {
  EventBus
} from 'src/eventBus';
import axios from 'axios';

export default {
  components: {},
  data() {
    return {
      today: "",
      expected: "",
      units: "",


      Loading: false
    }
    Loading = true
  },
  async created() {
    this.getData();
    let UPDATE_INTERVAL = this.$store.state.settings.plugins['weatherbyevad'].refresh * 1000 || 6000;
    this.interval = setInterval(() => {
        this.getData();
    }, UPDATE_INTERVAL)
  },
  mounted() {
    if (this.settings.plugins['apiKey']) {
      this.apikey();
    }
    this.getData();
  },
  methods: {
    openSettings() {
      EventBus.$emit('openSettings')
    },
    async getData() {
      let apikey = this.$store.state.settings.plugins['weatherbyevad'].apiKey
      let location = await this.$homey.geolocation.getLocation();
      let result2 = await this.$homey.i18n.getConfig();
      let baseUrl = "http://api.wunderground.com/api/";
      let result = await axios.get(baseUrl + apikey + '/conditions/q/' + location.latitude + ',' + location.longitude + '.json');
      this.today = result.data.current_observation;
      let result1 = await axios.get(baseUrl + apikey + '/forecast/q/' + location.latitude + ',' + location.longitude + '.json');
      this.expected = result1.data.forecast;
      this.units =  result2.units;

console.log("unitss", units);

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
    padding 20px
    color white
    text-align center
    height 300px
    overflow hidden
  h4
    color rgb(190, 187, 187)
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

.top-box
      padding 10px
      .inner
        background-color rgba(0, 0, 0, 0.5)
        border-radius 10px
        padding 20px
        color white
        text-align center
        height 300px
        overflow hidden
      h4
        color rgb(190, 187, 187)
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
