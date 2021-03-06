import Axios from 'axios';

const getDefaultState = () => {
  return {
    token: '',
    user: {}
  };
};

const actions = {
  async update({ commit, state }) {
    Axios.put(apiUrl + "users/" + user.id, vente)
    .then((response) => {
      commit("SET_USER", response.data);
      commit("DISPLAY_SNACKBAR", {
          message: "Sauvegarde ok",
        }, 
        {root: true});
    })
    .catch((error) => {
      throw new Error(`API ${error}`);
    });
  },
  login: ({ commit, dispatch }, { token, user }) => {
    commit('SET_TOKEN', token);
    commit('SET_USER', user);
    // set auth header
    Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },
  logout: ({ commit }) => {
    commit('RESET', '');
  },
};

const mutations = {
  LOGIN_DONE: (state, user) => {
    state.user = user;
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
    Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },
  SET_USER: (state, user) => {
    state.user = user;
  },
  RESET: state => {
    Object.assign(state, getDefaultState());
    localStorage.removeItem('accessToken');
  }
};

const getters = {
  isLoggedIn: state => {
    return state.token;
  },
  getUser: state => {
    return state.user;
  }
};

export default {
  state: getDefaultState(),
  getters,
  actions,
  mutations
};
