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
    localStorage.setItem("accessToken", payload.accessToken);
    localStorage.setItem("role", payload.user.roles.name);
    localStorage.setItem("user", JSON.stringify(payload.user));

    state.profile = payload.user;
  },
};
const actions = {
  async login({ commit }, payload) {
    const url = `${ENDPOINT.LOGIN}`;
    try {
      const res = await axios(configAxios("post", url, payload));
      console.log("login OK", res);
      if (res.status == 200) {
        if (res.data.user.roles.name == "admin") {
          router.push({ path: "/admin" });
        } else {
          router.push({ path: "/" });
        }
      }
      commit("SET_PROFILE", res.data);
    } catch (error) {}
  },

  async logout() {
    localStorage.removeItem('accessToken')
  }
};
export default {
  // เพื่อทำให้การทำงานทั้งหมดทำงาน
  namespaced: true,
  state,
  mutations,
  actions,
};
