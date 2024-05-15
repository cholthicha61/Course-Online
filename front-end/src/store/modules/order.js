import axios from "axios";
import Swal from "sweetalert2";
import { ENDPOINT } from "../../constants/endpoint";
import configAxios from "@/axios/configAxios";

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
  async confirmOrder({ commit }, index) {
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
  async rejectOrder({ commit }, index) {
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
          icon: "success",
          title: "สั่งซื้อสำเร็จ",
          text: "",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log("error  >>> ", error);
      if (error.response.status == 404) {
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
