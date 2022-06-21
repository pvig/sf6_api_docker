<template>
  <div class="mx-auto max-width-dt">
    <v-card class="mt-4 mx-auto" max-width="800">
      <v-progress-linear v-show="isLoading" indeterminate color="brown"></v-progress-linear>

      <v-sheet class="v-sheet--offset mx-auto" color="white" elevation="6" max-width="calc(100% - 32px)">
        <v-sparkline :labels="graph1Labels" :value="graph1Values" color="brown darken-1" line-width="2" padding="16"
          :fill="true">
        </v-sparkline>
      </v-sheet>

      <v-card-text class="pt-0">
        <div class="text-h6 font-weight-light mb-2">
          Ventes par année
        </div>
        <div class="subheading font-weight-light grey--text">

        </div>
      </v-card-text>
    </v-card>

    <v-card class="mt-4 mx-auto" max-width="800">
      <v-progress-linear v-show="isLoading" indeterminate color="green"></v-progress-linear>

      <v-sheet class="v-sheet--offset mx-auto" color="white" elevation="6" max-width="calc(100% - 32px)">
        <v-sparkline :labels="graph2Labels" :value="graph2Values" color="green darken-1" line-width="2" padding="16"
          :fill="true">
        </v-sparkline>
      </v-sheet>

      <v-card-text class="pt-0">
        <div class="text-h6 font-weight-light mb-2">
          Produits
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
    graph1Labels: [],
    graph1Values: [],
    graph2Labels: [],
    graph2Values: [],
  }),
  async created() {
    this.$store.dispatch('ventes/getVentes').then(() => {
      let totalsAn = {};
      let totalProduit = {};
      for (let nn in this.$store.state.ventes.all) {
        let dateVente = this.$store.state.ventes.all[nn].dateVente;
        let totalVente = parseFloat(this.$store.state.ventes.all[nn].prixProduitsHT);
        //-------------------
        let d = new Date(dateVente);
        let year = d.getFullYear().toString();
        if (!totalsAn[year]) totalsAn[year] = 0;
        totalsAn[year] += totalVente;
        //-------------------
        for (let tt in this.$store.state.ventes.all[nn].lignesVente) {
          let nomProduit = this.$store.state.ventes.all[nn].lignesVente[tt].nom;
          let quantite = this.$store.state.ventes.all[nn].lignesVente[tt].quantite;
          if (!totalProduit[nomProduit]) totalProduit[nomProduit] = 0;
          totalProduit[nomProduit] += quantite;
        }
      }

      for (const [key, value] of Object.entries(totalsAn)) {
        this.graph1Labels.push(key);
        this.graph1Values.push(value);
      }
      for (const [key, value] of Object.entries(totalProduit)) {
        this.graph2Labels.push(key);
        this.graph2Values.push(value);
      }

      this.isLoading = false;
    });
  },
  methods: {}
}
</script>
