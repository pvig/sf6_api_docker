<template>
  <div class="mx-auto max-width-dt">
    <v-card class="mt-4 mx-auto" max-width="800">
      <v-progress-linear v-show="isLoading" indeterminate color="brown"></v-progress-linear>
      <v-sheet class="v-sheet--offset mx-auto" color="white" elevation="6" max-width="calc(100% - 32px)">
        <v-sparkline :labels="labels" :value="value" color="brown darken-1" line-width="2" padding="16" fill="1"></v-sparkline>
      </v-sheet>

      <v-card-text class="pt-0">
        <div class="text-h6 font-weight-light mb-2">
          Ventes par année
        </div>
        <div class="subheading font-weight-light grey--text">

        </div>
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
      let vals = {};
      for (let nn in this.$store.state.ventes.all) {
        let dateVente = this.$store.state.ventes.all[nn].dateVente;
        let totalVente = parseFloat(this.$store.state.ventes.all[nn].prixProduitsHT);
        let d = new Date(dateVente);
        let year = d.getFullYear().toString();
        if (!vals[year]) vals[year] = 0;
        vals[year] += totalVente;
      }
      for (const [key, value] of Object.entries(vals)) {
        this.labels.push(key);
        this.value.push(value);
      }

      this.isLoading = false;
    });
  },
  methods: {}
}
</script>
