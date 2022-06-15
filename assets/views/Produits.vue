<template>
  <div>
    <h1>Produits</h1>

    <v-list>
      <v-progress-linear v-show="isLoading" indeterminate color="blue-grey"></v-progress-linear>
      <v-list-item v-for="product in listeProduits" :key="product.nom" :lien="'/produit/' + product.id">
        <v-list-item-content>
          <v-list-item-title v-text="product.nom"></v-list-item-title>
        </v-list-item-content>
        <v-icon small class="mr-2" @click="editProduit(product.id)">mdi-pencil</v-icon>
        <v-icon small @click="dialogDeleteProduit(product.id)">mdi-delete</v-icon>
      </v-list-item>
    </v-list>

    <v-btn depressed @click="newProduit()">
      Ajouter un produit
    </v-btn>

    <FicheProduit :editProduitId="this.editProduitId" :editNewProduit="this.editNewProduit" @editDone="editDone">
    </FicheProduit>

    <v-dialog v-model="confirmDeleteProduit" max-width="800">
      <v-card class="editBox">
        <v-card-actions>
          Supprimer ce produit ?
          <v-spacer></v-spacer>
          <v-btn depressed @click="confirmDeleteProduit = false">
            Annuler
          </v-btn>
          <v-btn depressed @click="deleteProduit()">
            Supprimer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <SnackBar />
    <Progress ></Progress>
  </div>
</template>

<script>
import FicheProduit from '../components/FicheProduit.vue'
import SnackBar from '../components/SnackBar.vue'
import Progress from '../components/Progress.vue'

export default {
  name: 'Produits',
  components: {
    FicheProduit,
    SnackBar,
    Progress
  },
  mounted() {
    this.$store.dispatch('produits/getProducts').then(() => {
      this.listeProduits = this.$store.state.produits.all;
      this.isLoading = false;
    });
  },
  data: () => ({
    isLoading: true,
    listeProduits: {},
    editProduitId: null,
    editNewProduit: false,
    confirmDeleteProduit: false,
    ProduitToDeleteId: false
  }),
  methods: {
    editProduit: function (id) {
      this.editProduitId = id;
    },
    newProduit: function () {
      this.editNewProduit = true;
    },
    dialogDeleteProduit: function (id) {
      this.ProduitToDeleteId = id;
      this.confirmDeleteProduit = true;
    },
    deleteProduit: function () {
      this.$store.dispatch('produits/deleteProduit', this.ProduitToDeleteId);
      this.confirmDeleteProduit = false;
    },
    editDone: function (Produit) {
      this.editProduitId = null;
      this.editNewProduit = false;
    }
  }
}
</script>