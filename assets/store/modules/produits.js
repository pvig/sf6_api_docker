import Axios from 'axios';

const url = 'https://localhost/api/';

const getDefaultState = () => {
  all: []
};

const actions = {
  async getProducts ({ commit }) {
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
  }
};

const getters = {
  getProduits: state => {
    return state.produits;
  },
  getProduit: state => {
    return state.produits[id];
  },
};

export default {
  state: getDefaultState(),
  getters,
  actions,
  mutations,
};
