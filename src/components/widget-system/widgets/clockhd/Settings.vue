<template>
<div class="col-12">
  <q-toggle dark v-model="showDay" label="Show date below the clock" />
</div>
</template>

<script>
export default {
  props: ['widget'],
  data() {
    return {
      showDay: false,
    }
  },
  created(){
    if(!this.widget.settings)
      this.widget.settings = {};
    else
      this.showDay = this.widget.settings.showDay;
  },
  watch: {
    // whenever question changes, this function will run
    showDay: function (newVal) {
      this.widget.settings.showDay = newVal;
    }
  }
}
</script>
