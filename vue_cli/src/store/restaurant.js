import { getRestaurant, updateRestaurant } from '../../api/data'

export default {
  state: {
    restaurantInfo: {}
  },
  mutations: {
    refreshRestaurantInfo(state, restaurantInfo) {
      state.restaurantInfo = restaurantInfo
    },
    refreshTableInfo(state, tableInfo) {
      state.restaurantInfo.tableInfo = tableInfo
      state.restaurantInfo.tableNum = tableInfo.length
    }
  },
  getters: {
    restaurantInfo: state => state.restaurantInfo
  },
  actions: {
    async getRestaurantInfoFromServer({
      dispatch,
      commit,
      state
    }) {
      const restaurantInfo = (await getRestaurant()).data.data
      commit('refreshRestaurantInfo', restaurantInfo)
    },
    updateRestaurantInfoToServer({
      dispatch,
      commit,
      state
    }, restaurantInfo) {
      updateRestaurant(restaurantInfo)
        .then(_ => {
          commit('refreshRestaurantInfo', restaurantInfo)
        })
        .catch(_ => {
        })
    },
    updateTableInfo({
      dispatch,
      commit,
      state
    }, tableInfo) {
      commit('refreshTableInfo', tableInfo)
      dispatch('updateRestaurantInfoToServer', state.restaurantInfo)
    }
  }
}
