
import { createStore , mapState } from 'vuex'

import datafromApiFree from './modules/datafromApiFree'
import auth from './modules/auth'
import user from './modules/user'
import addCourse from './modules/addCourse'
import order from './modules/order'


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
    addCourse,
    order,
  }
})

