import axios from "axios";
import configAxios from "../../axios/configAxios";
import { ENDPOINT } from "../../constants/endpoint";
import Swal from "sweetalert2";


const state = {
  names: {},
};

const mutations = {
  SET_NAMES: (state, payload) => {
    state.names = payload;
  },
};


const actions = {
  async names({ commit }, payload) {
    // const url = `${ENDPOINT.CATEGORY}`;
    console.log("payload",payload);
    try {
      const url = `${ENDPOINT.CATEGORY}`;
      const res = await axios(configAxios("post", url, payload));
      // await axios.post(url, payload).then((res)=>{
      //   console.log("created category", res);

        if (res.status == 201) {
          Swal.fire({
            icon: "success",
            title: "เพิ่มหมวดหมู่สำเร็จ",
            text: "",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      // });

      
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
};


export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
