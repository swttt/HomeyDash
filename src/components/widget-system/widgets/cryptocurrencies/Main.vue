<template>
  <div class="cryptocurrencies" v-if="widget.settings.mode === 'single'">
    <ul>
      <li v-cloak v-for="(coin, index) in coins" :key="coin.id" v-if="index < 1">
        <div class="single">
          <div class="data">
            <h5 class="name">{{ coin.name }}<span class="symbol" v-if="widget.settings.showSymbol"> [ {{ coin.symbol }} ]</span></h5>
            <div class="price" v-if="widget.settings.currency === 'USD'">&#36; {{ formatPrice(coin.price_usd) }}</div>
            <div class="price" v-if="widget.settings.currency === 'EUR'">&euro; {{ formatPrice(coin.price_eur) }}</div>
          </div>
          <div class="image">
            <img v-bind:src="getCoinImage(coin.symbol)" v-if="widget.settings.showLogo" />
          </div>
        </div>
        <table class="singletable" v-if="widget.settings.showHour || widget.settings.showDay || widget.settings.showWeek">
          <thead>
            <tr>
              <td v-if="widget.settings.showHour">1H</td>
              <td v-if="widget.settings.showDay">1D</td>
              <td v-if="widget.settings.showWeek">1W</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="1h center" v-bind:style="getColor(coin.percent_change_1h)" v-if="widget.settings.showHour"><span v-if="coin.percent_change_1h > 0">+</span>{{ coin.percent_change_1h }}%</td>
              <td class="24h center" v-bind:style="getColor(coin.percent_change_24h)" v-if="widget.settings.showDay"><span v-if="coin.percent_change_24h > 0">+</span>{{ coin.percent_change_24h }}%</td>
              <td class="1w center" v-bind:style="getColor(coin.percent_change_7d)" v-if="widget.settings.showWeek"><span v-if="coin.percent_change_7d > 0">+</span>{{ coin.percent_change_7d }}%</td>
            </tr>
          </tbody>
        </table>
      </li>
    </ul>
  </div>
  <div class="cryptocurrencies multiple" v-else>
    <table class="multipletable">
      <thead>
        <tr>
          <td>Name</td>
          <td v-if="widget.settings.showSymbol">Symbol</td>
          <td>Price <span v-if="widget.settings.currency === 'USD'">(USD)</span><span v-if="widget.settings.currency === 'EUR'">(EUR)</span></td>
          <td v-if="widget.settings.showHour">1H</td>
          <td v-if="widget.settings.showDay">1D</td>
          <td v-if="widget.settings.showWeek">1W</td>
        </tr>
      </thead>
      <tbody>
        <tr v-cloak v-for="coin in coins" :key="coin">
          <td class="name"><img v-bind:src="getCoinImage(coin.symbol)" v-if="widget.settings.showLogo" /> {{ coin.name }}</td>
          <td class="symbol center" v-if="widget.settings.showSymbol">{{ coin.symbol }}</td>
          <td class="price center" v-if="widget.settings.currency === 'USD'">&#36; {{ formatPrice(coin.price_usd) }}</td>
          <td class="price center" v-if="widget.settings.currency === 'EUR'">&euro; {{ formatPrice(coin.price_eur) }}</td>
          <td class="1h center" v-bind:style="getColor(coin.percent_change_1h)" v-if="widget.settings.showHour"><span v-if="coin.percent_change_1h > 0">+</span>{{ coin.percent_change_1h }}%</td>
          <td class="24h center" v-bind:style="getColor(coin.percent_change_24h)" v-if="widget.settings.showDay"><span v-if="coin.percent_change_24h > 0">+</span>{{ coin.percent_change_24h }}%</td>
          <td class="1w center" v-bind:style="getColor(coin.percent_change_7d)" v-if="widget.settings.showWeek"><span v-if="coin.percent_change_7d > 0">+</span>{{ coin.percent_change_7d }}%</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
