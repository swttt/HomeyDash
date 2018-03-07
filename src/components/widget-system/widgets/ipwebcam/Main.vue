<template>
    <div class="ipwebcam">
        <img v-bind:src="widget.settings.url" v-bind:alt="widget.settings.name" border="0" />
        <div class="name" v-if="widget.settings.showname">{{ widget.settings.name }}</div>
    </div>
</template>

<script>
    export default {
        props: ['widget']
    }
</script>

<style lang="stylus" scoped>
    @import '~variables'

    .ipwebcam img
        width: 100%
        height: auto

    .ipwebcam .name
        display: block
        width: 100%
        position: absolute
        left: 0
        bottom: 0
        padding: 8px
        color: #fff
        font-size: 12px
        background-color: rgba(0, 0, 0, 0.5)
</style>
