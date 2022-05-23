import Axios from 'axios';

const getDefaultState = () => {
    return {
        "id": null,
        "nom": "",
        "prixHT": 0,
        "poids": 0,
        "reference": ""
    };
};

const actions = {
    getAllProduct: ({ commit, dispatch }, {}) => {
        Axios.get("")
        .then(function() {
            console.log("getAll");
        })
       .catch(error => {
            console.log("error", error);
        })
    },
};

const mutations = {
  SET_NOM: (state, nom) => {
    state.nom = nom;
  },
  SET_PRIXHT: (state, prixht) => {
    state.prixht = prixht;
  },
  SET_POIDS: (state, poids) => {
    state.poids = poids;
  },
  SET_REFERENCE: (state, reference) => {
    state.reference = reference;
  },
  RESET: state => {
    Object.assign(state, getDefaultState());
  }
};

const getters = {
  getNom: state => {
    return state.nom;
  },
  getPrixht: state => {
    return state.prixht;
  },
  getPoids: state => {
    return state.poids;
  },
  getReference: state => {
    return state.reference;
  },
};

export default {
  state: getDefaultState(),
  getters,
  actions,
  mutations,
};
