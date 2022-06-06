import Axios from "axios";

const apiUrl = "https://localhost/api/";

const getDefaultState = () => {
  all: [];
};

const actions = {
  async getClients({ commit, state }) {
    if (!state.all) {
      const products = await Axios.get(apiUrl + "clients")
        .then((response) => {
          return response.data["hydra:member"];
        })
        .catch((error) => {
          throw new Error(`API ${error}`);
        });
      commit("SET_CLIENTS", products);
    }
  },
  async saveClient({ commit, state }, client) {
    if (client.id != undefined) {
      Axios.put(apiUrl + "clients/" + client.id, client)
        .then((response) => {
          commit("SAVE_CLIENT", response.data);
          commit("DISPLAY_SNACKBAR", {message: "Client " + client.nom + " sauvegardé"}, {
            root: true,
          });
        })
        .catch((error) => {
          throw new Error(`API ${error}`);
        });
    } else {
      Axios.post(apiUrl + "clients", client)
        .then((response) => {
          commit("NEW_CLIENT", response.data);
          commit("DISPLAY_SNACKBAR", {
            message: "Client " + client.nom + " créé",
            timeout:4000,
            color:'green'
            }, 
            {root: true}
          );
        })
        .catch((error) => {
          throw new Error(`API ${error}`);
        });
    }
  },
  async deleteClient({ commit, state }, id) {
    Axios.delete(apiUrl + "clients/" + id)
      .then((response) => {
        commit("DELETE_CLIENT", id);
        commit("DISPLAY_SNACKBAR", {
          message: "Client supprimé",
          timeout:4000,
          color:'success'
        }, { root: true });
      })
      .catch((error) => {
        throw new Error(`API ${error}`);
      });
  },
};

const mutations = {
  SET_CLIENTS: (state, clients) => {
    state.all = clients;
  },
  DELETE_CLIENT: (state, id) => {
    //console.log("DELETE_CLIENT", id);
    const index = state.all.findIndex((element) => element.id == id);
    state.all.splice(index, 1);
  },
  SAVE_CLIENT: (state, client) => {
    //console.log("SAVE_CLIENT", client);
    const index = state.all.findIndex((element) => element.id == client.id);
    state.all.splice(index, 1, client);
  },
  NEW_CLIENT: (state, client) => {
    //console.log("NEW_CLIENT", client);
    state.all.push(client);
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
