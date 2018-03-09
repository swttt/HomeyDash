<template>
    <div class="col-12">
        <q-list link no-border>
            <q-item tag="label">
                <q-item-main>
                    <q-input dark v-model="widget.settings.name" type="text" stack-label="Name" />
                </q-item-main>
            </q-item>
            <q-item tag="label">
                <q-item-main>
                    <q-item-tile label>Show name as overlay?</q-item-tile>
                </q-item-main>
                <q-item-side right>
                    <q-toggle dark color="teal" v-model="widget.settings.showName" />
                </q-item-side>
            </q-item>
            <q-item tag="label">
                <q-item-main>
                    <q-input dark v-model="widget.settings.url" type="text" stack-label="Stream URL" />
                </q-item-main>
            </q-item>
            <q-item tag="label">
                <q-item-main>
                    <q-input dark v-model="widget.width" type="number" stack-label="Widget Width" />
                </q-item-main>
            </q-item>
        </q-list>
    </div>
</template>

<script>
export default {
  props: ['widget']
}
</script>
