<template>
    <div class="col-12">
        <q-input stack-label="Title" placeholder="Your title here e.g. Living room" dark color="teal" v-model="widget.settings.name" />
        <q-toggle label="Show room" dark color="teal" v-model="widget.settings.room" />
        <q-toggle label="Show power icon" dark color="teal" v-model="widget.settings.icon" />
        <q-select dark v-model="widget.settings.pusage" :options="powermeter" stack-label="Select which powermeter to show" />
        <q-input dark v-model="widget.width" type="number" stack-label="Widget Width" />
    </div>
</template>

<script>
    export default {
        props: ['widget'],
        data() {
            return {
                powermeter: [],
            }
        },
        created() {
            this.getPowermeter();
        },
        methods:{
            async getPowermeter() {
                let devices = await this.$homey.devices.getDevices();
                _.forEach(devices, device => {
                    if (device.capabilities.meter_power) {
                        this.powermeter.push({
                            label: device.name,
                            value: device.id
                        });
                        console.log(this.powermeter);
                    }
                });
            }
        }
    }
</script>
