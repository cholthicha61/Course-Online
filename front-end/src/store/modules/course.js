import axios from "axios";
import configAxios from "../../axios/configAxios";
import { ENDPOINT } from "../../constants/endpoint";
import Swal from "sweetalert2";

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
    console.log("id",id);
    let url = `${ENDPOINT.COURSE}/${id}`;
    try {
      const res = await axios(configAxios("get", url));
      console.log("resdata",res.data);
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
    const url = `${ENDPOINT.COURSE}`;
    const formData = new FormData();
    console.log("addcourse",addcourse);
    formData.append("courseName", addcourse.name);
    formData.append("price", addcourse.price);
    formData.append("description", addcourse.detail);
    formData.append("categoryId", addcourse.category);
    for (const item of addcourse.images) {
      formData.append("files", item); 
    }
    for (const value of formData.values()) {
      console.log(value);
    }

    try {
      const res = await axios(configAxios("post", url, formData));
      commit("ADD_COURSE", res.data);
    } catch (error) {
      console.error("Failed to add course", error);
      // if (error === 409) {
      //   Swal.fire({
      //     icon: "warning",
      //     title: "This course name is already in use",
      //     showConfirmButton: false,
      //     // timer: 2000,
      //   });
      // }
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

  async updatePriority({ commit, dispatch }, payload) {
    try {
      const url = `${ENDPOINT.COURSE}/update-priority/${payload.id}`;
      const res = await axios(configAxios("patch", url, payload));
      if (res.status === 200) {
        
        const updatedCourse = res.data.updatedCourse;
        commit("SET_COURSE", updatedCourse);
        
        Swal.fire({
          icon: "success",
          title: "Updated successfully",
          text: "The course sequence has been updated.",
          showConfirmButton: false,
          timer: 2000,
        });
        // อัพเดทรายการคอร์ส
        await dispatch("getCourse");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการอัพเดทลำดับ:", error);
      Swal.fire({
        icon: "error",
        title: "An error occurred.",
        text: "Unable to update sequence Please try again later.",
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
