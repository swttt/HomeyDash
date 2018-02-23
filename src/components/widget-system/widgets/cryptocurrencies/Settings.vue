<template>
    <div class="col-12">
        <q-input dark v-model="widget.settings.refresh" type="number" placeholder="60" stack-label="Refresh rate in seconds" />
        <!--<q-btn-toggle dark v-model="widget.settings.currency" toggle-color="primary" :options="[{label: 'USD', value: 'USD'}, {label: 'EUR', value: 'EUR'}]" />-->
        <q-item tag="label">Currency</q-item>
        <q-radio dark v-model="widget.settings.currency" val="USD" label="USD" />
        <q-radio dark v-model="widget.settings.currency" val="EUR" label="EUR" />
        <q-select dark multiple v-model="crypto" :options="selectCrypto" stack-label="Show crypto currencies" />
        <q-list link>
            <q-item tag="label">
                <q-item-main>
                    <q-item-tile label>Show Logo</q-item-tile>
                </q-item-main>
                <q-item-side right>
                    <q-toggle dark v-model="showLogo" />
                </q-item-side>
            </q-item>
            <q-item tag="label">
                <q-item-main>
                    <q-item-tile label>Show Symbol</q-item-tile>
                </q-item-main>
                <q-item-side right>
                    <q-toggle dark v-model="showSymbol" />
                </q-item-side>
            </q-item>
            <q-item tag="label">
                <q-item-main>
                    <q-item-tile label>Show change percentage hour</q-item-tile>
                </q-item-main>
                <q-item-side right>
                        <q-toggle dark v-model="showHour" />
                </q-item-side>
            </q-item>
            <q-item tag="label">
                <q-item-main>
                    <q-item-tile label>Show change percentage day</q-item-tile>
                </q-item-main>
                <q-item-side right>
                        <q-toggle dark v-model="showDay" />
                </q-item-side>
            </q-item>
            <q-item tag="label">
                <q-item-main>
                    <q-item-tile label>Show change percentage week</q-item-tile>
                </q-item-main>
                <q-item-side right>
                        <q-toggle dark v-model="showWeek" />
                </q-item-side>
            </q-item>
        </q-list>
        <q-input dark v-model="widget.width" type="number" stack-label="Width" />
    </div>
</template>

<script>
    export default {
        props: ['widget'],
        data() {
            return {
                showLogo: true,
                showSymbol: true,
                showHour: true,
                showDay: true,
                showWeek: true,
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
        created(){
            if (!this.widget.settings)
                this.widget.settings = {};
            else
                this.showLogo = this.widget.settings.showLogo;
                this.showSymbol = this.widget.settings.showSymbol;
                this.showHour = this.widget.settings.showHour;
                this.showDay = this.widget.settings.showDay;
                this.showWeek = this.widget.settings.showWeek;
                this.crypto = this.widget.settings.crypto;
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
