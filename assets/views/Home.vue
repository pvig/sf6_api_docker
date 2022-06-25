<template>
  <div class="mx-auto max-width-dt">
    <v-row>
      <v-col>
        <v-card max-width="1200">
          <v-progress-linear v-show="isLoading" indeterminate color="brown"></v-progress-linear>
          <apexchart type="bar" height="350" :options="graph1Options" :series="graph1series"></apexchart>
        </v-card>
        <v-card max-width="1200">
          <apexchart type="area" height="200" :options="graph2AreaOptions" :series="graph2series"></apexchart>
          <apexchart type="bar" height="200" :options="graph2Options" :series="graph2series"></apexchart>
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
        stacked: true
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
        }
      },
      dataLabels: {
        enabled: true,
      },
      xaxis: {
        categories: [],
        position: 'top',
        axisBorder: {
          show: true
        },
        axisTicks: {
          show: true
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
          show: true,
        },
        labels: {
          show: true,
          formatter: function (val) {
            return parseInt(val) + " ventes";
          }
        }

      },
      title: {
        text: 'Ventes',
        floating: true,
        offsetY: 0,
        align: 'left',
        style: {
          color: '#444'
        }
      }
    },
    graph2AreaOptions: {
      chart: {
        id: "chart2area",
        type: "area",
        height: 230,
        foreColor: "#ccc",
        toolbar: {
          autoSelected: "pan",
          show: false
        }
      },
      toolbar: {
        autoSelected: "pan",
        show: false
      },
      grid: {
        borderColor: "#555",
        clipMarkers: false,
        yaxis: {
          lines: {
            show: false
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        gradient: {
          enabled: true,
          opacityFrom: 0.55,
          opacityTo: 0
        }
      },
      markers: {
        size: 5,
        colors: ["#000524"],
        strokeColor: "#00BAEC",
        strokeWidth: 3
      },
    },
    graph2Options: {
      chart: {
        height: 350,
        type: 'bar',
        brush: {
          target: "chart2area",
          enabled: true
        },
        selection: {
          enabled: true,
          fill: {
            color: "#fff",
            opacity: 0.4
          },
        }
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
        }
      },
      dataLabels: {
        enabled: true,
      },
      xaxis: {
        categories: [],
        position: 'top',
        axisBorder: {
          show: true
        },
        axisTicks: {
          show: true
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
          show: true,
        },
        labels: {
          show: true,
          formatter: function (val) {
            return parseInt(val) + " ventes";
          }
        }

      },
      title: {
        text: 'Ventes',
        floating: true,
        offsetY: 0,
        align: 'left',
        style: {
          color: '#444'
        }
      }
    },
    graph1series: [],
    graph2series: [],
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
      let totalVentesAn = {};
      let totalProduit = {};
      let heatmap = [];
      let emptyYear = [];
      let graph1Values1 = [];
      let graph1Values2 = [];
      let graph1Values3 = [];
      let graph2Values = [];
      let treemapSerie1 = [];
      let ventesMensuelles = [];

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
        let dateJour = this.$options.filters.formatDateIndex(d, "Y-MM-DD");
        let indexMois = this.$options.filters.formatDateIndex(d, "YM").toString().substring(2);
        heatmap[heure][month].y += numProduits;
        //------------------- chart 1
        if (!totalVentesAn[year]) totalVentesAn[year] = { ventesCateg1: 0, ventesCateg2: 0, ventesCateg3: 0 };

        if (numProduits < 5)
          totalVentesAn[year].ventesCateg1++;
        else if (numProduits < 10)
          totalVentesAn[year].ventesCateg2++;
        else
          totalVentesAn[year].ventesCateg3++;
        //------------------- chart 2
        if (!ventesMensuelles[indexMois]) ventesMensuelles[indexMois] = { ventes: 0, date: dateJour };
        ventesMensuelles[indexMois].ventes += 1;
        //-------------------
        for (let tt in vente.lignesVente) {
          let nomProduit = vente.lignesVente[tt].nom;
          let quantite = vente.lignesVente[tt].quantite;
          if (!totalProduit[nomProduit]) totalProduit[nomProduit] = 0;
          totalProduit[nomProduit] += quantite;
        }
        //-------------------
      }
      console.log("ventesMensuelles", ventesMensuelles);
      //------------------- heatmap chart
      for (let heure in heatmap) {
        let ligne = heatmap[heure];
        this.heatmapSeries.push({
          name: heure,
          data: [...ligne]
        });
      }
      //------------------- graph1 chart
      for (const [key, value] of Object.entries(totalVentesAn)) {
        this.graph1Options.xaxis.categories.push(key);
        graph1Values1.push(value.ventesCateg1);
        graph1Values2.push(value.ventesCateg2);
        graph1Values3.push(value.ventesCateg3);
      }
      this.graph1series.push({
        name: '< 5 produits',
        data: graph1Values1
      });
      this.graph1series.push({
        name: '< 10 produits',
        data: graph1Values2
      });
      this.graph1series.push({
        name: '>= 10 produits',
        data: graph1Values3
      });
      //------------------- graph2 chart
      for (const [key, value] of Object.entries(ventesMensuelles)) {
        graph2Values.push(value.ventes);
      }

      this.graph2series.push({
        name: 'ventes',
        data: graph2Values
      });
      //------------------- treemap chart
      var sortedKeys = Object.keys(totalProduit);
      sortedKeys.sort(function (a, b) { return totalProduit[b] - totalProduit[a] });
      sortedKeys = sortedKeys.slice(0, 5);

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
