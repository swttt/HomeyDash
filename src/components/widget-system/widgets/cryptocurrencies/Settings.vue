<template>
  <div class="col-12">
    <q-list no-border>
      <q-list-header>General settings</q-list-header>
      <q-item tag="label">
        <q-item-main>
          <q-input dark color="teal" v-model="widget.settings.refresh" type="number" float-label="Refresh rate in seconds" />
        </q-item-main>
      </q-item>
      <q-item class="label">
        <q-item-main label="Select mode" />
        <q-item-side right>
          <q-btn-toggle
            v-model="widget.settings.mode"
            toggle-color="teal"
            @input="emptySetting"
            :options="[
              {label: 'Single mode', value: 'single'},
              {label: 'Multiple mode', value: 'multiple'}
            ]"
          />
        </q-item-side>
      </q-item>
      <q-item class="label">
        <q-item-main label="Select currency" />
        <q-item-side right>
          <q-btn-toggle
            v-model="widget.settings.currency"
            toggle-color="teal"
            :options="[
              {label: 'EUR', value: 'EUR'},
              {label: 'USD', value: 'USD'}
            ]"
          />
        </q-item-side>
      </q-item>
      <q-item tag="label">
        <q-item-main>
          <q-select v-if="widget.settings.mode === 'multiple'" toggle dark color="teal" multiple v-model="widget.settings.crypto" :options="selectCrypto" float-label="Select which crypto currencies to show" />
          <q-select v-if="widget.settings.mode === 'single'" dark color="teal" v-model="widget.settings.crypto" :options="selectCrypto" float-label="Select which crypto currency to show" />
        </q-item-main>
      </q-item>
      <q-list-header>Details to show</q-list-header>
        <q-item tag="label">
          <q-item-main label="Show logo"/>
          <q-item-side right>
            <q-toggle dark v-model="widget.settings.showLogo" color="teal" />
          </q-item-side>
        </q-item>
        <q-item tag="label">
          <q-item-main label="Show Symbol"/>
          <q-item-side right>
            <q-toggle dark v-model="widget.settings.showSymbol" color="teal" />
          </q-item-side>
        </q-item>
        <q-item tag="label">
          <q-item-main label="Show change percentage hour" />
          <q-item-side right>
            <q-toggle dark v-model="widget.settings.showHour" color="teal" />
          </q-item-side>
        </q-item>
        <q-item tag="label">
          <q-item-main label="Show change percentage day"/>
          <q-item-side right>
            <q-toggle dark v-model="widget.settings.showDay" color="teal" />
          </q-item-side>
        </q-item>
        <q-item tag="label">
          <q-item-main label="Show change percentage week" />
          <q-item-side right>
            <q-toggle dark v-model="widget.settings.showWeek" color="teal" />
          </q-item-side>
        </q-item>
        <q-item tag="label">
          <q-item-main>
            <q-input dark color="teal" v-model="widget.width" type="number" float-label="Widget Width" />
          </q-item-main>
        </q-item>
      </q-list>
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
    },
    emptySetting () {
      this.widget.settings.crypto = []
    }
  }
}
</script>

<style lang="stylus">
  .q-list .q-list-header, .q-list label
    padding-left: 0 !important
</style>
