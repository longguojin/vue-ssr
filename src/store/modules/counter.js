export default {
  namespaced: true,
  state: {
    count: 0
  },
  actions: {
    inc: ({
      commit
    }) => {
      return new Promise((rs, rj) => {
        //get asyn data
        setTimeout(() => {
          commit('inc')
          rs()
        }, 500);
      });
    }
  },
  mutations: {
    inc: state => state.count++
  }
}