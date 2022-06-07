import Axios from "axios";

const apiUrl = "https://localhost/api/";

const getDefaultState = () => {
  all: [];
};

const actions = {
  async getProducts({ commit, state }) {
    if (!state.all) {
      const products = await Axios.get(apiUrl + "produits")
        .then((response) => {
          return response.data["hydra:member"];
        })
        .catch((error) => {
          throw new Error(`API ${error}`);
        });
      commit("SET_PRODUITS", products);
    }
  },
  async saveProduit({ commit, state }, produit) {
    if (produit.id != undefined) {
      Axios.put(apiUrl + "produits/" + produit.id, produit)
        .then((response) => {
          commit("SAVE_PRODUIT", response.data);
          commit("DISPLAY_SNACKBAR", {
              message: "Produit " + produit.nom + " sauvegardé",
              color:'green'
            }, 
            {root: true});
        })
        .catch((error) => {
          throw new Error(`API ${error}`);
        });
    } else {
      Axios.post(apiUrl + "produits", produit)
        .then((response) => {
          commit("NEW_PRODUIT", response.data);
          commit("DISPLAY_SNACKBAR", {
            message: "Produit " + produit.nom + " créé",
          }, {
            root: true,
          });
        })
        .catch((error) => {
          throw new Error(`API ${error}`);
        });
    }
  },
  async deleteProduit({ commit, state }, id) {
    Axios.delete(apiUrl + "produits/" + id)
      .then((response) => {
        commit("DELETE_PRODUIT", id);
        commit("DISPLAY_SNACKBAR", {
          message: "Produit supprimé",
        }, { root: true });
      })
      .catch((error) => {
        throw new Error(`API ${error}`);
      });
  },
};

const mutations = {
  SET_PRODUITS: (state, produits) => {
    state.all = produits;
  },
  DELETE_PRODUIT: (state, id) => {
    //console.log("DELETE_PRODUIT", id);
    const index = state.all.findIndex((element) => element.id == id);
    state.all.splice(index, 1);
  },
  SAVE_PRODUIT: (state, produit) => {
    //console.log("SAVE_PRODUIT", produit);
    const index = state.all.findIndex((element) => element.id == produit.id);
    state.all.splice(index, 1, produit);
  },
  NEW_PRODUIT: (state, produit) => {
    //console.log("NEW_PRODUIT", produit);
    state.all.push(produit);
  },
};

const getters = {};

export default {
  state: getDefaultState(),
  getters,
  actions,
  mutations,
  namespaced: true,
};
