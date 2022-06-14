<template>
    <v-progress-linear
      v-show="progressShow"
      indeterminate
      color="green darken-2"
      class="absolute-top"
    ></v-progress-linear>
</template>
<script>
export default {
  computed: {
    progressShow: {
      get: function () {
        return this.$store.state.progressShow;
      },
      set: function (newValue) {
        this.$store.commit('SET_PROGRESSSHOW', newValue, { root: true });
      }
    }
  },
};
</script>