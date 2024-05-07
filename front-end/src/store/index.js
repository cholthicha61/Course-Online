
import { createStore , mapState } from 'vuex'

import datafromApiFree from './modules/datafromApiFree'
import auth from './modules/auth'
import user from './modules/user'
import inbox from './modules/inbox'


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
    auth,
    user,
    inbox,
  }
})

