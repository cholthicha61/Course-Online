import axios from "axios";
import { ENDPOINT } from "../../constants/endpoint";
import configAxios from "@/axios/configAxios";
import Swal from "sweetalert2";
import { StatusOrder } from "@/constants/enum";

const state = {
  orders: [],
  showConfirmationDialog: false,
  confirmedOrders: [],
  order: [],
  orderIn: [],
  orderCancle: [],
  orderEnd: [],
};

const mutations = {
  SET_ORDERS: (state, orders) => {
    state.orders = orders;
  },
  SET_ORDERIN: (state, payload) => {
    state.orderIn = payload;
  },
  SET_ORDERCANCLE: (state, payload) => {
    state.orderCancle = payload;
  },
  SET_ORDEREND: (state, payload) => {
    state.orderEnd = payload;
  },
  // SET_ORDEREND: (state, payload) => {
  //   state.orderEnd = payload;
  // },
  CONFIRM_ORDER: (state, index) => {
    state.orders[index].confirmed = true;
    state.showConfirmationDialog = true;
    state.confirmedOrders.push(state.orders[index]);
  },
  REJECT_ORDER: (state, index) => {
    state.orders.splice(index, 1);
  },
  HIDE_CONFIRMATION_DIALOG: (state) => {
    state.showConfirmationDialog = false;
  },
  SET_ORDER: (state, payload) => {
    state.order = payload;
  },
  SET_START_DATE: (state, startDate) => {
    state.startDate = startDate;
  },
  SET_END_DATE: (state, endDate) => {
    state.endDate = endDate;
  },
};

const actions = {
  async getOrder({ commit }, payload) {
    let url = `${ENDPOINT.ORDER}`;
    console.log("ssss", url);
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: payload,
      });
      console.log("res banana", res);
      if (res.status === 200) {
        console.log("res cate?", res.data);
        commit("SET_ORDERS", res.data);
        commit("SET_ORDER", res.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  },
  async confirmOrder({ commit, dispatch }, payload) {
    let url = `${ENDPOINT.ORDER}/update-status/${payload.orderId}`;
    console.log("Request URL:", url);
    console.log("FFFFFFF",payload);

    try {
      const res = await axios.patch(
        url,
        {
          status: payload.status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      console.log("Response:", res);
      if (res.status === 200) {
        console.log("Updated Order Data:", res.data);
        await dispatch("getOrder", { status: StatusOrder.Waiting });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  },
  async dateOrder({ commit, dispatch }, payload) {
    let url = `${ENDPOINT.ORDER}/${payload.orderId}`;
    console.log("Request URL:", url);

    try {
      const res = await axios.patch(
        url,
        { startdate : payload.startdate, 
          enddate: payload.enddate,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      console.log("Response:", res);
      if (res.status === 200) {
        console.log("Updated Order Data:", res.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  },
  async rejectOrder({ commit, dispatch }, payload) {
    let url = `${ENDPOINT.ORDER}/update-status/${payload.orderId}`;
    console.log("Request URL:", url);

    try {
      const res = await axios.patch(
        url,
        { status: payload.status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      console.log("Response:", res);
      if (res.status === 200) {
        console.log("Updated Order Data:", res.data);
        await dispatch("getOrder", { status: StatusOrder.Waiting });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  },

  async createOrder({ commit }, payload) {
    console.log("payload", payload);
    try {
      const url = `${ENDPOINT.ORDER}`;
      const res = await axios(configAxios("post", url, payload));
      if (res.status == 201) {
      }
    } catch (error) {
      console.log("error  >>> ", error);
      if (error.response && error.response.status == 404) {
        Swal.fire({
          icon: "warning",
          title: "Unable to order",
          text: "",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  },
  async checkOrder({ commit }, payload) {
    console.log("payload", payload);
    try {
      const url = `${ENDPOINT.ORDER}/check`;
      const res = await axios(configAxios("post", url, payload));
      if (res.status === 200) {
        return res.data.orderExists;
      }
      return false;
    } catch (error) {
      console.log("error  >>> ", error);
      if (error.response && error.response.status === 409) {
        Swal.fire({
          icon: "warning",
          title: "This course has already been purchased",
          text: "",
          showConfirmButton: false,
          timer: 2000,
        });
        return true;
      }
      throw error;
    }
  },

  async countWaitingOrder({ commit }, payload) {
    let url = `${ENDPOINT.ORDER}/count-waiting-order`;
    try {
      const res = await axios(configAxios("get", url));
      commit("SET_ORDER", res.data);
    } catch (error) {
      throw error;
    }
  },
  async countIncourseOrder({ commit }, payload) {
    let url = `${ENDPOINT.ORDER}/count-incourse-order`;
    try {
      const res = await axios(configAxios("get", url));
      commit("SET_ORDERIN", res.data);
    } catch (error) {
      throw error;
    }
  },
  async countCancleOrder({ commit }, payload) {
    let url = `${ENDPOINT.ORDER}/count-canceled-order`;
    try {
      const res = await axios(configAxios("get", url));
      commit("SET_ORDERCANCLE", res.data);
    } catch (error) {
      throw error;
    }
  },
  async countEndCourse({ commit }, payload) {
    // let url = `${ENDPOINT.ORDER}/count-end-order`;
    let url = `${ENDPOINT.ORDER}/count-end-order`;
    // let url = `${ENDPOINT.ORDER}/count-canceled-order`;
    try {
      const res = await axios(configAxios("get", url));
      console.log('res',this.res.data);
      commit("SET_ORDEREND", res.data);
    } catch (error) {
      throw error;
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
