<template>
<div class="col-12">
<q-item tag="label">
  <q-item-main>
  <q-input dark color="teal" v-model="widget.settings.text" type="textarea" float-label="Box content" :min-rows="2"></q-input>
  </q-item-main>
</q-item>
  <q-item tag="label">
    <q-item-main>
      <q-input dark color="teal" v-model="widget.width" type="number" float-label="Widget Width" />
    </q-item-main>
  </q-item>
  <q-list-header>Details to show</q-list-header>
  <q-item tag="label">
  <q-item-main>
  <q-item-tile label>Show text centered</q-item-tile>
  </q-item-main>
      <q-item-side right>
          <q-toggle dark v-model="widget.settings.centered" color="teal" />
      </q-item-side>
    </q-item>
</div>
</template>

<script>
export default {
  props: ['widget']
}
</script>
