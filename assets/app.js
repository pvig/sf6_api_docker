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
import VueApexCharts from 'vue-apexcharts'

Vue.prototype.$http = axios;

Vue.use(Vuex);
Vue.use(filters);
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)

Vue.mixin({
  methods: {
    clone: function (items) { items.map(item => Array.isArray(item) ? clone(item) : item) }
  },
})
/* Request Interceptors */
const interceptReqErrors = (err) => Promise.reject(err);
const interceptRequest = (config) => {
  if (config.method == "post" || config.method == "put" || config.method == "delete") {
    store.commit("DISPLAY_PROGRESS");
  }
  return config;
};

/* Response Interceptors */
const interceptResponse = (response) => {
  if (response.config.method == "post" || response.config.method == "put" || response.config.method == "delete") {
    store.commit("HIDE_PROGRESS");
  }
  return response;
};
const interceptResErrors = (error) => {
  store.commit("HIDE_PROGRESS");
  switch (error.response.status) {
    case 401:
      if (error.response.status === 401) {
        store.dispatch("logout");
        router.push("/login");
      }
      store.dispatch("error", error);
      return Promise.reject(error);
    case 403:
      console.log("error", error);
      store.commit(
        "DISPLAY_SNACKBAR",
        {
          message: error.response.data["hydra:description"],
          color: "error",
          timeout: 5000,
        },
        { root: true }
      );
      return Promise.reject(error);
    default:
      throw new Error(`API ${error}`);
  }
};

axios.interceptors.request.use(interceptRequest, interceptReqErrors);
axios.interceptors.response.use(interceptResponse, interceptResErrors);

/* ---------------------------------- */

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
    if (!this.$store.getters.isLoggedIn && this.$route.name != "signUp") {
      this.$router.push("/login");
    }
  },
  data() {
    return {
      drawer: false,
      mini: true,
      isLoading: false,
      menuItems: {
        navigation: [
          {
            path: "/",
            title: "Accueil",
            action: this.noaction,
            icon: "mdi-view-dashboard",
          },
          {
            path: "/clients",
            title: "Clients",
            action: this.noaction,
            icon: "mdi-account-box-multiple",
          },
          {
            path: "/produits",
            title: "Produits",
            action: this.noaction,
            icon: "mdi-apple",
          },
          {
            path: "/ventes",
            title: "Ventes",
            action: this.noaction,
            icon: "mdi-clipboard-outline",
          },
        ],
        user: [
          {
            path: "/compte",
            title: "Mon compte",
            action: this.noaction,
          },
          {
            path: "/login",
            title: "Deconnexion",
            action: this.logout,
          },
        ],
        extra: [
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
    noaction() { },
    logout() {
      store.dispatch("logout");
    },
    refresh() {
      location.reload();
    },
    closedrawer() {
      this.mini = true;
    }
  },
});

vue2App.$mount("#app");
