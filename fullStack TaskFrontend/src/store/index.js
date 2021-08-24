import Vue from 'vue'
import Vuex from 'vuex'

// loading modules
import Auth from './modules/Auth';
import Category from './modules/Category';
import Attribute from './modules/Attribute';
import Product from './modules/Product';
import Seller from './modules/Seller';
import Client from './modules/Client';
import Subscriber from './modules/Subscriber';
import Admin from './modules/Admin';
import Role from './modules/Role';
import Permission from './modules/Permission';

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      Auth,
      Category,
      Attribute,
      Product,
      Seller,
      Client,
      Subscriber,
      Admin,
      Role,
      Permission
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
