<template>
    <v-snackbar
      v-model="snackbarShow"
      :timeout="snackbarTimeout"
      :color="snackbarColor"
    >
      {{ snackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="black"
          text
          v-bind="attrs"
          @click="snackbarShow = false"
        >
          <b>X</b>
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script>
export default {
  computed: {
    snackbarShow: {
      get: function () {
        return this.$store.state.snackbarShow;
      },
      set: function (newValue) {
        this.$store.commit('SET_SNACKBARSHOW', newValue, { root: true });
      }
    },
    snackbarTimeout () {
      return this.$store.state.snackbarTimeout
    },
    snackbarText () {
      return this.$store.state.snackbarText
    },
    snackbarColor () {
      return this.$store.state.snackbarColor
    },
  },
  methods: {
  },
};
</script>

