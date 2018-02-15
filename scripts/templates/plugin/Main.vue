<template>
<div>
  <q-transition appear enter="fadeIn" leave="fadeOut">
    <center><h1>PLUGIN_NAME</h1></center>
  </q-transition>
</div>
</template>


<script>
import {
  EventBus
} from 'src/eventBus';

export default {
  components: {},
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {

  },
  computed: {
    settings: {
      get() {
        return this.$store.state.settings
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'


</style>
