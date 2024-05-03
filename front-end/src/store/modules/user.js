import axios from "axios";
import configAxios from "../../axios/configAxios";
import { ENDPOINT } from "../../constants/endpoint";
import router from "../../router/index";
import Swal from "sweetalert2";

const state = {
  user: {},
};
const mutations = {
  SET_USER: (state, payload) => {
    state.user = payload;
  },
};
const actions = {
  async createUser({ commit }, payload) {
    const url = `${ENDPOINT.USER}`;
    try {
      const res = await axios(configAxios("post", url, payload));
      console.log("created user OK", res);
      if (res.status == 201) {
        router.push({ path: "/login" });
      }
    } catch (error) {
      console.log("error  >>> ", error);
      Swal.fire({
        icon: "error",
        title: "ข้อมูลไม่ถูกต้อง",
        text: "ข้อมูลไม่ถูกต้อง",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  },
  async getUser({ commit }, payload) {
    try {
      const url = `${ENDPOINT.USER}`;
      const res = await axios(configAxios("get", url));
      commit("SET_USER", res.data);
    } catch (error) {
      throw error;
    }
  },
};

export default {
  // เพื่อทำให้การทำงานทั้งหมดทำงาน
  namespaced: true,
  state,
  mutations,
  actions,
};
