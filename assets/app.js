import './styles/app.css';

import Vue from 'vue'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import Vuex from 'vuex'
import store from './store';
import router from './router';

Vue.prototype.$http = axios
// set auth header
axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;

Vue.use(Vuex)

const vue2App = new Vue({
    router,
    store,
    vuetify,
    mounted () {
        console.log("mounted");
    },
    data() {
        return {
          drawer: false,
          items: [
            {
              path: "/",
              title: "Accueil",
              action: this.noaction
            },
            {
                path: "/clients",
                title: "Clients",
                action: this.noaction
            },
            {
                path: "/commandes",
                title: "Commandes",
                action: this.noaction
            },
            {
                path: "/produits",
                title: "Produits",
                action: this.noaction
            },
            {
              path: "/login",
              title: "Deconnection",
              action: this.logout
            }
          ]
        };
      },
      methods: {
        noaction() {},
        logout() {
          this.$store.dispatch('logout');
        }
    }
})

vue2App.$mount('#app');
