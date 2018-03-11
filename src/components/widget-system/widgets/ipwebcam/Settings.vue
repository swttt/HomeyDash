<template>
    <div class="col-12">
      <q-list no-border>
      <q-item tag="label">
        <q-item-main>
          <q-input color="teal" dark v-model="widget.settings.name" type="text" float-label="Name" />
        </q-item-main>
      </q-item>
      <q-item tag="label">
        <q-item-main label="Show name as overlay" />
        <q-item-side right>
          <q-toggle color="teal" dark v-model="widget.settings.showName" />
        </q-item-side>
      </q-item>
      <q-item tag="label">
        <q-item-main>
          <q-input dark color="teal" v-model="widget.settings.url" type="text" float-label="Stream URL" />
        </q-item-main>
      </q-item>
      <q-item tag="label">
        <q-item-main>
          <q-input dark color="teal" v-model="widget.width" type="number" float-label="Widget Width" />
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
