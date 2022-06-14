<template>
  <div>
    <h1>Clients</h1>

    <v-list>
        <v-progress-linear v-show="isLoading" indeterminate color="blue-grey"></v-progress-linear>
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

    <v-btn depressed @click="newClient()">
      Ajouter un client
    </v-btn>

    <FicheClient :editClientId="this.editClientId" :editNewClient="this.editNewClient" @editDone="editDone"></FicheClient>

    <v-dialog
      v-model="confirmDeleteClient"
      max-width="800"
    >
      <v-card class="editBox">
        <v-card-actions>
          Supprimer ce client ?
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

    <SnackBar/>
    <Progress></Progress>
</div>
</template>

<script>
import FicheClient from '../components/FicheClient.vue'
import SnackBar from '../components/SnackBar.vue'
import Progress from '../components/Progress.vue'

export default {
  name: 'Clients',
  components: {
    FicheClient,
    SnackBar,
    Progress
  },
  mounted() {
    this.$store.dispatch('clients/getClients').then(() => {
      this.listeClients = this.$store.state.clients.all;
      this.isLoading = false;
    });
  },
  computed: {
  },
  data: () => ({
    isLoading: true,
    listeClients: {},
    editClientId: null,
    editNewClient: false,
    confirmDeleteClient: false,
    clientToDeleteId: false
  }),
  async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/login');
    }
  },
  methods: {
    editClient: function (id) {
      this.editClientId = id;
    },
    newClient: function () {
      this.editNewClient = true;
    },
    dialogDeleteClient: function (id) {
      this.clientToDeleteId = id;
      this.confirmDeleteClient = true;
    },
    deleteClient: function () {
       this.$store.dispatch('clients/deleteClient', this.clientToDeleteId);
       this.confirmDeleteClient = false;
    },
    editDone: function(client) {
      this.editClientId = null;
      this.editNewClient = false;
    }
  }
}
</script>