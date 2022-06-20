<template>
  <div class="mx-auto max-width-dt">
    <v-card class="mt-4 mx-auto" max-width="400">
      <v-progress-linear v-show="isLoading" indeterminate color="blue-grey"></v-progress-linear>
      <v-sheet class="v-sheet--offset mx-auto" color="cyan" elevation="12" max-width="calc(100% - 32px)">
        <v-sparkline :labels="labels" :value="value" color="white" line-width="2" padding="16"></v-sparkline>
      </v-sheet>

      <v-card-text class="pt-0">
        <div class="text-h6 font-weight-light mb-2">
          Chiffre d'affaire
        </div>
        <div class="subheading font-weight-light grey--text">

        </div>
        <v-divider class="my-2"></v-divider>
        <v-icon class="mr-2" small>
          mdi-clock
        </v-icon>
        <span class="text-caption grey--text font-weight-light"></span>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>

export default {
  name: 'Home',
  props: {},
  data: () => ({
    isLoading: true,
    labels: [],
    value: [],
  }),
  async created() {
    this.$store.dispatch('ventes/getVentes').then(() => {
      let total = [];
      for (let nn in this.$store.state.ventes.all) {
        let dateVente = this.$store.state.ventes.all[nn].dateVente;
        let totalVente = parseFloat(this.$store.state.ventes.all[nn].prixProduitsHT);
        console.log("dateVente", dateVente);
        let d = new Date(dateVente);
        let year = d.getFullYear();
        if (!this.value[year]) this.value[year] = 0;
        this.value[year] += totalVente;
      }
      console.log(this.value);
      this.isLoading = false;
    });
  },
  methods: {}
}
</script>
