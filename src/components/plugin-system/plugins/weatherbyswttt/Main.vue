<template>
<div>
  <q-transition appear enter="fadeIn" leave="fadeOut">
    <div class="row">
      <div class="col-6 weather">
        <div class="inner-content">
          <h4>Today</h4>
          <p>{{today}}</p>
        </div>
      </div>
      <div class="col-6 weather">
        <div class="inner-content">
          <h4>Forecast</h4>
          <p>{{expected}}</p>
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

export default {
  components: {},
  data() {
    return {
      today: "",
      expected: ""
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      let result = await this.axios.get('https://api.buienradar.nl/data/public/1.1/jsonfeed');
      this.today = result.data.buienradarnl.weergegevens.verwachting_vandaag.samenvatting;
      this.expected = result.data.buienradarnl.weergegevens.verwachting_meerdaags.tekst_lang['#text'];
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

.weather
  padding 10px
  .inner-content
    background-color rgba(0, 0, 0, 0.5)
    border-radius 10px
    padding 20px
    color white
    h4
      color rgb(190, 187, 187)
      font-weight 200
      font-size 30px
      text-transform uppercase


</style>
