<template>
<v-row justify="center">
    <v-dialog
      v-model="editing"
      persistent
      max-width="800"
    >
      <v-card class="editBox">

          <div class="card">
            <span>id : {{ this.localProduit.id }}</span>
            <v-form ref="form" @submit.prevent="validate" id="produit-form">
              <v-container>
                <v-row>
                  <v-col cols="12" md="12">
                    <v-text-field :value="localProduit.nom"  @input="update('nom', $event)" label="Nom" :rules="rules.required" ></v-text-field>
                    <v-text-field :value="localProduit.prixHT" @input="update('prixHT', $event, 'number')"  label="prixHT" type="number" step="0.01" :rules="rules.prix"></v-text-field>
                    <v-text-field :value="localProduit.poids" @input="update('poids', $event, 'number')"  label="Poids" ></v-text-field>
                    <v-text-field :value="localProduit.reference" @input="update('reference', $event)"  label="Reference" ></v-text-field>
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
          <v-btn depressed type="submit" form="produit-form" :loading="saving">
            Sauvegarder
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-row>
</template>

<script>
export default {
  name:"ficheProduit",
  props: ['editProduitId', 'editNewProduit'],
  data: () => ({
    editing:false,
    saving:false,
    localProduit: {},
    rules: {},
  }),
  watch: {
   '$store.state.produits.all': function() {
      this.saving = false;
      this.closeMe();
    },
    'editProduitId': function () {
      if(this.editProduitId) {
        this.editProduit(this.editProduitId);
      }
    },
    'editNewProduit': function () {
      if(this.editNewProduit) {
        this.editProduit();
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
          this.saveProduit();
        }
      });
    },
    update(key, value, type) {
      if(type=="number") {
        value = parseFloat(value);
      }
      this.updateProduitAtribute({ ...this.value, key: key , value: value});
    },
    editProduit: function (id) {
      if(id && typeof this.$store.state.produits.all != 'undefined') {
        this.localProduit = {...this.$store.state.produits.all.find(element => element.id == id)};
      } else {
        this.localProduit = {
          nom:""
        }
      }
      this.rules = {};
      this.editing = true;
    },
    updateProduitAtribute(val) {
      this.localProduit[val.key] = val.value;
    },
    saveProduit(e) {
      this.saving = true;
      this.$nextTick(() => {
        this.$store.dispatch('produits/saveProduit', this.localProduit);
      });
    },
    closeMe() {
      this.editing = false;
      this.$emit('editDone', this.localProduit)
    }
  },
};
</script>