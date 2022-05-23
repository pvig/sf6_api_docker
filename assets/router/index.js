import Vue from 'vue';
import Home from '../views/Home'
import Login from '../views/Login'
import SignUp from '../views/SignUp'
import Clients from '../views/Clients'
import Commandes from '../views/Commandes'
import Produits from '../views/Produits'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    { path: '/', component: Home, name: 'home' },
    { path: '/signUp', component: SignUp, name: 'signUp'},
    { path: '/login', component: Login, name: 'login'},
    { path: '/clients', component: Clients, name: 'clients'},
    { path: '/commandes', component: Commandes, name: 'commandes'},
    { path: '/produits', component: Produits, name: 'produits'},
]

export default new VueRouter({
    mode: 'history',
    base: '/',
    routes
})
