import axios from "axios";
import { ENDPOINT } from "../../constants/endpoint";

const state = {
  orders: [],
  showConfirmationDialog: false,
  confirmedOrders: []
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
  // async fetchOrders({ commit }) {
  //   try {
  //     const res = await axios.get(ENDPOINT.ORDER);
  //     commit("SET_ORDERS", res.data);
  //   } catch (error) {
  //     console.error("Failed to fetch orders", error);
  //   }
  // },
  async confirmOrder({ commit }, index) {
    try {
      
      const res = await axios.patch(`${ENDPOINT.ORDER}/${state.orders[index].orderId}/update-status`);
      
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
      
      const res = await axios.delete(`${ENDPOINT.ORDER}/${state.orders[index].orderId}`);
      
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
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
