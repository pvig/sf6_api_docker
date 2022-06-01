// src/store/index.js

import Vue from 'vue';
import Vuex from 'vuex';
import authModule from './modules/auth';
import produitsModule from './modules/produits';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    //plugins: [createPersistedState()],
    modules: {
        auth: authModule,
        produits: produitsModule,
      },
    strict: process.env.NODE_ENV !== 'production',
});