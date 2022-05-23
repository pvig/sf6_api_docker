<template>
  <div>
    <h1>Produit {{ $route.params.id }}</h1>


  </div>
</template>

<script>
import ProduitService from '../services/ProduitService.js';

export default {
  name: 'Produit',
  props: {},
  mounted() {
  },
  data: () => ({
  }),
  async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/login');
    }
  },
  methods: {}
}
</script>
