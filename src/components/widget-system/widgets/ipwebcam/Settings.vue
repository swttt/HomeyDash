<template>
    <div class="col-12">
        <q-input dark v-model="widget.settings.name" type="text" stack-label="Name" />
        <q-toggle dark v-model="widget.settings.showName" label="Show name as overlay?" />
        <q-input dark v-model="widget.settings.url" type="text" stack-label="Stream URL" />
        <q-input dark v-model="widget.width" type="number" stack-label="Widget Width" />
    </div>
</template>

<script>
export default {
  props: ['widget']
}
</script>
