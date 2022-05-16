import './styles/app.css';

import Vue from 'vue'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import Vuex from 'vuex'
import store from './store';
import router from './router';

Vue.prototype.$http = axios
// set auth header
axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;

Vue.use(Vuex)

const vue2App = new Vue({
    router,
    store,
    vuetify,
    mounted () {
        console.log("mounted");
    }
})

vue2App.$mount('#app');
