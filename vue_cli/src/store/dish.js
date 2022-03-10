import { getAllFood, getObjectMap } from '../../api/data'

export default {
  state: {
    dishList: [],
    dishMap: {}
  },
  mutations: {
    refreshDish(state, dishList) {
      state.dishList = dishList
      state.dishMap = getObjectMap(dishList)
    }
  },
  getters: {
    dishList: state => state.dishList,
    dishMap: state => state.dishMap
  },
  actions: {
    async getDishFromServer({ dispatch, commit }) {
      const dishList = (await getAllFood()).data.data
      commit('refreshDish', dishList)
    }
  }
}
