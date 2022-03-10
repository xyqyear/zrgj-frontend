import { getQueueStatus } from '../../api/data'

export default {
  state: {
    queue: {}
  },
  mutations: {
    refreshQueue(state, queue) {
      state.queue = queue
    }
  },
  getters: {
    queue: state => state.queue
  },
  actions: {
    async getQueueFromServer({ dispatch, commit }) {
      const queue = (await getQueueStatus()).data.data
      commit('refreshQueue', queue)
    }
  }
}
