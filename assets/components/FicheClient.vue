<template>
  <div class="card">
    <span>id : {{ this.client.id }}</span>
    <v-form lazy-validation>
      <v-container>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field :value="client.nom"  @input="update('nom', $event)" label="Nom" required ></v-text-field>
            <v-text-field :value="client.prenom"  @input="update('prenom', $event)" label="Prenom" required ></v-text-field>
            <v-text-field :value="client.email"  @input="update('email', $event)" label="Email" required ></v-text-field>
            <v-text-field :value="client.dateCommande1"  @input="update('dateCommande1', $event)" label="dateCommande1" required ></v-text-field>
            <v-text-field :value="client.dateLastCommande"  @input="update('dateLastCommande', $event)" label="dateLastCommande" required ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  props: ['client'],
  methods: {
    update(key, value, type) {
      if(type=="number") {
        value = parseFloat(value);
      }
      this.$emit('updateClient', { ...this.value, key: key , value: value})
    },
  },
};
</script>