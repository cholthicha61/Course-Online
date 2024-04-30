
import { createStore } from 'vuex'

import datafromApiFree from './modules/datafromApiFree'
import auth from './modules/auth'


export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    datafromApiFree,
    auth
  }
})

