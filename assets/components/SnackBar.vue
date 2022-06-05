<template>   
    <v-snackbar
      v-model="snackbar"
      :timeout="snackbarTimeout"
    >
      {{ snackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script>

export default {
  computed: {
    snackbar: {
      get: function () {
        return this.$store.state.snackbar;
      },
      set: function (newValue) {
        this.$store.commit('SET_SNACKBAR', newValue, { root: true });
      }
    },
    snackbarTimeout () {
      return this.$store.state.snackbarTimeout
    },
    snackbarText () {
      return this.$store.state.snackbarText
    },
  },
  methods: {
  },
};
</script>

