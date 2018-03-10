<template>
<div class="col-12">
  <q-list no-border>
  <q-item tag="label">
    <q-item-main label="Show date below the clock" />
    <q-item-side right>
      <q-toggle dark color="teal" v-model="widget.settings.showDay" />
    </q-item-side>
  </q-item>
</q-list>

</div>
</template>

<script>
export default {
  props: ['widget'],
  data () {
    return {

    }
  },
  created () {

  }
}
</script>
