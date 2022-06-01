<template>
  <div class="card">
    <span>id : {{ this.produit.id }}</span>
    <v-form >
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="12"
          >
            <v-text-field :value="produit.nom"  @input="update('nom', $event)" label="Nom"  required ></v-text-field>
            <v-text-field :value="produit.prixHT" @input="update('prixHT', $event)"  label="prixHT"  type="number"></v-text-field>
            <v-text-field :value="produit.poids" @input="update('poids', $event)"  label="Poids"  type="number"></v-text-field>
            <v-text-field :value="produit.reference" @input="update('reference', $event)"  label="Reference"  ></v-text-field>
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
    update(key, value) {
      this.$emit('updateProduit', { ...this.value, key: key , value: value})
    },
  },
};
</script>

<style>
.card {
  max-width:500px;
  text-align:center;
  margin:2rem auto;
  padding:1rem .8rem;
  border: .1rem solid #94A3B8;
  color:#64748B;
}
</style>
