import Vue from 'vue'
import Vuex from 'vuex'

// loading modules
import Auth from './modules/Auth';
import PerformanceReivew from './modules/PerformanceReview';
import FeedBackRequest from './modules/FeedBackRequest';
import User from './modules/User';

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
      PerformanceReivew,
      FeedBackRequest,
      User
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
