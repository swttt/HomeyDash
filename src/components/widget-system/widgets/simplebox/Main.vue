<template>
<div class="content" v-bind:style="{ width: widget.w + 'px', height: widget.h + 'px'  }">
  {{widget.options.text}}
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
    console.log(this.widget);
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'

.content
  padding 10px

  </style>
