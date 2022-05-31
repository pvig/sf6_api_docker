<template>
  <div class="card">

    <h1>{{ this.produit.nom }}</h1>
    <span>id : {{ this.produit.id }}</span>
    <v-form >
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="12"
          >
            <v-text-field :value="produit.nom"  @input="update('nom', $event)" label="Nom"  required ></v-text-field>
            <v-text-field :value="produit.prixHT" @input="update('prixHT', $event)"  label="prixHT"  ></v-text-field>
            <v-text-field :value="produit.poids" @input="update('poids', $event)"  label="Poids"  ></v-text-field>
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
  max-width:250px;text-align:center;
  margin:2rem auto;padding:.6rem .8rem;
  border: .1rem solid #94A3B8;color:#64748B;
}
</style>
