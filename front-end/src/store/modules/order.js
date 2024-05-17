// store/modules/order.js

import axios from "axios";
import { ENDPOINT } from "../../constants/endpoint";
import configAxios from "@/axios/configAxios";
import Swal from "sweetalert2";

const state = {
  orders: [],
  showConfirmationDialog: false,
  confirmedOrders: [],
  order: [],
};

const mutations = {
  SET_ORDERS: (state, orders) => {
    state.orders = orders;
  },
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
};

const actions = {
  // async getOrder({ commit }, payload){
  //   let url = `${ENDPOINT.ORDER}`;
  //   try {
  //     const res = await axios(configAxios("get",url));
  //     commit("SET_ORDER", res.data)
  //   } catch (error) {
  //     throw new Error();
  //   }
  // },

  async getOrder({ commit }, payload) {
    let url = `${ENDPOINT.ORDER}`;
    try {
      const res = await axios(configAxios("get", url));
      if (res.status == 200) {
        console.log("res cate?", res.data);
        commit("SET_ORDER", res.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  },

  // async fetchOrders({ commit }) {
  //   try {
  //     const res = await axios.get(`${ENDPOINT.ORDER}`);
  //     if (res.status === 200) {
  //       commit('SET_ORDERS', res.data);
  //     } else {
  //       console.error("Failed to fetch orders");
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch orders", error);
  //   }
  // },
  async confirmOrder({ commit, state }, index) {
    try {
      const res = await axios.patch(
        `${ENDPOINT.ORDER}/${state.orders[index].orderId}/update-status`
      );

      if (res.status === 200) {
        commit("CONFIRM_ORDER", index);
      } else {
        console.error("Failed to confirm order");
      }
    } catch (error) {
      console.error("Failed to confirm order", error);
    }
  },
  async rejectOrder({ commit, state }, index) {
    try {
      const res = await axios.delete(
        `${ENDPOINT.ORDER}/${state.orders[index].orderId}`
      );

      if (res.status === 200) {
        commit("REJECT_ORDER", index);
      } else {
        console.error("Failed to reject order");
      }
    } catch (error) {
      console.error("Failed to reject order", error);
    }
  },
  hideConfirmationDialog({ commit }) {
    commit("HIDE_CONFIRMATION_DIALOG");
  },
  async createOrder({ commit }, payload) {
    console.log("payload", payload);
    try {
      const url = `${ENDPOINT.ORDER}`;
      const res = await axios(configAxios("post", url, payload));
      if (res.status == 201) {
        Swal.fire({
          title: "คุณต้องการซื้อคอร์สนี้หรือไม่",
          text: "",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "ยืนยันการซื้อคอร์ส",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              icon: "success",
              title: "ซื้อคอร์สสำเร็จ",
              text: "",
              showConfirmButton: false,
              timer: 3000,
            });
          }
        });
      }
    } catch (error) {
      console.log("error  >>> ", error);
      if (error.response && error.response.status == 404) {
        Swal.fire({
          icon: "warning",
          title: "ไม่สามารถสั่งซื้อได้",
          text: "",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
