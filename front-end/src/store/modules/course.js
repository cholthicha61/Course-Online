import axios from "axios";
import configAxios from "../../axios/configAxios";
import { ENDPOINT } from "../../constants/endpoint";

const state = {
  course: [],
  selectedCourse: null,
};
const mutations = {
  SET_COURSE: (state, payload) => {
    state.course = payload;
  },
  SET_SELECTED_COURSE: (state, payload) => { 
    state.selectedCourse = payload;
  },
};
const actions = {
  async getCourse({ commit }, payload) {
    let url = `${ENDPOINT.COURSE}?orderById=DESC`;
    try {
      const res = await axios(configAxios("get", url));
      commit("SET_COURSE", res.data);
    } catch (error) {
      throw new Error();
    }
  },
  async getCourseById({ commit }, id) { 
    let url = `${ENDPOINT.COURSE}/${id}`;
    try {
      const res = await axios(configAxios("get", url));
      commit("SET_SELECTED_COURSE", res.data);
    } catch (error) {
      throw new Error();
    }
  },

  async deleteCourse({ commit }, id) {
    try {
      const url = `${ENDPOINT.COURSE}/${id}`;
      const res = await axios(configAxios("delete", url));
    } catch (error) {
      throw new Error();
    }
  },

  async addCourse({ commit }, addcourse) {
    const url = `${ENDPOINT.COURSE}/uploads`;
    const formData = new FormData();
    formData.append("courseName", addcourse.name);
    formData.append("price", addcourse.price);
    formData.append("description", addcourse.detail);
    formData.append("categoryId", addcourse.category);
    for (const item of addcourse.images) {
      formData.append("files", item);
    }
    try {
      const res = await axios(configAxios("post", url, formData));
      commit("ADD_COURSE", res.data);
    } catch (error) {
      console.error("Failed to add course", error);
    }
  },

  async updateCourse({ commit }, updatedCourse) {
    const url = `${ENDPOINT.COURSE}/${updatedCourse.id}`;
    console.log("url is", url);
    try {
      const res = await axios(configAxios("patch", url, updatedCourse.updateData));
      commit("UPDATE_COURSE", res.data);
    } catch (error) {
      console.error("Failed to update course", error);
    }
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
