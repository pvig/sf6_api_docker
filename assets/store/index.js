// src/store/index.js

import Vue from 'vue';
import Vuex from 'vuex';
import authModule from './modules/auth';
import produitsModule from './modules/produits';
import clientsModule from './modules/clients';
import ventesModule from './modules/ventes';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const mutations = {
  SET_PRODUITS: (state, produits) => {
    state.all = produits;
  },
  DISPLAY_PROGRESS: (state) => {
    state.progressShow = true;
  },
  HIDE_PROGRESS: (state) => {
    state.progressShow = false;
  },
  DISPLAY_SNACKBAR: (state, newSnack) => {
    state.snackbarText = newSnack.message;
    state.snackbarColor = newSnack.color || "gray";
    state.snackbarTimeout = newSnack.timeout || 2000;
    state.snackbarShow = true;
  },
  SET_SNACKBARSHOW: (state, val) => {
    state.snackbarShow = val;
  },
};

const actions = {
  error: ({ commit, dispatch }, { error }) => {
    console.log("error", dispatch, error);
  },
};

export default new Vuex.Store({
    strict: true,
    state: {
      progressShow:false,
      snackbarShow: false,
      snackbarText: "",
      snackbarColor: "",
      snackbarTimeout: 2000,
    },
    mutations,
    actions,
    //plugins: [createPersistedState()],
    modules: {
        auth: authModule,
        produits: produitsModule,
        clients: clientsModule,
        ventes: ventesModule,
      },
    strict: process.env.NODE_ENV !== 'production',
});