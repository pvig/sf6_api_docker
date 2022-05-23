<template>
  <div>
    <h1>Ventes</h1>
  </div>
</template>

<script>

export default {
  name: 'Ventes',
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
