import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'
import user from './user'
import notification from "./notification";

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    tab,
    user,
    notification
  }
})
