import axios from "axios";
import configAxios from "../../axios/configAxios";
import { ENDPOINT } from "../../constants/endpoint";
import Swal from "sweetalert2";

const state = {
  emails: [],
};

const mutations = {
  SET_EMAILS(state, payload) {
    state.emails = payload;
  },
};

const actions = {
  async addEmails({ commit }, payload) {
    try {
      const url = `${ENDPOINT.INBOX}`;
      const res = await axios(configAxios("post", url, payload, payload.userId));
      if (res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error("Error: ", error);
      if (error.response && error.response.status === 400) {
        Swal.fire({
          icon: "warning",
          title: "No information found",
          text: "",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  },
  async sentEmails({ commit }, payload) {
    try {
      const url = `${ENDPOINT.INBOX}/question-non-login`;
      const res = await axios(configAxios("post", url, payload));
      if (res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error("Error: ", error)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a valid email address!",
      });
    }
  },
  async getQuestion({ commit }) {
    const url = `${ENDPOINT.INBOX}`;
    try {
      const res = await axios(configAxios("get", url));
      if (res.status === 200) {
        commit("SET_EMAILS", res.data);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
