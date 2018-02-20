<template>
    <div class="col-12">
        <q-input dark v-model="widget.settings.name" stack-label="Name" />
        <q-input dark v-model="widget.settings.url" stack-label="Stream URL" />
        <q-toggle dark v-model="widget.settings.showname" label="Show name as overlay?" />
        <q-input dark v-model="widget.width" stack-label="Width" />
        <q-input dark v-model="widget.height" label="Height" />
    </div>
</template>

<script>
    export default {
        props: ['widget'],
        data() {
            return {

            }
        },
        created(){
            this.widget.settings = {};
        }
    }
</script>
