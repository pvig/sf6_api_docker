<template>
  <div class="mx-auto max-width-dt">
    <v-card class="mt-4 mx-auto" max-width="800">
      <v-progress-linear v-show="isLoading" indeterminate color="brown"></v-progress-linear>
      <apexchart type="bar" height="350" :options="graph1Options" :series="graph1series"></apexchart>
    </v-card>

    <v-card class="mt-4 mx-auto" max-width="800">
      <apexchart type="heatmap" height="350" :options="heatmapOptions" :series="heatmapSeries"></apexchart>
    </v-card>

    <v-card class="mt-4 mx-auto" max-width="800">
      <div class="float-left">
        <h3>Top 5 des produits</h3>
        <apexchart type="pie" width="380" :options="pie1Options" :series="pie1Data"></apexchart>
      </div>
      <div class="float-right">
        <apexchart type="treemap" width="380" :options="treemap1Options" :series="treemap1Data"></apexchart>
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
    graph1Options: {
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return parseInt(val) + " ventes";
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
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
        '#00e396'
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
      colors: ["#008FFB"],
      title: {
        text: 'Densité des ventes, par heure'
      },
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
