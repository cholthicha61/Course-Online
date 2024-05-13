import axios from "axios";
import configAxios from "../../axios/configAxios";
import { ENDPOINT } from "../../constants/endpoint";

const state = {
  course: [],
};
const mutations = {
  SET_COURSE: (state, payload) => {
    state.course = payload;
  },
};
const actions = {
  async getCourse({ commit }, payload) {
    try {
        const url = `${ENDPOINT.COURSE}`;
        const res = await axios(configAxios("get", url));
        commit('SET_COURSE', res.data)
    } catch (error) {
        throw new Error
    }
  },

  async deleteCourse({ commit }, id) {
    try {
      const url = `${ENDPOINT.COURSE}/${id}`;
      const res = await axios(configAxios("delete", url));
      
      
    } catch (error) {
      throw new Error
    }
  },

  async addCourse({ commit }, addcourse) {
    const url = `${ENDPOINT.COURSE}/uploads`;
    console.log("Dai mai",addcourse);
    const formData = new FormData();
    formData.append("courseName", addcourse.name);
    formData.append("price", addcourse.price);
    formData.append("description", addcourse.detail);
    // formData.append("status", addcourse.status);
    formData.append("categoryId",addcourse.category);
    // formData.append("categoryId", 1);


    // formData.append("newCategory",addcourse.newCategory);
    // if (addcourse.images.length > 0) {
    //   addcourse.images.forEach((image) => {
    //     formData.append("files", image);
    //   });
    // }
    for (const item of addcourse.images) {
      formData.append("files",item)
    }
    console.log("mayung",formData);
    try {
      const res = await axios(configAxios("post", url, formData));
      console.log("ข้อมูลส่งได้มั้ย",addcourse);
      console.log("Course added successfully", res);
      commit("ADD_COURSE", res.data);
      
    } catch (error) {
      console.error("Failed to add addcourse", error);
      
    }
  },

  async updateCourse({ commit }, updatedCourse) {
    const url = `${ENDPOINT.COURSE}/${updatedCourse.id}`;
    const formData = new FormData();
    formData.append("courseName", updatedCourse.name);
    formData.append("price", updatedCourse.price);
    formData.append("description", updatedCourse.detail);
    // formData.append("status", updatedCourse.status);
    formData.append("categoryId", updatedCourse.category);
    for (const item of updatedCourse.images) {
      formData.append("files", item)
    }
    try {
      const res = await axios(configAxios("patch", url, formData));
      commit("UPDATE_COURSE", res.data);
    } catch (error) {
      console.error("Failed to update course", error);
    }
  }

};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
