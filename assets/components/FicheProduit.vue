<template>
  <div class="card">
    <span>id : {{ this.produit.id }}</span>
    <v-form lazy-validation>
      <v-container>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field :value="produit.nom"  @input="update('nom', $event)" label="Nom" required ></v-text-field>
            <v-text-field :value="produit.prixHT" @input="update('prixHT', $event, 'number')"  label="prixHT" ></v-text-field>
            <v-text-field :value="produit.poids" @input="update('poids', $event, 'number')"  label="Poids" ></v-text-field>
            <v-text-field :value="produit.reference" @input="update('reference', $event)"  label="Reference" ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    
  </div>
</template>

<script>
export default {
  props: ['produit'],
  methods: {
    update(key, value, type) {
      if(type=="number") {
        value = parseFloat(value);
      }
      this.$emit('updateProduit', { ...this.value, key: key , value: value})
    },
  },
};
</script>