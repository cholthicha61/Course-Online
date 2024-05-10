import axios from "axios";
import configAxios from "../../axios/configAxios";
import { ENDPOINT } from "../../constants/endpoint";
import Swal from "sweetalert2";


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
      const res = await axios(configAxios("post", url, payload,payload.userId));
      if (res.status == 201) {
        Swal.fire({
          icon: "success",
          title: "ส่งคำถามเสร็จสิ้น",
          text: "",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } 
    catch (error) {
      console.log("error  >>> ", error);
      if (error.response.status == 400){
        Swal.fire({
          icon: "warning",
          title: "ไม่พบข้อมูล",
          text: "",
          showConfirmButton: false,
          timer: 2000,
        });
      }
      
    }
  },
};


export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
