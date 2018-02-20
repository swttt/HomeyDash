<template>
<div class="col-12">
  <q-toggle dark v-model="widget.settings.showDay" label="Show date below the clock" />
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
