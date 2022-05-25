<template>
  <div class="card">
    <h1>{{ this.produit.nom }}</h1>
    <ul>
      <li>id : {{ this.produit.id }}</li>
      <li>nom : {{ this.produit.nom }}</li>
      <li>prixHT : {{ this.produit.prixHT }}</li>
      <li>poids : {{ this.produit.poids }}</li>
      <li>reference : {{ this.produit.reference }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['produit']
}
</script>

<style>
.card {
  max-width:250px;text-align:center;
  margin:2rem auto;padding:.6rem .8rem;
  border: .1rem solid #94A3B8;color:#64748B;
}
</style>
