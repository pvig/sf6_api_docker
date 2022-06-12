<template>
  <v-container fluid>
    <v-row style="height: 90vh;">
      <v-col cols="sm" align="center" class="d-flex justify-center align-center">
        <v-btn x-large color="lime" elevation="2" to="/clients">Clients</v-btn>
      </v-col>
      <v-col cols="sm" align="center" class="d-flex justify-center align-center">
        <v-btn x-large color="light-green" elevation="2" to="/produits">Produits</v-btn>
      </v-col>
      <v-col cols="sm" align="center" class="d-flex justify-center align-center">
        <v-btn x-large color="green" elevation="2" to="/ventes">Ventes</v-btn>
      </v-col>
    </v-row>
  </v-container>
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
