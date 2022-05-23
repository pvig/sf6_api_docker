<template>
  <div>
    <h1>Produits</h1>
  </div>
</template>

<script>

export default {
  name: 'Produits',
  props: {},
  data: () => ({}),
  async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/login');
    }
  },
  methods: {}
}
</script>
