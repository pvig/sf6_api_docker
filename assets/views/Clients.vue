<template>
  <div>
    <h1>Clients</h1>

    <v-list>
        <v-list-item
          v-for="client in listeClients"
          :key="client.nom"
          :lien="'/client/' + client.id"
        >
          <v-list-item-content>
            <v-list-item-title v-text="client.nom" ></v-list-item-title>
          </v-list-item-content>
          <v-icon small class="mr-2" @click="editClient(client.id)">mdi-pencil</v-icon>
          <v-icon small @click="dialogDeleteClient(client.id)">mdi-delete</v-icon>
        </v-list-item>

    </v-list>

    <v-btn depressed @click="editClient()">
      Ajouter un client
    </v-btn>

    <v-row justify="center">
    <v-dialog
      v-model="editing"
      persistent
      max-width="800"
    >
      <v-card class="editBox">
        <FicheClient :client="this.localClient" @updateClient="updateClientAtribute"></FicheClient>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed @click="editing = false">
            Annuler
          </v-btn>
          <v-btn depressed @click="saveClient()">
            Sauvegarder
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="confirmDeleteClient"
      max-width="800"
    >
      <v-card class="editBox">
        <v-card-actions>
          Supprimer ce produit ?
          <v-spacer></v-spacer>
          <v-btn depressed @click="confirmDeleteClient = false">
            Annuler 
          </v-btn>
          <v-btn depressed @click="deleteClient()">
            Supprimer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  <SnackBar/>
</div>
</template>

<script>
import FicheClient from '../components/FicheClient.vue'
import SnackBar from '../components/SnackBar.vue'

export default {
  name: 'Clients',
  components: {
    FicheClient,
    SnackBar
  },
  mounted() {
    this.$store.dispatch('clients/getClients').then(() => {
      this.listeClients = this.$store.state.clients.all;
    });
  },
  computed: {
  },
  data: () => ({
        listeClients: {},
        editing: false,
        confirmDeleteClient: false,
        localClient: {},
  }),
  async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/login');
    }
  },
  methods: {
    editClient: function (id) {
      if(id && typeof this.$store.state.clients.all != 'undefined') {
        this.localClient = {...this.$store.state.clients.all.find(element => element.id == id)};
      } else {
        this.localClient = {
          nom:""
        }
      }
      this.editing = true;
    },
    dialogDeleteClient: function (id) {
      this.localClient = {...this.$store.state.clients.all.find(element => element.id == id)};
      this.confirmDeleteClient = true;
    },
    deleteClient: function () {
       this.$store.dispatch('clients/deleteClient', this.localClient.id);
       this.confirmDeleteClient = false;
    },
    updateClientAtribute(val) {
      this.localClient[val.key] = val.value;
    },
    saveClient(e) {
      this.$store.dispatch('clients/saveClient', this.localClient);
      this.editing = false;
    }
  }
}
</script>