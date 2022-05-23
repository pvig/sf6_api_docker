<template>
  <div>
    <h1>Commandes</h1>
  </div>
</template>

<script>

export default {
  name: 'Commandes',
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