let CRYPTOCOMPARE_API_URI = 'https://min-api.cryptocompare.com'
let CRYPTOCOMPARE_URI = 'https://www.cryptocompare.com'
let COINMARKETCAP_API_URI = 'https://api.coinmarketcap.com'

export default {
  props: ['widget'],
  data () {
    return {
      coins: [],
      coinData: {},
      interval: null
    }
  },
  created: function () {
    this.getCoinData()

    let UPDATE_INTERVAL = this.widget.settings.refresh * 1000 || 60000
    this.interval = setInterval(() => {
      this.getCoinData()
    }, UPDATE_INTERVAL)

    if (this.widget.settings.mode === 'single') {
      this.widget.width = 300
    }
  },
  methods: {
    getCoinData () {
      this.axios.get(CRYPTOCOMPARE_API_URI + '/data/all/coinlist')
        .then((resp) => {
          this.coinData = resp.data.Data
          this.getCoins()
        })
        .catch((err) => {
          this.getCoins()
          console.error(err)
        })
    },
    getCoins: function () {
      this.axios.get(COINMARKETCAP_API_URI + '/v1/ticker/?limit=30&convert=' + this.widget.settings.currency)
        .then((resp) => {
          let crypto = this.widget.settings.crypto
          let list = []
          if (typeof crypto !== 'undefined' && crypto.length > 0) {
            resp.data.forEach(function (element) {
              if (crypto.includes(element.symbol)) {
                list.push(element)
              }
            })
          }
          this.coins = list
        })
        .catch((err) => {
          console.error(err)
        })
    },
    getCoinImage: function (symbol) {
      // These two symbols don't match up across API services. I'm manually
      // replacing these here so I can find the correct image for the currency.
      //
      // In the future, it would be nice to find a more generic way of searching
      // for currency images
      symbol = (symbol === 'MIOTA' ? 'IOT' : symbol)
      symbol = (symbol === 'VERI' ? 'VRM' : symbol)

      if (this.coinData[symbol]) {
        return CRYPTOCOMPARE_URI + this.coinData[symbol].ImageUrl
      } else {
        return ''
      }
    },
    getColor: (num) => {
      return num > 0 ? 'color:green;' : 'color:red;'
    },
    formatPrice: function (price) {
      if (this.widget.settings.currency === 'USD') {
        let val = (price / 1).toFixed(2)
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      } else {
        let val = (price / 1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      }
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
  }
}
</script>

<style lang="stylus" scoped>
  @import '~variables'

  .cryptocurrencies ul
    list-style-type: none
    margin: 0
    padding: 4px

  .cryptocurrencies ul .single .data
    float: left
    width: 60%
    text-align: center

  .cryptocurrencies ul .single .image
    float: left
    width: 38%
    margin-left: 2%
    padding: 4px

  .cryptocurrencies ul .single .name
    white-space: nowrap

  .cryptocurrencies ul .price
    white-space: nowrap
    font-size: 24px
    border-top: 1px solid #ccc
    border-bottom: 1px solid #ccc
    margin: 8px 0
    padding: 8px 0

  .cryptocurrencies ul img
    width: 100%
    height: auto
    padding: 8px

  .cryptocurrencies table
    width: 100%

  .cryptocurrencies table thead td
    background-color: rgba(0, 0, 0, 0.5)
    text-align: center
    font-weight: 700
    padding: 4px

  .cryptocurrencies table td
    height: 27px
    background-color: rgba(0, 0, 0, 0.3)
    padding: 4px

  .cryptocurrencies table td.center
    text-align: center

  .cryptocurrencies table td img
    width: 100%
    height: auto
    max-width: 16px
    margin-right: 6px

  .cryptocurrencies table.singletable thead td
    font-size: 24px

  .cryptocurrencies table.singletable td
    font-size: 20px

  .cryptocurrencies table.multipletable thead td
    font-size: 14px

  .cryptocurrencies table.multipletable td
    font-size: 13px
</style>
