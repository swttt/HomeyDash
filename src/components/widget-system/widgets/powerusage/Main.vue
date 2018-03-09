<template>
<div class="powermeter" v-if="!loading">
        <h5>{{ widget.settings.name }}</h5>
        <small class="text-grey" v-if="widget.settings.room">{{ device.zone.name }}</small>
        <div class="data">
            <i class="fa fa-bolt fa-2x icon" aria-hidden="true" v-if="widget.settings.icon"></i><br>
            <span class="powermeter">Power  {{ device.state.measure_power }}</span><span class="unit">{{ device.capabilities.meter_power.units.en }}</span><br>
            <span class="powermeter">Off-peak {{ device.state.meter_power.offPeak }}</span><span class="unit">{{ device.capabilities.meter_power.en }}</span><br>
            <span class="powermeter">Gas{{ device.state.measure_gas }}</span><span class="unit">{{ device.capabilities.measure_gas.units.en }}</span><br>
            <span class="powermeter">Power Meter{{ device.state.meter_power }}</span><span class="unit">{{ device.capabilities.meter_power.units.en }}</span><br>
            <span class="powermeter">Power meter peak{{ device.state.meter_power.peak }}</span><span class="unit">{{ device.capabilities.meter_power.units.en }}</span><br>
            <span class="powermeter">power meter off-peak{{ device.state.meter_power.offpeak }}</span><span class="unit">{{ device.capabilities.meter_power.units.en }}</span><br>
            <span class="powermeter">Production peak{{ device.state.meter_power.producesPeak }}</span><span class="unit">{{ device.capabilities.meter_power.units.en }}</span><br>
            <span class="powermeter">Production off-peak{{ device.state.meter_power.producesOffPeak }}</span><span class="unit">{{ device.capabilities.meter_power.units.en }}</span><br>
        </div>
    </div>
</template>



<script>
export default {
    props: ['widget'],
    data() {
        return {
            device: {},
            loading: true
        }
    },
    async mounted() {
        await this.getPowermeter();
        this.loading = false;
    },
    methods: {
        async getPowermeter() {
            this.device = await this.$homey.devices.getDevice({ id: this.widget.settings.pusage });
            await this.$homey.devices.subscribe();
            this.device.on('$state', state => {
                console.log(state);
            });
        }
    }
}
</script>

<style lang="stylus" scoped>
    @import '~variables'

    .powermeter
        text-align: left
        padding: 20px

    .powermeter h5
        margin: 0

    .powermeter .data
        padding-top: 5px

    .powermeter .icon
        padding-right: 10px

    .powermeter .temperature
        font-size: 2.2rem

    .powermeter .unit
        font-size: 1rem
        padding-left: 6px
</style>
