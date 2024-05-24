import axios from "axios";
import configAxios from "../../axios/configAxios";
import { ENDPOINT } from "../../constants/endpoint";
import router from "../../router/index";
import Swal from "sweetalert2";
import _ from "lodash";

const state = {
  user: [],
  users: [],
  // status: [],
};
const mutations = {
  SET_USER: (state, payload) => {
    state.user = payload;
  },
  SET_USERS: (state, payload) => {
    state.users = payload;
  },
  // SET_STATUS: (state, payload) => {
  //   state.status = payload;
  // },
};
const actions = {
  async createUser({ commit }, payload) {
    const url = `${ENDPOINT.USER}`;
    console.log("url", url);
    try {
      // const res = await axios(configAxios("post", url, payload));
      await axios.post(url, payload).then((res) => {
        console.log("created user OK", res);

        if (res.status == 201) {
          Swal.fire({
            icon: "success",
            title: "Successfully applied for membership",
            text: "",
            showConfirmButton: false,
            timer: 2000,
          });
          router.push({ path: "/login" });
        }
      });
    } catch (error) {
      console.log("error  >>> ", error);
      if (error.response.status == 400) {
        Swal.fire({
          icon: "warning",
          title: "Please fill out the information completely",
          text: "",
          showConfirmButton: false,
          timer: 2000,
        });
        if (error.response.status == 401) {
          Swal.fire({
            icon: "warning",
            title: "Incorrect information",
            text: "",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      }
    }
  },
  async getUser({ commit }, payload) {
    let url = `${ENDPOINT.USER}`;

    if (!_.isEmpty(payload)) {
      if (payload?.question) {
        url = `${url}?questions=${payload?.question}`;
        console.log("url", url);
      }
      try {
        const res = await axios(configAxios("get", url));
        if (res.status == 200) {
          commit("SET_USERS", res.data);
        }
      } catch (error) {
        Swal.fire({
          icon: "success",
          title: "Question sent successfully",
          text: "",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } else {
      try {
        const res = await axios(configAxios("get", url));
        commit("SET_USER", res.data);
      } catch (error) {
        throw error;
      }
    }
  },
  async updateUser({ commit }, { userId, newData }) {
    try {
      console.log("updateUser :", userId);
      console.log("newData:", newData);
      const url = `${ENDPOINT.USER}/${userId}`;
      const res = await axios(configAxios("patch", url, newData));

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Profile edited successfully",
          text: "",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error("Error updating category:", error);
      Swal.fire({
        icon: "warning",
        title: "Incorrect information",
        text: "",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  },
  async updateTeacher({ commit }, { userId, newData }) {
    try {
      console.log("updateTeacher :", userId);
      console.log("newData:", newData);
      const url = `${ENDPOINT.USER}/teacher-profile`;
      const res = await axios(configAxios("patch", url, newData));

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Profile edited successfully",
          text: "",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error("Error updating category:", error);
      Swal.fire({
        icon: "warning",
        title: "Incorrect information",
        text: "",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  },
  async updateStatus({ commit }, payload) {
    console.log("payload", `${ENDPOINT.USER}/update-status/${payload.id}`);
    try {
      const url = `${ENDPOINT.USER}/update-status/${payload.id}`;
      const res = await axios(configAxios("patch", url, payload));
      console.log('response', res);
      if (res.status == 200) {
        Swal.fire({
          icon: "success",
          title: "Successfully edited",
          text: "",
          showConfirmButton: false,
          timer: 2000,
        });
        await this.dispatch("user/getUser");
      }
    } catch (error) {
      console.log("this", error);
    }
  },
  async getTeacher({ commit }, payload) {
    let url = `${ENDPOINT.USER}/get-teacher-profile`;
    try {
      const res = await axios(configAxios("get", url));
      commit("SET_USER", res.data);
    } catch (error) {
      throw new Error();
    }
  },
  async countUser({ commit }, payload) {
    let url = `${ENDPOINT.USER}/count-user`;
    try {
      const res = await axios(configAxios("get", url));
      commit("SET_USERS", res.data);
    } catch (error) {
      throw error;
    }
  }
};

export default {

  namespaced: true,
  state,
  mutations,
  actions,
};
