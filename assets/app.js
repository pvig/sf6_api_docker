import "./styles/app.css";

import Vue from "vue";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import Vuex from "vuex";
import store from "./store";
import router from "./router";
import SnackBar from "./components/SnackBar";
import Progress from "./components/Progress";
import filters from "./filters";

Vue.prototype.$http = axios;

Vue.use(Vuex);
Vue.use(filters);

axios.interceptors.request.use(function (config) {
  if (config.method == "post" || config.method == "put") {
    store.commit("DISPLAY_PROGRESS");
  }
  return config;
});

axios.interceptors.response.use(
  (response) => {
    if (response.config.method == "post" || response.config.method == "put") {
      store.commit("HIDE_PROGRESS");
    }
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      store.dispatch("logout");
      router.push("/login");
    }
    store.dispatch("error", error);
    return Promise.reject(error);
  }
);

const vue2App = new Vue({
  router,
  store,
  vuetify,
  components: {
    SnackBar,
    Progress,
  },
  mounted() {
    const token = localStorage.getItem("accessToken");
    if (token) {
      store.commit("SET_TOKEN", token);
    }
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push("/login");
    }
  },
  data() {
    return {
      drawer: false,
      menuItems: {
        navigation: [
          {
            path: "/",
            title: "Accueil",
            action: this.noaction,
          },
          {
            path: "/clients",
            title: "Clients",
            action: this.noaction,
          },
          {
            path: "/ventes",
            title: "Ventes",
            action: this.noaction,
          },
          {
            path: "/produits",
            title: "Produits",
            action: this.noaction,
          },
        ],
        user: [
          {
            path: "/login",
            title: "Deconnexion",
            action: this.logout,
          },
          {
            path: "/api/",
            title: "API",
            action: this.refresh,
          },
        ],
      },
    };
  },
  methods: {
    home() {
      this.$router.push("/");
    },
    noaction() {},
    logout() {
      store.dispatch("logout");
    },
    refresh() {
      location.reload();
    },
  },
});

vue2App.$mount("#app");
