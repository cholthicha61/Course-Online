
import { createStore , mapState } from 'vuex'

import datafromApiFree from './modules/datafromApiFree'
import Login  from '@/components/Login.vue'


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
    Login,

  }
})

