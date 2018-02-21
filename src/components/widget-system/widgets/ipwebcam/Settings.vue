<template>
    <div class="col-12">
        <q-input dark v-model="widget.settings.name" type="text" stack-label="Name" />
        <q-toggle dark v-model="showName" label="Show name as overlay?" />
        <q-input dark v-model="widget.settings.url" type="text" stack-label="Stream URL (without http)" />
        <q-toggle dark v-model="useHttps" label="Use HTTPS?" />
        <q-input dark v-model="widget.settings.username" type="text" stack-label="HTTP authentication username" />
        <q-input dark v-model="widget.settings.password" type="password" stack-label="HTTP authentication password" />
        <q-input dark v-model="widget.width" type="number" stack-label="Width" />
        <q-input dark v-model="widget.height" type="number" label="Height" />
    </div>
</template>

<script>
    export default {
        props: ['widget'],
        data() {
            return {
                showName: false,
                useHttps: false,
            }
        },
        created(){
            if (!this.widget.settings)
                this.widget.settings = {};
            else
                this.showName = this.widget.settings.showname;
                this.useHttps = this.widget.settings.secure;
        },
        watch: {
            showName: function (newVal) {
                this.widget.settings.showname = newVal;
            },
            useHttps: function (newVal) {
                this.widget.settings.secure = newVal;
            },
        }
    }
</script>
