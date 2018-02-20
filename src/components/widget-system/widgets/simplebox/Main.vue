<template>
<div class="content">
  {{widget.settings.text}}
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
