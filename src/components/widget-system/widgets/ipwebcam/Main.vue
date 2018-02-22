<template>
    <div class="ipwebcam">
        <img id="stream" v-bind:src="webcamUrl()" v-bind:alt="widget.settings.name" border="0" />
        <div class="name" v-if="widget.settings.showname">{{ widget.settings.name }}</div>
    </div>
</template>

<script>
    export default {
        props: ['widget'],
        methods: {
            webcamUrl: function () {
                var url = '';
                if (this.widget.settings.secure) {
                    url = 'https://'+ this.widget.settings.url;
                } else {
                    url = 'http://'+ this.widget.settings.url;
                }

                fetch(url, {
                    method: 'GET',
                    mode: 'cors',
                    credentials: 'include',
                    headers: {
                        'Access-Control-Allow-Origin': 'http://homeydash.local:8081',
                        'Authorization': 'Basic ' + btoa(this.widget.settings.username + ':' + this.widget.settings.password),
                        'Access-Control-Allow-Methods': 'GET',
                        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                        'Access-Control-Max-Age': 86400
                    }
                })
                .then(function(response) {
                    console.log(response);
                })
                .catch(function(error) {
                    console.log(error);
                });
            }
        }
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
