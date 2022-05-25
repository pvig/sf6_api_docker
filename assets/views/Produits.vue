<template>
  <div>
    <h1>Produits</h1>

    <!--ul>
      <li v-for="product in products" :key="product.ref">
        <ListItem url="'/produit/' + product.id" >{{ product.nom }}</ListItem>
      </li>
    </ul-->

    <v-list>
      <v-list-item-group
        color="primary"
      >
        <v-list-item
          v-for="(product, i) in produits"
          :key="i"
          :lien="'/produit/' + product.id"
          @click="editProduit(product.id)"
        >
          <v-list-item-content>
            <v-list-item-title v-text="product.nom"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-btn depressed @click="editProduit()">
      Ajouter un produit
    </v-btn>


    <v-row justify="center">
    <v-dialog
      v-model="editing"
      persistent
      max-width="600"
    >
      <v-card>
        <FicheProduit :produit="this.produit"></FicheProduit>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed @click="editing = false">
            Annuler
          </v-btn>
          <v-btn depressed @click="editing = false">
            Sauvegarder
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-row>


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
    aaaproduit() {
      if(this.produitId && typeof this.$store.state.produits.all != 'undefined') {
        return this.$store.state.produits.all.find(element => element.id == this.produitId);;
      }
    }
  },
  mounted() {
    this.$store.dispatch('getProducts', {});
  },
  data: () => ({
        editing: false,
        produitId: 0,
        produit: {}
  }),
  async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/login');
    }
  },
  methods: {
    editProduit: function (id) {
      if(id && typeof this.$store.state.produits.all != 'undefined') {
        this.produit = this.$store.state.produits.all.find(element => element.id == id);;
      } else {
        this.produit = {
          nom:""
        }
      }
      this.editing = true;
    }
  }
}
</script>
