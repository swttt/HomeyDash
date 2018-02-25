<template>
    <div class="col-12">
        <q-input dark v-model="widget.settings.refresh" type="number" stack-label="Refresh rate in seconds" />
        <!--<q-btn-toggle dark v-model="widget.settings.currency" toggle-color="primary" :options="[{label: 'USD', value: 'USD'}, {label: 'EUR', value: 'EUR'}]" />-->
        <q-field dark label="Select currency">
            <q-radio left-label v-model="widget.settings.currency" val="USD" label="USD" color="teal" />
            <q-radio left-label v-model="widget.settings.currency" val="EUR" label="EUR" color="teal" />
        </q-field>
        <q-select dark multiple v-model="crypto" :options="selectCrypto" stack-label="Select which crypto currencies to show" />
        <q-list link sparse separator no-border>
            <q-list-header>Details to show</q-list-header>
            <q-item tag="label">
                <q-item-main>
                    <q-item-tile label>Show Logo</q-item-tile>
                </q-item-main>
                <q-item-side right>
                    <q-toggle dark v-model="showLogo" color="teal" />
                </q-item-side>
            </q-item>
            <q-item tag="label">
                <q-item-main>
                    <q-item-tile label>Show Symbol</q-item-tile>
                </q-item-main>
                <q-item-side right>
                    <q-toggle dark v-model="showSymbol" color="teal" />
                </q-item-side>
            </q-item>
            <q-item tag="label">
                <q-item-main>
                    <q-item-tile label>Show change percentage hour</q-item-tile>
                </q-item-main>
                <q-item-side right>
                        <q-toggle dark v-model="showHour" color="teal" />
                </q-item-side>
            </q-item>
            <q-item tag="label">
                <q-item-main>
                    <q-item-tile label>Show change percentage day</q-item-tile>
                </q-item-main>
                <q-item-side right>
                        <q-toggle dark v-model="showDay" color="teal" />
                </q-item-side>
            </q-item>
            <q-item tag="label">
                <q-item-main>
                    <q-item-tile label>Show change percentage week</q-item-tile>
                </q-item-main>
                <q-item-side right>
                        <q-toggle dark v-model="showWeek" color="teal" />
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
                refresh: 60,
                currency: "USD",
                showLogo: false,
                showSymbol: false,
                showHour: false,
                showDay: false,
                showWeek: false,
                crypto: [],
                selectCrypto: this.getCoinSelect()
            }
        },
        methods: {
            getCoinSelect: function() {
                let list = [];
                this.axios.get("https://api.coinmarketcap.com/v1/ticker/?limit=30")
                    .then((resp) => {
                        resp.data.forEach(function(element) {
                            list.push({
                                label: element.name,
                                value: element.symbol
                            });
                        });
                    })
                    .catch((err) => {
                        console.error(err);
                    });
                return list;
            }
        },
        created: function () {
            this.refresh = this.widget.settings.refresh || 60;
            this.currency = this.widget.settings.currency || "USD";
            this.crypto = this.widget.settings.crypto || ["BTC", "ETH"];
            this.showLogo = this.widget.settings.showLogo || false;
            this.showSymbol = this.widget.settings.showSymbol || false;
            this.showHour = this.widget.settings.showHour || false;
            this.showDay = this.widget.settings.showDay || false;
            this.showWeek = this.widget.settings.showWeek || false;
        },
        watch: {
            showLogo: function (newVal) {
                this.widget.settings.showLogo = newVal;
            },
            showSymbol: function (newVal) {
                this.widget.settings.showSymbol = newVal;
            },
            showHour: function (newVal) {
                this.widget.settings.showHour = newVal;
            },
            showDay: function (newVal) {
                this.widget.settings.showDay = newVal;
            },
            showWeek: function (newVal) {
                this.widget.settings.showWeek = newVal;
            },
            crypto: function (newVal) {
                this.widget.settings.crypto = newVal;
            }
        }
    }
</script>

<style lang="stylus">
    .q-list .q-list-header, .q-list label
        padding-left: 0 !important
</style>
