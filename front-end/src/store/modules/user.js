import axios from "axios";
import configAxios from "../../axios/configAxios";
import { ENDPOINT } from "../../constants/endpoint";

const state = {
  user: {},
};
const mutations = {
  SET_USER: (state, payload) => {
    state.user = payload;
  },
};
const actions = {
  async getUser({ commit }, payload) {
    try {
        const url = `${ENDPOINT.USER}`;
        const res = await axios(configAxios("get", url))
        commit('SET_USER', res.data)
        
    } catch (error) {
        throw error;
    }
  },

};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};


