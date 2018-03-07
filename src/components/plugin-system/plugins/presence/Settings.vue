<template>
<div>
  <q-list v-if="!loading">
    <q-item>
      <q-item-main>
      <q-input dark name="textfield" type="text" v-model="settings.refresh" placeholder="refresh interval in minutes" />
        <q-input dark name="textfield" type="text" v-model="settings.apiKey" placeholder="put your apikey here" />
      </q-item-main>
    </q-item>
  </q-list>
  <div v-if="loading">
    <center><q-spinner style="margin-top:25px;" color="teal-4" size="50px" /></center>
  </div>
</div>
</template>

<script>
export default {
  props: ['plugin', 'settings'],
  data() {
    return {
      apiKey: [],
      refresh: [],
      loading: true
    }
  },
  async created() {

    this.loading = false;
  }
}
</script>
