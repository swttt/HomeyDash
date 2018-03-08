<template>
    <div class="col-12">
        <q-input stack-label="Title" placeholder="Your title here e.g. Living room" dark color="teal" v-model="widget.settings.name" />
        <q-toggle label="Show room" dark color="teal" v-model="widget.settings.room" />
        <q-toggle label="Show thermometer icon" dark color="teal" v-model="widget.settings.icon" />
        <q-select dark v-model="widget.settings.thermometer" :options="thermometers" stack-label="Select which thermometer to show" />
        <q-input dark v-model="widget.width" type="number" stack-label="Widget Width" />
    </div>
</template>

<script>
    export default {
        props: ['widget'],
        data() {
            return {
                thermometers: []
            }
        },
        created() {
            this.getThermometers();
        },
        methods:{
            async getThermometers() {
                let devices = await this.$homey.devices.getDevices();
                _.forEach(devices, device => {
                    if (device.capabilities.measure_temperature) {
                        this.thermometers.push({
                            label: device.name,
                            value: device.id
                        });
                    }
                });
            }
        }
    }
</script>
