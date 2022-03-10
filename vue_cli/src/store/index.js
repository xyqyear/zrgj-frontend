import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'
import notification from './notification'
import orders from './orders'
import restaurant from './restaurant'
import queue from './queue'

import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    tab,
    notification,
    orders,
    restaurant,
    queue
  },
  plugins: [
    createPersistedState({ storage: window.sessionStorage })
  ]
})
