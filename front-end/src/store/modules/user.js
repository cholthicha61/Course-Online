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
    console.log("url",url);
    try {
      // const res = await axios(configAxios("post", url, payload));
      await axios.post(url, payload).then((res)=>{
        console.log("created user OK", res);

        if (res.status == 201) {
          Swal.fire({
            icon: "success",
            title: "สมัครสมาชิกสำเร็จ",
            text: "",
            showConfirmButton: false,
            timer: 2000,
          });
          // router.push({ path: "/login" });
        }
      });

      
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
  async updateStatus({commit}, payload) {
    const url = `${ENDPOINT.USER}`;
    try{
      await axios(configAxios("update", url));
      console.log("this",res)
    }catch (error){
      console.log("this",error);
    }
  },

}

export default {
  // เพื่อทำให้การทำงานทั้งหมดทำงาน
  namespaced: true,
  state,
  mutations,
  actions,
};
