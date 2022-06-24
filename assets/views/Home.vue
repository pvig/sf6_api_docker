<template>
  <container class="mx-auto max-width-dt">
    <v-row >
      <v-col>
        <v-card max-width="1200">
          <v-progress-linear v-show="isLoading" indeterminate color="brown"></v-progress-linear>
          <apexchart type="bar" height="350" :options="graph1Options" :series="graph1series"></apexchart>
        </v-card>
        <v-card max-width="1200">
          <apexchart type="heatmap" height="350" :options="heatmapOptions" :series="heatmapSeries"></apexchart>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="float-right">
          <h3>Top 5 des produits</h3>
          <apexchart type="pie" width="380" :options="pie1Options" :series="pie1Data"></apexchart>
        </div>
      </v-col>
      <v-col>
        <apexchart type="treemap" width="380" :options="treemap1Options" :series="treemap1Data"></apexchart>
      </v-col>
    </v-row>
  </container>
</template>

<script>
export default {
  name: 'Home',
  props: {},
  data: () => ({
    isLoading: true,
    graph1Options: {
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
        }
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [],
        position: 'top',
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            }
          }
        },
        tooltip: {
          enabled: true,
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return parseInt(val) + " ventes";
          }
        }

      },
      title: {
        text: 'Ventes / année',
        floating: true,
        offsetY: 330,
        align: 'center',
        style: {
          color: '#444'
        }
      }
    },
    graph1series: [],
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
    treemap1Data: [],
    treemap1Options: {
      chart: {
        height: 350,
        type: 'treemap',
      },
      colors: [
        '#008ffb',
        '#FF4560',
        '#feb019',
        '#00e396',
        '#FF4900',
      ],
      plotOptions: {
        treemap: {
          distributed: true,
          enableShades: false
        }
      },
      dataLabels: {
        enabled: true
      },
      fill: {
        opacity: 0.8
      },
      title: {
        text: 'Top 5 des produits'
      },
      xaxis: {
        tickAmount: 12,
        type: 'category',
      },
      yaxis: {
        max: 150
      }
    },
    heatmapOptions: {
      chart: {
        height: 350,
        type: 'heatmap',
      },
      dataLabels: {
        enabled: false
      },
      colors: [
        '#D33C00',
      ],
      title: {
        text: 'Densité des ventes, par heure'
      }
    },
    heatmapSeries: []
  }),
  async created() {
    this.$store.dispatch('ventes/getVentes').then(() => {
      //-------------------       charts preparation        -------------------
      let totalAn = {};
      let totalProduit = {};
      let heatmap = [];
      let emptyYear = [];
      for (let num = 0; num < 12; num++) {
        let d = new Date();
        d.setMonth(num);
        let monthName = d.toLocaleString('default', { month: 'long' });
        emptyYear.push({
          x: monthName,
          y: 0
        })
      }

      for (let heure = 0; heure < 24; heure++) {
        heatmap[heure] = JSON.parse(JSON.stringify(emptyYear));
        //heatmap[heure] = this.clone(emptyYear);
      }
      //-------------------       ventes list processing        -------------------
      for (let nn in this.$store.state.ventes.all) {
        let vente = this.$store.state.ventes.all[nn];
        let dateVente = vente.dateVente;
        let numProduits = vente.lignesVente.length;
        //------------------- heatmap chart
        let d = new Date(dateVente);
        let year = d.getFullYear().toString();
        let month = d.getMonth().toString();
        let heure = d.getHours();
        heatmap[heure][month].y += numProduits;
        //------------------- chart1
        if (!totalAn[year]) totalAn[year] = 0;
        totalAn[year] += 1;
        //-------------------
        for (let tt in vente.lignesVente) {
          let nomProduit = vente.lignesVente[tt].nom;
          let quantite = vente.lignesVente[tt].quantite;
          if (!totalProduit[nomProduit]) totalProduit[nomProduit] = 0;
          totalProduit[nomProduit] += quantite;
        }
        //-------------------
      }
      //------------------- heatmap chart
      for (let heure in heatmap) {
        let ligne = heatmap[heure];
        this.heatmapSeries.push({
          name: heure,
          data: [...ligne]
        });
      }
      //------------------- graph1 chart
      let graph1Values = [];
      for (const [key, value] of Object.entries(totalAn)) {
        this.graph1Options.xaxis.categories.push(key);
        graph1Values.push(value);
      }
      this.graph1series.push({
        name: 'Ventes',
        data: graph1Values
      });
      //------------------- treemap chart
      var sortedKeys = Object.keys(totalProduit);
      sortedKeys.sort(function (a, b) { return totalProduit[b] - totalProduit[a] });
      sortedKeys = sortedKeys.slice(0, 5);

      let treemapSerie1 = [];
      for (var ii in sortedKeys) {
        let key = sortedKeys[ii];
        this.pie1Options.labels.push(key);
        this.pie1Data.push(totalProduit[key]);
        treemapSerie1.push({ x: key, y: totalProduit[key] });
      }
      this.treemap1Data.push({
        data: treemapSerie1
      });

      this.isLoading = false;
    });
  },
  methods: {}
}
</script>
