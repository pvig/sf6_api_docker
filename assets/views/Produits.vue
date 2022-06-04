<template>
  <div>
    <h1>Produits</h1>

    <v-list>
        <v-list-item
          v-for="product in produits"
          :key="product.nom"
          :lien="'/produit/' + product.id"
        >
          <v-list-item-content>
            <v-list-item-title v-text="product.nom" ></v-list-item-title>
          </v-list-item-content>
          <v-icon small class="mr-2" @click="editProduit(product.id)">mdi-pencil</v-icon>
          <v-icon small @click="deleteProduit(product.id)">mdi-delete</v-icon>
        </v-list-item>

    </v-list>

    <v-btn depressed @click="editProduit()">
      Ajouter un produit
    </v-btn>


    <v-row justify="center">
    <v-dialog
      v-model="editing"
      persistent
      max-width="800"
    >
      <v-card class="editBox">
        <FicheProduit :produit="this.localProduit" @updateProduit="updateProduitAtribute"></FicheProduit>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed @click="editing = false">
            Annuler
          </v-btn>
          <v-btn depressed @click="saveProduit()">
            Sauvegarder
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-row>
    <v-snackbar
      v-model="snackbar"
      :timeout="snackbarTimeout"
    >
      {{ snackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

</div>
</template>

<script>
import FicheProduit from '../components/FicheProduit.vue'

export default {
  name: 'Produits',
  props: {
  },
  components: {
    FicheProduit
  },
  computed: {
    produits () {
      return this.$store.state.produits.all
    },
    snackbar: {
      get: function () {
        return this.$store.state.snackbar;
      },
      set: function (newValue) {
        this.$store.commit('SET_SNACKBAR', newValue, { root: true });
      }
    },
    snackbarTimeout () {
      return this.$store.state.snackbarTimeout
    },
    snackbarText () {
      return this.$store.state.snackbarText
    },
    //...mapState(['produits.all']),
    /*..mapState('produits', {
        produits: 'all',
    })*/
  },
  mounted() {
    this.$store.dispatch('produits/getProducts');
  },
  data: () => ({
        editing: false,
        localProduit: {}
  }),
  async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/login');
    }
  },
  methods: {
    editProduit: function (id) {
      if(id && typeof this.$store.state.produits.all != 'undefined') {
        this.localProduit = {...this.$store.state.produits.all.find(element => element.id == id)};
        console.log("editProduit", id, this.localProduit);
      } else {
        this.localProduit = {
          nom:""
        }
      }
      this.editing = true;
    },
    deleteProduit: function (id) {
       console.log("deleteProduit", id);
    },
    updateProduitAtribute(val) {
      console.log("key", val.key, "value", val.value);
      this.localProduit[val.key] = val.value;
    },
    saveProduit(e) {
      this.$store.dispatch('produits/saveProduit', this.localProduit);
      this.editing = false;
    }
  }
}
</script>
<style>
.v-list {
  max-width: 750px;
}
.editBox {
  padding:10px;
}
</style>