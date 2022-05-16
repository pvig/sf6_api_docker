import Vue from 'vue';
import Home from '../components/Home'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    { path: '/', component: Home, name: 'home' },
    { path: '/signUp', component: SignUp, name: 'signUp'},
    { path: '/login', component: Login, name: 'login'}
]

export default new VueRouter({
    mode: 'history',
    base: '/',
    routes
})
