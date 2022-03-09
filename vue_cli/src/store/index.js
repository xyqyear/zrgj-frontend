import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'
import notification from './notification'
import orders from './orders'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    tab,
    notification,
    orders
  },
  plugins: [
    createPersistedState({ storage: window.sessionStorage })
  ]
})
