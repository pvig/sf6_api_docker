import Axios from "axios";

const apiUrl = "https://localhost/api/";

const getDefaultState = () => {
  all: [];
};

const actions = {
  async getVentes({ commit, state }) {
    if (!state.all) {
      const products = await Axios.get(apiUrl + "ventes").then((response) => {
        return response.data["hydra:member"];
      });
      commit("SET_VENTES", products);
    }
  },
  async saveVente({ commit, state }, vente) {
    if (vente.id != undefined) {
      Axios.put(apiUrl + "ventes/" + vente.id, vente).then((response) => {
        commit("SAVE_VENTE", response.data);
        commit(
          "DISPLAY_SNACKBAR",
          { message: "Vente " + vente.id + " sauvegardé" },
          { root: true }
        );
      });
    } else {
      Axios.post(apiUrl + "ventes", vente).then((response) => {
        commit("NEW_VENTE", response.data);
        commit(
          "DISPLAY_SNACKBAR",
          { message: "Vente " + vente.nom + " créé" },
          { root: true }
        );
      });
    }
  },
  async deleteVente({ commit, state }, id) {
    Axios.delete(apiUrl + "ventes/" + id).then((response) => {
      commit("DELETE_VENTE", id);
      commit(
        "DISPLAY_SNACKBAR",
        { message: "Vente supprimée" },
        { root: true }
      );
    });
  },
};

const mutations = {
  SET_VENTES: (state, ventes) => {
    state.all = ventes;
  },
  DELETE_VENTE: (state, id) => {
    const index = state.all.findIndex((element) => element.id == id);
    state.all.splice(index, 1);
  },
  SAVE_VENTE: (state, vente) => {
    const index = state.all.findIndex((element) => element.id == vente.id);
    state.all.splice(index, 1, vente);
  },
  NEW_VENTE: (state, vente) => {
    state.all.push(vente);
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
