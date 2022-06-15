import Axios from 'axios';

const getDefaultState = () => {
  return {
    token: '',
    user: {}
  };
};

const actions = {
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
    localStorage.setItem('accessToken', token);
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
  token: state => {
    return localStorage.getItem('accessToken');
  },
  isLoggedIn: state => {
    return localStorage.getItem('accessToken');
    //return state.token;
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
