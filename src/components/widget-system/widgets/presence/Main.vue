<template>
<div>
  <q-list v-if="!loading">

    <q-item v-for="user in widget.settings.users" :key="user">
      <q-item-main>
        {{widget.settings.homeyUsers[user].name}}
      </q-item-main>
      <q-item-side right>
        <img v-bind:src="widget.settings.homeyUsers[user].avatar" />

      </q-item-side>
    </q-item>
  </q-list>
</div>
</template>

<script>
export default {
  props: ['widget'],
  data() {
    return {
      users: {},
      loading: true
    }
  },
  async mounted() {
    await this.loopUsers();
    this.loading = false;
  },
  methods: {
    async loopUsers() {
      this.widget.settings.users.forEach(async (user) => {
        this.widget.settings.homeyUsers[user] = await this.$homey.users.getUser({
          id: user
        });
        await this.$homey.users.subscribe();
        this.widget.settings.homeyUsers[user].on('$state', state => {
          console.log(state);
        });
      })
    },

  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'

h5
  margin 0px
  padding 0px

</style>
