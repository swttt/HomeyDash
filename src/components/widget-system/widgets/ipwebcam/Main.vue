<template>
    <div class="ipwebcam">
        <img id="stream" v-bind:src="webcamUrl()" v-bind:alt="widget.settings.name" border="0" onLoad="webcamUrl()" />
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
                /*if (this.widget.settings.username && this.widget.settings.password) {
                    console.log('using credentials');
                    var options = {
                        url: url,
                        method: 'GET',
                        headers: {
                            'Authorization': "Basic " + btoa(this.widget.settings.username + ":" + this.widget.settings.password),
                            'Access-Control-Allow-Origin':  'http://homeydash.local:8081',
                            'Access-Control-Allow-Methods': 'GET',
                            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                            'Access-Control-Allow-Credentials': 'true'
                        }
                    }
                } else {
                    console.log('not using credentials');
                    var options = {
                        url: url,
                        method: 'GET',
                        headers: {
                            'Access-Control-Allow-Origin':  'http://homeydash.local:8081',
                            'Access-Control-Allow-Methods': 'GET',
                            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                            'Access-Control-Allow-Credentials': 'true'
                        }
                    }
                }

                this.$http(options)
                    .then((response) => {
                        console.log('success');
                        return response.body;
                    }, (error) => { console.log('whoops'); console.log(error); });*/

                /*this.axios.defaults.withCredentials = true;

                let axiosConfig = {
                    headers: {
                        'crossdomain': 'true',
                        'Access-Control-Allow-Origin':  'http://homeydash.local:8081',
                        'Access-Control-Allow-Methods': 'GET',
                        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
                        'Access-Control-Allow-Credentials': true
                    }
                };

                this.axios.get(url)
                    .then((response) => {
                      console.log("RESPONSE RECEIVED: ", response);
                      return response.body;
                    })
                    .catch((error) => {
                      console.log("AXIOS ERROR: ", error);
                  })*/

                fetch(url, {
                       method: 'GET',
                       mode: 'no-cors',
                       credentials: 'same-origin',
                       headers: {
                           'Authorization': "Basic " + btoa(this.widget.settings.username + ":" + this.widget.settings.password),
                           'Access-Control-Allow-Origin':  'http://homeydash.local:8081',
                           'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
                           'Access-Control-Allow-Credentials': true
                       }
                   }
                )
                    .then(response => response.json())
                    .then(json => {
                        return json.body;
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
