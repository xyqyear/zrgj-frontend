import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'
import notification from './notification'
import orders from './orders'
import restaurant from './restaurant'
import queue from './queue'
import dish from './dish'
import websocket from './websocket'

import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    tab,
    notification,
    orders,
    restaurant,
    queue,
    dish,
    websocket
  },
  plugins: [
    createPersistedState({ storage: window.sessionStorage })
  ]
})
