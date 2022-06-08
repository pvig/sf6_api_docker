<template>
<v-row justify="center">
    <v-dialog
      v-model="editing"
      persistent
      max-width="800"
    >
      <v-card class="editBox">

          <div class="card">
            <span>id : {{ this.localVente.id }}</span>
            <v-form ref="form" @submit.prevent="validate" id="vente-form">
              <v-container>
                <v-row>
                  <v-col cols="12" md="12">
                    <v-autocomplete
                    v-model="client"
                    :loading="loading"
                    :items="clients"
                    :search-input.sync="search"
                    cache-items
                    class="mx-4"
                    flat
                    hide-no-data
                    hide-details
                    label="Choisissez un client"
                    solo-inverted
                    ></v-autocomplete>
                    <v-text-field :value="localVente.client"  @input="update('client', $event)" label="Client" :rules="rules.required" ></v-text-field>

                    <v-spacer></v-spacer>
                    
                    <v-autocomplete
                    v-model="produit"
                    :loading="loading"
                    :items="produits"
                    :search-input.sync="search"
                    cache-items
                    class="mx-4"
                    flat
                    hide-no-data
                    hide-details
                    label="Ajouter un produit"
                    solo-inverted
                  ></v-autocomplete>

                    <v-simple-table dense>
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-left">
                                Nom
                              </th>
                              <th class="text-left">
                                Quantité
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="item in produits"
                              :key="item.name"
                            >
                              <td>{{ item.nom }}</td>
                              <td>{{ item.quantite }}</td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>

                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </div>

          <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed @click="closeMe()" :disabled="saving">
            Annuler
          </v-btn>
          <v-btn depressed type="submit" form="vente-form" :loading="saving">
            Sauvegarder
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-row>
</template>

<script>
export default {
  name:"ficheVente",
  props: ['editVenteId', 'editNewVente'],
  data: () => ({
    editing:false,
    saving:false,
    localVente: {},
    rules: {},
    client: {},
    clients: [],
    produit: {},
    produits: []
  }),
  watch: {
   '$store.state.ventes.all': function() {
      this.saving = false;
      this.closeMe();
    },
    'editVenteId': function () {
      if(this.editVenteId) {
        this.editVente(this.editVenteId);
      }
    },
    'editNewVente': function () {
      if(this.editNewVente) {
        this.editVente();
      }
    },
  },
  methods: {
    validate() {
      this.rules = {
        prix: [  v => (v && (parseFloat(v) == v)) || 'Le prix doit être un chiffre'  ],
        required: [v => !!v || 'Required']
      }
      this.$nextTick(() => {
        if (this.$refs.form.validate()) {
          this.saveVente();
        }
      });
    },
    update(key, value, type) {
      if(type=="number") {
        value = parseFloat(value);
      }
      this.updateVenteAtribute({ ...this.value, key: key , value: value});
    },
    editVente: function (id) {
      if(id && typeof this.$store.state.ventes.all != 'undefined') {
        this.localVente = {...this.$store.state.ventes.all.find(element => element.id == id)};
      } else {
        this.localVente = {
          nom:""
        }
      }
      this.rules = {};
      this.editing = true;
    },
    updateVenteAtribute(val) {
      this.localVente[val.key] = val.value;
    },
    saveVente(e) {
      this.saving = true;
      this.$nextTick(() => {
        this.$store.dispatch('ventes/saveVente', this.localVente);
      });
    },
    closeMe() {
      this.editing = false;
      this.$emit('editDone', this.localVente)
    }
  },
};
</script>