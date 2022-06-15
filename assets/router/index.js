import Vue from 'vue';
import Home from '../views/Home'
import Login from '../views/Login'
import SignUp from '../views/SignUp'
import Clients from '../views/Clients'
import Ventes from '../views/Ventes'
import Produits from '../views/Produits'
import VueRouter from 'vue-router';

Vue.use(VueRouter)

const routes = [
    { path: '/', component: Home, name: 'home' },
    { path: '/signUp', component: SignUp, name: 'signUp'},
    { path: '/login', component: Login, name: 'login'},
    { path: '/clients', component: Clients, name: 'clients'},
    { path: '/ventes', component: Ventes, name: 'ventes'},
    { path: '/produits', component: Produits, name: 'produits'}
]


const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return new Promise((resolve, reject) => {
    originalPush.call(this, location, () => {
      // on complete

      resolve(this.currentRoute);
    }, (error) => {
      // on abort

      // only ignore NavigationDuplicated error
      if (error.name === 'NavigationDuplicated') {
        resolve(this.currentRoute);
      } else {
        reject(error);
      }
    });
  });
};

export default new VueRouter({
    mode: 'history',
    base: '/',
    routes
})
