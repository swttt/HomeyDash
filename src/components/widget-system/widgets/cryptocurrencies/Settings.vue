<template>
    <div class="col-12">
      <q-list no-border>
        <q-item tag="label">
        <q-item-main>
          <q-input dark v-model="widget.settings.refresh" type="number" stack-label="Refresh rate in seconds" />
        </q-item-main>
      </q-item>
        <!--<q-btn-toggle dark v-model="widget.settings.currency" toggle-color="primary" :options="[{label: 'USD', value: 'USD'}, {label: 'EUR', value: 'EUR'}]" />-->
        <q-item tag="label">
        <q-item-main>
          <q-field dark label="Select mode">
              <q-radio left-label v-model="widget.settings.mode" val="single" label="Single mode" color="teal" />
              <q-radio left-label v-model="widget.settings.mode" val="multiple" label="Multiple mode" color="teal" />
          </q-field>
        </q-item-main>
      </q-item>
      <q-item tag="label">
        <q-item-main>
          <q-field dark label="Select currency">
              <q-radio left-label v-model="widget.settings.currency" val="USD" label="USD" color="teal" />
              <q-radio left-label v-model="widget.settings.currency" val="EUR" label="EUR" color="teal" />
          </q-field>
        </q-item-main>
      </q-item>
      <q-item tag="label">
        <q-item-main>
          <q-select dark multiple v-model="widget.settings.crypto" :options="selectCrypto" stack-label="Select which crypto currencies to show, in single mode select only one currency" />
        </q-item-main>
      </q-item>
            <q-list-header>Details to show</q-list-header>
            <q-item tag="label">
                <q-item-main>
                    <q-item-tile label>Show Logo</q-item-tile>
                </q-item-main>
                <q-item-side right>
                    <q-toggle dark v-model="widget.settings.showLogo" color="teal" />
                </q-item-side>
            </q-item>
            <q-item tag="label">
                <q-item-main>
                    <q-item-tile label>Show Symbol</q-item-tile>
                </q-item-main>
                <q-item-side right>
                    <q-toggle dark v-model="widget.settings.showSymbol" color="teal" />
                </q-item-side>
            </q-item>
            <q-item tag="label">
                <q-item-main>
                    <q-item-tile label>Show change percentage hour</q-item-tile>
                </q-item-main>
                <q-item-side right>
                        <q-toggle dark v-model="widget.settings.showHour" color="teal" />
                </q-item-side>
            </q-item>
            <q-item tag="label">
                <q-item-main>
                    <q-item-tile label>Show change percentage day</q-item-tile>
                </q-item-main>
                <q-item-side right>
                        <q-toggle dark v-model="widget.settings.showDay" color="teal" />
                </q-item-side>
            </q-item>
            <q-item tag="label">
                <q-item-main>
                    <q-item-tile label>Show change percentage week</q-item-tile>
                </q-item-main>
                <q-item-side right>
                        <q-toggle dark v-model="widget.settings.showWeek" color="teal" />
                </q-item-side>
            </q-item>
        </q-list>
        <q-input dark v-model="widget.width" type="number" stack-label="Widget Width" />
    </div>
</template>

<script>
export default {
  props: ['widget'],
  data: function () {
    return {
      selectCrypto: this.getCoinSelect()
    }
  },
  methods: {
    getCoinSelect: function () {
      let list = []
      this.axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=30')
        .then((resp) => {
          resp.data.forEach(function (element) {
            list.push({
              label: element.name,
              value: element.symbol
            })
          })
        })
        .catch((err) => {
          console.error(err)
        })
      return list
    }
  }
}
</script>

<style lang="stylus">
    .q-list .q-list-header, .q-list label
        padding-left: 0 !important
</style>
