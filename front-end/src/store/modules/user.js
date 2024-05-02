import axios from "axios";
import configAxios from "../../axios/configAxios";
import { ENDPOINT } from "../../constants/endpoint";
import router from "../../router/index";

const state = {
  profile: {},
};
const mutations = {
  SET_PROFILE: (state, payload) => {
    // state.user = payload
    localStorage.setItem("role", payload.user.roles.name);
    localStorage.setItem("user", JSON.stringify(payload.user));

    state.profile = payload.user;
  },
};
const actions = {
  async createUser({ commit }, payload) {
    const url = `${ENDPOINT.USER}`;
    try {
      const res = await axios(configAxios("post", url, payload));
      console.log("login OK", res);
      if (res.status == 201) {
        router.push({ path: "/login" });
      }
      commit("SET_PROFILE", res.data);
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'ข้อมูลไม่ถูกต้อง',
            text: 'ข้อมูลไม่ถูกต้อง',
            showConfirmButton: false,
            timer: 2000,
          });
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
