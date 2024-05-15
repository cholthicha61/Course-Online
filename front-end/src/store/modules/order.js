import axios from "axios";
import { ENDPOINT } from "../../constants/endpoint";
import Swal from "sweetalert2";

const state = {
  orders: [],
  showConfirmationDialog: false,
  confirmedOrders: [],
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

  async createOrder({ commit }, orders) {
    console.log("orders:", orders);
    try {
      const url = `${ENDPOINT.ORDER}`;
      const res = await axios(configAxios("post", url, orders));
      console.log("url", url);
      console.log("res", res);

      if (res.status == 201) {
        Swal.fire({
          icon: "success",
          title: "สั่งซื้อสำเร็จ",
          text: "รอยืนยันการยืนยัน",
          showConfirmButton: false,
          timer: 2000,
        });
        location.reload();
      }
    } catch (error) {
      console.log("error  >>> ", error);
      if (error.response.status == 400) {
        Swal.fire({
          icon: "warning",
          title: "ซื้อไม่สำเร็จ ลองใหม่อีกครั้ง",
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
