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
      <div class="float-left">
        <h3>Top 5 des produits</h3>
        <apexchart type="pie" width="380" :options="pie1Options" :series="pie1Data"></apexchart>
      </div>
      <div class="float-right">
        <h3>Top 5 des produits</h3>
        <apexchart type="bubble" width="380" :options="bubble1Options" :series="bubble1Data"></apexchart>
      </div>
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
    pie1Data: [],
    pie1Options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: [],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
    bubble1Data: [],
    bubble1Options: {
      chart: {
        height: 350,
        type: 'bubble',
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        opacity: 0.8
      },
      title: {
        text: 'Simple Bubble Chart'
      },
      xaxis: {
        tickAmount: 12,
        type: 'category',
      },
      yaxis: {
        max: 70
      }
    },
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
      //-------------------
      for (const [key, value] of Object.entries(totalsAn)) {
        this.graph1Labels.push(key);
        this.graph1Values.push(value);
      }
      //-------------------
      var sortedKeys = Object.keys(totalProduit);
      sortedKeys.sort(function (a, b) { return totalProduit[b] - totalProduit[a] });
      sortedKeys = sortedKeys.slice(0, 5);

      let bubbleSerie1 = [];
      for (var ii in sortedKeys) {
        let key = sortedKeys[ii];
        this.pie1Options.labels.push(key);
        this.pie1Data.push(totalProduit[key]);
        bubbleSerie1.push(totalProduit[key]);
      }

      this.bubble1Data.push({
        name:"Produits",
        data: bubbleSerie1
      });

      this.isLoading = false;
    });
  },
  methods: {}
}
</script>
