import Axios from 'axios';

const url = 'https://localhost/api/';

const getDefaultState = () => {
  all: []
};

const actions = {
  async getProducts ({ commit }) {
      console.log("getProducts");
      const products = await Axios
      .get(url + 'produits')
      .then((response) => {
          return response.data["hydra:member"];
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
      commit('SET_PRODUITS', products)
  }
};

const mutations = {
  SET_PRODUITS: (state, produits) => {
    state.all = produits;
  },
  SAVE_PRODUIT: (state, produit) => {
    if(produit.id) {
      const index = state.all.findIndex(element => element.id == produit.id)
      state.all[index] = produit;
      Axios.put(url + 'produits/' + produit.id, produit).then(response => {
          console.log("ok", response);
      });

      console.log("SAVE_PRODUIT", produit.nom, state.all[index] );
    } else {
      console.log("save new produit");
      Axios.post(url + 'produits', produit).then(response => {
        console.log("ok", response);
      });
    }
  },
};

const getters = {
  getProduits: state => {
    return state.produits;
  },
  getProduit: state => (id) => {
    return state.produits[id];
  },
};

export default {
  state: getDefaultState(),
  getters,
  actions,
  mutations,
};
