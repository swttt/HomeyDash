<template>
    <div class="col-12">
        <q-input dark v-model="widget.settings.apikey" type="text" stack-label="API Key (read only)" />
        <q-input dark v-model="widget.settings.systemid" type="text" stack-label="System ID" />
        <q-field dark label="Number formatting">
            <q-radio left-label v-model="widget.settings.numberformat" val="us" label="1,000.00" color="teal" />
            <q-radio left-label v-model="widget.settings.numberformat" val="other" label="1.000,00" color="teal" />
        </q-field>
        <q-list link sparse separator no-border>
            <q-item tag="label">
                <q-item-main>
                    <q-item-tile label>Show Current Generation</q-item-tile>
                </q-item-main>
                <q-item-side right>
                    <q-toggle dark v-model="widget.settings.showCurrentGeneration" color="teal" />
                </q-item-side>
            </q-item>
            <q-item tag="label">
                <q-item-main>
                    <q-item-tile label>Show Today Generation</q-item-tile>
                </q-item-main>
                <q-item-side right>
                    <q-toggle dark v-model="widget.settings.showTodayGeneration" color="teal" />
                </q-item-side>
            </q-item>
            <q-item tag="label">
                <q-item-main>
                    <q-item-tile label>Show Week Generation</q-item-tile>
                </q-item-main>
                <q-item-side right>
                    <q-toggle dark v-model="widget.settings.showWeekGeneration" color="teal" />
                </q-item-side>
            </q-item>
            <q-item tag="label">
                <q-item-main>
                    <q-item-tile label>Show Lifetime Generation</q-item-tile>
                </q-item-main>
                <q-item-side right>
                    <q-toggle dark v-model="widget.settings.showLifetimeGeneration" color="teal" />
                </q-item-side>
            </q-item>
            <q-item tag="label">
                <q-item-main>
                    <q-item-tile label>Show Current Consumption</q-item-tile>
                </q-item-main>
                <q-item-side right>
                    <q-toggle dark v-model="widget.settings.showCurrentConsumption" color="teal" />
                </q-item-side>
            </q-item>
            <q-item tag="label">
                <q-item-main>
                    <q-item-tile label>Show Today Consumption</q-item-tile>
                </q-item-main>
                <q-item-side right>
                    <q-toggle dark v-model="widget.settings.showTodayConsumption" color="teal" />
                </q-item-side>
            </q-item>
        </q-list>
        <q-input dark v-model="widget.width" type="number" stack-label="Widget Width" />
    </div>
</template>

<script>
    export default {
        props: ['widget']
    }
</script>

<style lang="stylus">
    .q-list label
        padding-left: 0 !important
</style>
