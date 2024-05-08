import axios from "axios";
import configAxios from "../../axios/configAxios";
import { ENDPOINT } from "../../constants/endpoint";


const state = {
  emails: {},
};

const mutations = {
  SET_EMAILS: (state, payload) => {
    state.emails = payload;
  },
};


const actions = {
  async addEmails({ commit }, payload) {
    console.log("payload",payload);
    try {
      const url = `${ENDPOINT.INBOX}`;
      // const res = await axios(configAxios("post", url));
      // if (res.status == 201) {
      //   Swal.fire({
      //     icon: "success",
      //     title: "สมัครสมาชิกสำเร็จ",
      //     text: "",
      //     showConfirmButton: false,
      //     timer: 2000,
      //   });
      //   router.push({ path: "/login" });
      // }
    } 
    catch (error) {
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
  // async getEmail({ commit }) {
  //   try {
  //     const url = `${ENDPOINT.USER}`;
  //     const res = await axios(configAxios("get", url));
  //     commit("SET_EMAILS", res.data); 
  //   } catch (error) {
  //     throw error;
  //   }
  // },
};


export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
