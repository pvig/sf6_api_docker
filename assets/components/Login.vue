// src/views/Login.vue
<template>

    <v-container fluid fill-height id="login-page">
      <v-layout align-center justify-center>
        <v-flex :style="{ 'max-width': '350px' }">
          <v-card>
            <v-card-text>
              <div class="text-center mb-4">
                Connection
              </div>

              <transition name="fade" mode="out-in">

                <v-form ref="form" @submit.prevent="validate">
                  <v-text-field
                    label="Email"
                    prepend-icon="mdi-account"
                    v-model="form.email"
                    required
                    :error-messages="errorMessages.email"
                  ></v-text-field>

                  <v-text-field
                    label="Mot de passe"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="form.password"
                    required
                  ></v-text-field>

                  <div class="text-center">
                    <v-btn
                      :loading="loading"
                      color="primary"
                      large
                      type="submit"
                      text
                      rounded
                      >Se connecter</v-btn
                    >
                  </div>
                </v-form>

              </transition>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    


</template>

<script>
import AuthService from '../services/AuthService.js';

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessages: {},
      form: {
        email: null,
        password: null,
      },
      loading: false,
    };
  },
  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        await this.login(this.form);
        this.loading = false;
      }
    },
    async login(form) {
      try {
        const credentials = {
          email: form.email,
          username: form.email,
          password: form.password
        };
        const response = await AuthService.login(credentials);
        this.msg = response.msg;
        const token = response.token;
        const user = {
          email: response.email,
          username: response.username
        };
        this.$store.dispatch('login', { token, user });
        this.$router.push('/');
      } catch (error) {
        console.log("error", error)
        this.msg = error.response.data.msg;
      }
    }
  }
};
</script>