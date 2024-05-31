import axios from "axios";
import configAxios from "../../axios/configAxios";
import { ENDPOINT } from "../../constants/endpoint";
import router from "../../router/index";
import Swal from "sweetalert2";
import { JSONParser } from "@amcharts/amcharts5";

const state = {
  profile: {},
  user: []
};
const mutations = {
  SET_PROFILE: (state, payload) => {
    // state.user = payload
    localStorage.setItem("accessToken", payload.accessToken);
    localStorage.setItem("role", payload.user.roles.name);
    localStorage.setItem("user", JSON.stringify(payload.user));

    state.profile = payload.user;
  },
  SET_USER: (state, payload) => {
    state.user = payload;
  }
};
const actions = {
  async login({ commit }, payload) {
    const url = `${ENDPOINT.LOGIN}`;
    try {
      const res = await axios(configAxios("post", url, payload));
      console.log("login OK", res);
      if (res.status == 200) {
        if (res.data.user.roles.name == "admin") {
          router.push({ path: "/Dashboard" });
        } else {
          router.push({ path: "/home" });
        }
      }
      commit("SET_PROFILE", res.data);
    } catch (error) {
      console.log("error  >>> ", error);
      if (error.response.status == 401){
        Swal.fire({
          icon: "error",
          title: "Password incorrect ",
          text: "",
          showConfirmButton: false,
          timer: 2000,
        });
      }
      if (error.response.status == 404){
        Swal.fire({
          icon: "warning",
          title: "No user account",
          text: "Please sign up an account",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  },

  async checkUser({commit}, user) {
    // await this.dispatch("user/getUser");
    // const userCheck = this.mapState.user
    // const user = JSON.parse(localStorage.getItem('user'))

    console.log('useremember', user)
    commit("SET_USER", user);
  },
  async logout() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    router.push("/homepage");
  },

  // logoutvv({commit}, payload) {

  // }
};
export default {
  // เพื่อทำให้การทำงานทั้งหมดทำงาน
  namespaced: true,
  state,
  mutations,
  actions,
};
