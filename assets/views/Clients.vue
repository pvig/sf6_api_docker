<template>
  <div>
    <h1>Clients</h1>
  </div>
</template>

<script>

export default {
  name: 'Clients',
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
