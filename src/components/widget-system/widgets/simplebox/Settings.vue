<template>
<div class="col-12">
  <q-input v-model="widget.settings.text" type="textarea" float-label="Box content" :min-rows="2" dark></q-input>
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
    this.widget.settings = {};
    this.widget.settings.text = "This text will show up in your simple box (:";
  }
}
</script>
