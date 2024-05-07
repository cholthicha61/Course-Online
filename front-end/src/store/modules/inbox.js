import axios from "axios";
import configAxios from "../../axios/configAxios";
import { ENDPOINT } from "../../constants/endpoint";

const state = {
  emails: [],
};

const mutations = {
  SET_EMAILS: (state, payload) => {
    state.emails = payload;
  },
};

const actions = {
    async addEmails({ commit }) {
      try {
        const url = `${ENDPOINT.EMAILS}`;
        const res = await axios(configAxios("get", url));
        if (res && res.data) {
          const emailsWithDate = res.data.map((email) => ({
            ...email,
            date: email.date, 
          }));
          commit("SET_EMAILS", emailsWithDate);
        } else {
          throw new Error("Failed to fetch emails.");
        }
      } catch (error) {
        throw new Error("Error fetching emails: " + error.message);
      }
    },
  };

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
