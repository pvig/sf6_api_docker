<template>
  <div>
    <h1>Bienvenue {{ username }}</h1>
  </div>
</template>

<script>

export default {
  name: 'Home',
  props: {},
  data: () => ({
    secretMessage: '',
    username: ''
  }),
  async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/login');
    }
    this.username = this.$store.getters.getUser.username;
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    }
  }
}
</script>
