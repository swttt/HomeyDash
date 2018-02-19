<template>
<div class="col-12">
  <q-input v-model="widget.options.text" type="textarea" float-label="Box content" :max-height="100" :min-rows="7" dark></q-input>
</div>
</template>

<script>
export default {
  props: ['widget'],
  data() {
    return {
    }
  },
  created() {
    this.widget.options = {};
    this.widget.options.text = "This text will show up in your simple box (:";
  }
}
</script>
