// src/store/index.js

import Vue from 'vue';
import Vuex from 'vuex';
import authModule from './modules/auth';
import produitsModule from './modules/produits';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const mutations = {
  SET_PRODUITS: (state, produits) => {
    state.all = produits;
  },
  DISPLAY_SNACKBAR: (state, message) => {
    console.log("DISPLAY_SNACKBAR", message);
    state.snackbar = true;
    state.snackbarText = message;
  },
  SET_SNACKBAR: (state, val) => {
    console.log("SET_SNACKBAR", val);
    state.snackbar = val;
  },
};

export default new Vuex.Store({
    strict: true,
    state: {
      snackbarTimeout: 2000,
      snackbar: false,
      snackbarText: "snackbarText test",
    },
    mutations,
    //plugins: [createPersistedState()],
    modules: {
        auth: authModule,
        produits: produitsModule,
      },
    strict: process.env.NODE_ENV !== 'production',
});