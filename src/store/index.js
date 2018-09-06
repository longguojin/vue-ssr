import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import counter from './modules/counter'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

//create stores
export function createStore() {


  return new Vuex.Store({
    actions,
    mutations,
    getters,
    modules: {
      counter
    },
    strict: debug,
    plugins: []
  })
}
