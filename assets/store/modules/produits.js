import Axios from 'axios';

const apiUrl = 'https://localhost/api/';

const getDefaultState = () => {
  all: []
};

const actions = {
  async getProducts({ commit }) {
    console.log("getProducts");
    const products = await Axios
      .get(apiUrl + 'produits')
      .then((response) => {
        return response.data["hydra:member"];
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
      commit('SET_PRODUITS', products)
  },
  async saveProduit({ commit, state }, produit) {
    console.log("saveProduct");

    const product = await Axios.put(apiUrl + 'produits/' + produit.id, produit).then(response => {
      console.log("ok", response);
      commit('SAVE_PRODUIT', response.data);
      commit('DISPLAY_SNACKBAR', "Produit sauvegardé", { root: true });
    }).catch(error => {
      throw new Error(`API ${error}`);
    });
    //console.log("saveProduit", product);
  }
};

const mutations = {
  SET_PRODUITS: (state, produits) => {
    state.all = produits;
  },
  SAVE_PRODUIT: (state, produit) => {
    console.log("SAVE_PRODUIT", produit);
    if (produit.id) {
      const index = state.all.findIndex(element => element.id == produit.id)
      state.all.splice(index, 1, produit);
      console.log("SAVE_PRODUIT", produit.nom, state.all[index]);
    } else {
      console.log("save new produit");
      Axios.post(apiUrl + 'produits', produit).then(response => {
        console.log("ok", response);
      });
    }
  },
};

const getters = {
  listeProduits: state => state.all,
  getProduit: state => (id) => {
    let produit = state.all[id];
    if (!produit.nn) produit.nn = 0;
    return produit;
  },
};

export default {
  state: getDefaultState(),
  getters,
  actions,
  mutations,
  namespaced: true
};
