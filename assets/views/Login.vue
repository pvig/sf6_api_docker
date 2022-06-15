// src/views/Login.vue
<template>

  <v-container fluid fill-height id="login-page">
    <v-layout align-center justify-center>
      <v-flex :style="{ 'max-width': '350px' }">
        <v-card>
          <v-card-text>
            <div class="text-center mb-4">
              {{ message }}
            </div>
            <transition name="fade" mode="out-in">

              <v-form ref="form" @submit.prevent="validate">
                <v-text-field label="Email" prepend-icon="mdi-account" v-model="form.email" :rules="rules.email">
                </v-text-field>

                <v-text-field label="Mot de passe" prepend-icon="mdi-lock" type="password" v-model="form.password"
                  :rules="rules.password"></v-text-field>

                <div class="text-center">
                  <v-btn :loading="loading" color="primary" large type="submit" text rounded>Se connecter</v-btn>
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
      message: "Connection",
      form: {
        email: null,
        password: null,
      },
      rules: {},
      loading: false,
    };
  },
  methods: {
    validate() {
      this.rules = {
        email: [v => !!v || 'Required'],
        password: [v => !!v || 'Required']
      }
      this.$nextTick(() => {
        if (this.$refs.form.validate()) {
          this.loading = true;
          this.login(this.form);
        }
      });
    },
    async login(form) {
      try {
        const credentials = {
          email: form.email,
          password: form.password
        };
        const response = await AuthService.login(credentials);
        this.loading = false;
        this.message = response.msg;
        const token = response.token;
        const user = {
          email: response.email,
          username: response.username
        };
        this.$store.dispatch('login', { token, user });
        console.log("login dispatch done");
        this.$router.push('/');
        console.log("router.push ok");
      } catch (error) {
        this.loading = false;
        if (error.response.status == 401) {
          this.message = "Mauvais login/mot de passe";
        } else {
          this.message = error.message;
        }
      }
    }
  }
};
</script>