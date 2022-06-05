// src/store/index.js

import Vue from 'vue';
import Vuex from 'vuex';
import authModule from './modules/auth';
import produitsModule from './modules/produits';
import clientsModule from './modules/clients';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const mutations = {
  SET_PRODUITS: (state, produits) => {
    state.all = produits;
  },
  DISPLAY_SNACKBAR: (state, message) => {
    state.snackbar = true;
    state.snackbarText = message;
  },
  SET_SNACKBAR: (state, val) => {
    state.snackbar = val;
  },
};

export default new Vuex.Store({
    strict: true,
    state: {
      snackbar: { active: false, color: "", message: "" },
      snackbarTimeout: 2000,
      snackbar: false,
      snackbarText: "",
    },
    actions: {
      snackBar({ commit }, message) {
          commit("SET_SNACKBAR", {
            active: true,
            color: "success", // You can create another actions for diferent color.
            message: message
          });
        }
    },
    mutations,
    //plugins: [createPersistedState()],
    modules: {
        auth: authModule,
        produits: produitsModule,
        clients: clientsModule
      },
    strict: process.env.NODE_ENV !== 'production',
});