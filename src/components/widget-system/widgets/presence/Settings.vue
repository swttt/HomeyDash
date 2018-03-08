<template>
<div class="col-12">


  <br/><br/><small>Select Users for in your widget</small>
  <q-select
      dark
      multiple
      toggle
      color="teal"
      v-model="widget.settings.users"
      :options="users"
    />
</div>
</template>

<script>
export default {
  props: ['widget'],
  data() {
    return {
      users: [],
      selected: []
    }
  },
  created() {

    this.getUsers();
    console.log(this.users)
  },
  methods:{
    async getUsers(){
      await this.$homey.users.subscribe();
      let users = await this.$homey.users.getUsers();
      _.forEach(users, user=> {

          this.widget.settings.homeyUsers[user.id] = user;
          let option = {}
          option.label = user.name;
          option.value = user.id;
          this.users.push(option);
        }
      );
    }
  }
}
</script>
