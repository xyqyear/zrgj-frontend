import { getRestaurant } from '../../api/data'

export default {
  state: {
    restaurantInfo: {}
  },
  mutations: {
    refreshRestaurantInfo(state, restaurantInfo) {
      state.restaurantInfo = restaurantInfo
    }
  },
  getters: {
    restaurantInfo: state => state.restaurantInfo
  },
  actions: {
    async getRestaurantInfoFromServer({ dispatch, commit }) {
      const restaurantInfo = (await getRestaurant()).data.data
      commit('refreshRestaurantInfo', restaurantInfo)
    }
  }
}
