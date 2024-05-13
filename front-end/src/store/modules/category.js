import axios from "axios";
import configAxios from "../../axios/configAxios";
import { ENDPOINT } from "../../constants/endpoint";
import Swal from "sweetalert2";
import _ from "lodash";

const state = {
  names: [],
};

const mutations = {
  SET_NAMES: (state, payload) => {
    state.names = payload;
  },
};

const actions = {
  async names({ commit }, payload) {
    console.log("payload", payload);
    try {
      const url = `${ENDPOINT.CATEGORY}`;
      const res = await axios(configAxios("post", url, payload));

      if (res.status == 201) {
        Swal.fire({
          icon: "success",
          title: "เพิ่มหมวดหมู่สำเร็จ",
          text: "",
          showConfirmButton: false,
          timer: 2000,
        });
        location.reload();
      }
    } catch (error) {
      console.log("error  >>> ", error);
      if (error.response.status == 400) {
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
  async getCategory({ commit }, payload) {
    let url = `${ENDPOINT.CATEGORY}`;
    try {
      const res = await axios(configAxios("get", url));
        if (res.status == 200) {
          console.log('res cate?', res.data);
          commit("SET_NAMES", res.data);
        }
    } catch (error) {
      console.log('error', error);
    }
    // if (!_.isEmpty(payload)) {
    //   if (payload?.category) {
    //     url = `${url}?category=${payload?.category}`;
    //   }
    //   try {
    //     const res = await axios(configAxios("get", url));
    //     if (res.status == 200) {
    //       console.log('res cate?', res);
    //       commit("SET_NAMES", res.data);
    //     }
    //   } catch (error) {}
    // }
    // console.log("payload", payload);
  },
  async deleteCategory({ commit }, categoryId) {
    try {
      const url = `${ENDPOINT.CATEGORY}/${categoryId}`;
      const res = await axios(configAxios("delete", url));

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "ลบหมวดหมู่สำเร็จ",
          text: "",
          showConfirmButton: false,
          timer: 3000,
        });
        commit("SET_NAMES", res.data);
        location.reload();
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      if (error.response.status == 400) {
        {
          Swal.fire({
            icon: "warning",
            title: "ไม่พบข้อมูล",
            text: "",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      }
    }
  },
  async updateCategory({ commit }, { categoryId, newData }) {
    try {
      console.log("categoryId:", categoryId);
      console.log("newData:", newData);
      const url = `${ENDPOINT.CATEGORY}/${categoryId}`;
      const res = await axios(configAxios("patch", url, newData));

      if (res.status === 200) {
        // commit("SET_NAMES", res.data);
        await this.dispatch("category/getCategory", {
          category: true,
        });

        Swal.fire({
          icon: "success",
          title: "อัปเดตหมวดหมู่สำเร็จ",
          text: "",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error("Error updating category:", error);
      Swal.fire({
        icon: "warning",
        title: "ไม่สามารถอัปเดตหมวดหมู่ได้",
        text: "",
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
