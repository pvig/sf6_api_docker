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
                    <v-text-field :value="localVente.nom"  @input="update('nom', $event)" label="Nom" :rules="rules.required" ></v-text-field>
                    <v-text-field :value="localVente.prixHT" @input="update('prixHT', $event, 'number')"  label="prixHT" type="number" step="0.01" :rules="rules.prix"></v-text-field>
                    <v-text-field :value="localVente.poids" @input="update('poids', $event, 'number')"  label="Poids" ></v-text-field>
                    <v-text-field :value="localVente.reference" @input="update('reference', $event)"  label="Reference" ></v-text-field>
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