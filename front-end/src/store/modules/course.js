import axios from "axios";
import configAxios from "../../axios/configAxios";
import { ENDPOINT } from "../../constants/endpoint";
import Swal from "sweetalert2";

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
    let url = `${ENDPOINT.COURSE}`;
    try {
      const res = await axios(configAxios("get", url));
      commit("SET_COURSE", res.data);
    } catch (error) {
      throw new Error();
    }
  },

  // async deleteCourse({ commit }, id) {
  //   try {
  //     const url = `${ENDPOINT.COURSE}/${id}`;
  //     const res = await axios(configAxios("delete", url));
  //   } catch (error) {
  //     throw new Error();
  //   }
  // },

  async deleteCourse({ commit }, courseId) {
    try {
      const url = `${ENDPOINT.COURSE}/${courseId}`;
      const res = await axios(configAxios("delete", url));

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "ลบคอร์สสำเร็จ",
          text: "",
          showConfirmButton: false,
          timer: 3000,
        });
        commit("SET_COURSE", res.data);
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

  async addCourse({ commit }, addcourse) {
    const url = `${ENDPOINT.COURSE}/uploads`;
    console.log("Dai mai", addcourse);
    const formData = new FormData();
    formData.append("courseName", addcourse.name);
    formData.append("price", addcourse.price);
    formData.append("description", addcourse.detail);
    // formData.append("status", addcourse.status);
    formData.append("categoryId", addcourse.category);
    // formData.append("categoryId", 1);

    // formData.append("newCategory",addcourse.newCategory);
    // if (addcourse.images.length > 0) {
    //   addcourse.images.forEach((image) => {
    //     formData.append("files", image);
    //   });
    // }
    for (const item of addcourse.images) {
      formData.append("files", item);
    }
    console.log("mayung", formData);
    try {
      const res = await axios(configAxios("post", url, formData));
      console.log("ข้อมูลส่งได้มั้ย", addcourse);
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
      formData.append("files", item);
    }
    try {
      const res = await axios(configAxios("patch", url, formData));
      commit("UPDATE_COURSE", res.data);
    } catch (error) {
      console.error("Failed to update course", error);
    }
  },
  // async updatePriority({ commit }, payload) {
  //   try {
  //     // await this.dispatch("course/getCourse");

  //     const url = `${ENDPOINT.COURSE}/update-priority/${payload.id}`;
  //     const res = await axios(configAxios("patch", url, payload));
  //     console.log("response", res);

  //     await this.dispatch("course/getCourse");
  //   } catch (error) {
  //     console.log("this", error);
  //   }
  // },
  async updatePriority({ commit, dispatch }, payload) {
    try {
      const url = `${ENDPOINT.COURSE}/update-priority/${payload.id}`;
      const res = await axios(configAxios("patch", url, payload));
      if (res.status === 200) {
        // ปรับปรุงค่าของ course ใน state
        const updatedCourse = res.data.updatedCourse;
        commit("SET_COURSE", updatedCourse);
        // แจ้งเตือนการปรับปรุงเรียบร้อย
        Swal.fire({
          icon: "success",
          title: "อัพเดทความสำเร็จ",
          text: "การอัพเดทลำดับคอร์สเรียบร้อยแล้ว",
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
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถอัพเดทลำดับได้ กรุณาลองใหม่ภายหลัง",
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
