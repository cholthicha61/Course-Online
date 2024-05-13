import axios from "axios";
import configAxios from "../../axios/configAxios";
import { ENDPOINT } from "../../constants/endpoint";

const state = {
  course: {},
};
const mutations = {
  SET_COURSE: (state, payload) => {
    state.course = payload;
  },
};
const actions = {
  async getCourse({ commit }, payload) {
    try {
        const url = `${ENDPOINT.COURSE}`;
        const res = await axios(configAxios("get", url));
        commit('SET_COURSE', res.data)
    } catch (error) {
        throw new Error
    }
  },

  async deleteCourse({ commit }, id) {
    try {
      const url = `${ENDPOINT.COURSE}/${id}`;
      const res = await axios(configAxios("delete", url));
      
      
    } catch (error) {
      throw new Error
    }
  }

};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
