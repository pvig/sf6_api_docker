<template>
  <div>
    <h1>Ventes</h1>

    <v-list>
      <v-progress-linear v-show="isLoading" indeterminate color="blue-grey"></v-progress-linear>
      <v-list-item v-for="vente in listeVentes" :key="vente.id" :lien="'/vente/' + vente.id">
        <v-list-item-content>
          <v-list-item-title v-text="vente.numeroVente"></v-list-item-title>
        </v-list-item-content>
        <v-icon small class="mr-2" @click="editVente(vente.id)">mdi-pencil</v-icon>
        <v-icon small @click="dialogDeleteVente(vente.id)">mdi-delete</v-icon>
      </v-list-item>
    </v-list>

    <v-btn depressed @click="newVente()">
      Ajouter une vente
    </v-btn>

    <FicheVente :editVenteId="this.editVenteId" :editNewVente="this.editNewVente" @editDone="editDone"></FicheVente>

    <v-dialog v-model="confirmDeleteVente" max-width="800">
      <v-card class="editBox">
        <v-card-actions>
          Supprimer cette vente ?
          <v-spacer></v-spacer>
          <v-btn depressed @click="confirmDeleteVente = false">
            Annuler
          </v-btn>
          <v-btn depressed @click="deleteVente()">
            Supprimer
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>

    <SnackBar />
    <Progress></Progress>
  </div>
</template>
 
 <script>
import FicheVente from './components/FicheVente.vue'
import SnackBar from '../components/SnackBar.vue'
import Progress from '../components/Progress.vue'

export default {
  name: 'Ventes',
  data: () => ({}),
  components: {
    FicheVente,
    SnackBar,
    Progress
  },
  mounted() {
    this.$store.dispatch('ventes/getVentes').then(() => {
      this.listeVentes = this.$store.state.ventes.all;
      this.isLoading = false;
    });
  },
  computed: {
  },
  data: () => ({
    isLoading: true,
    listeVentes: {},
    editVenteId: null,
    editNewVente: false,
    confirmDeleteVente: false,
    venteToDeleteId: false
  }),
  methods: {
    editVente: function (id) {
      this.editVenteId = id;
    },
    newVente: function () {
      this.editNewVente = true;
    },
    dialogDeleteVente: function (id) {
      this.venteToDeleteId = id;
      this.confirmDeleteVente = true;
    },
    deleteVente: function () {
      this.$store.dispatch('ventes/deleteVente', this.venteToDeleteId);
      this.confirmDeleteVente = false;
    },
    editDone: function (vente) {
      this.editVenteId = null;
      this.editNewVente = false;
    }
  }
}
</script>
