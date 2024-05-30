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
  ADD_COURSE: (state, payload) => {
    state.course.push(payload);
  },
  UPDATE_COURSE: (state, payload) => {
    const index = state.course.findIndex((c) => c.id === payload.id);
    if (index !== -1) {
      state.course.splice(index, 1, payload);
    }
  },
};

const actions = {
  async getCourse({ commit }) {
    let url = `${ENDPOINT.COURSE}?orderById=DESC`;
    try {
      const res = await axios(configAxios("get", url));
      console.log("Fetched courses:", res.data); // Debug log
      commit("SET_COURSE", res.data);
    } catch (error) {
      console.error("Failed to fetch courses", error);
      throw new Error();
    }
  },
  async getCourseById({ commit }, id) {
    console.log("id", id);
    let url = `${ENDPOINT.COURSE}/${id}`;
    try {
      const res = await axios(configAxios("get", url));
      console.log("Fetched course by ID:", res.data);

      commit("SET_SELECTED_COURSE", res.data);
    } catch (error) {
      console.error("Failed to fetch course by ID", error);
      throw new Error();
    }
  },

  async deleteCourse({ commit }, id) {
    try {
      const url = `${ENDPOINT.COURSE}/${id}`;
      await axios(configAxios("delete", url));
    } catch (error) {
      console.error("Failed to delete course", error);
      throw new Error();
    }
  },

  async addCourse({ commit }, addcourse) {
    const url = `${ENDPOINT.COURSE}`;
    const formData = new FormData();
    console.log("addcourse", addcourse);
    formData.append("courseName", addcourse.name);
    formData.append("price", addcourse.price);
    formData.append("description", addcourse.detail);
    formData.append("categoryId", addcourse.category);
    for (const item of addcourse.images) {
      formData.append("files", item.file);
      console.log("TTTTTTT", item.file);
    }
    for (const value of formData.values()) {
      console.log("VALUE", value);
    }

    try {
      const courses = await axios(configAxios("get", `${ENDPOINT.COURSE}`));
      const duplicate = courses.data.find(
        (course) => course.courseName === addcourse.name
      );
      if (duplicate) {
        throw { response: { status: 409 } };
      }

      const res = await axios(configAxios("post", url, formData));
      commit("ADD_COURSE", res.data);
    } catch (error) {
      console.error("Failed to add course", error);
      if (error.response && error.response.status === 409) {
        throw new Error("This name is already in use");
      } else {
        throw new Error("Unable to add course");
      }
    }
  },

  async updateCourse({ commit }, updatedCourse) {
    const url = `${ENDPOINT.COURSE}/${updatedCourse.id}`;
    console.log("ตี๋น้อย",updatedCourse.updateData.files);
    try {
    //   const courses = await axios(configAxios("get", `${ENDPOINT.COURSE}`));
    //   const duplicate = courses.data.find(
    //     (course) =>
    //       course.courseName === updatedCourse.updateData.courseName &&
    //       course.id !== updatedCourse.id
    //   );
    //   if (duplicate) {
    //     throw { response: { status: 409 } };
    //   }

      const formData = new FormData();
      console.log("addcourse", updatedCourse);
      formData.append("courseName", updatedCourse.updateData.name);
      formData.append("price", updatedCourse.updateData.price);
      formData.append("description", updatedCourse.updateData.detail);
      formData.append("categoryId", updatedCourse.updateData.category);
      for (const item of updatedCourse.updateData.files) {
        formData.append("files",item || item.item);
        console.log("SDSDSDSDSD", item);
      }

      const res = await axios(
        configAxios("patch", url, formData)
      );
    } catch (error) {
      console.error("Failed to update course", error);
      if (error.response && error.response.status === 409) {
        throw new Error("This name is already in use");
      } else {
        throw new Error("Unable to update information");
      }
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
        await dispatch("getCourse");
      }
    } catch (error) {
      console.error("Failed to update course priority", error);
      Swal.fire({
        icon: "error",
        title: "An error occurred.",
        text: "Unable to update sequence. Please try again later.",
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
