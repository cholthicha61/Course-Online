<template>
  <div class="flex justify-center mt-8">
    <div class="rounded-lg w-full">
      <h1 class="text-4xl mb-8 text-center bg-gray-100 px-4 py-4 rounded-lg">
        Course Orders
      </h1>
      <div class="overflow-x-auto">
        <table class="w-full border-collapse-full">
          <thead>
            <tr>
              <th
                class="px-6 py-3 text-left text-sm font-semibold text-black uppercase border-b border-gray-300"
              >
                Course Name
              </th>
              <th
                class="px-6 py-3 text-left text-sm font-semibold text-black uppercase border-b border-gray-300"
              >
                Price
              </th>
              <th
                class="px-6 py-3 text-left text-sm font-semibold text-black uppercase border-b border-gray-300"
              >
                Detail
              </th>
              <th
                class="px-6 py-3 text-left text-sm font-semibold text-black uppercase border-b border-gray-300"
              >
                User
              </th>
              <th
                class="px-6 py-3 text-left text-sm font-semibold text-black uppercase border-b border-gray-300"
              >
                Email
              </th>
              <th
                class="px-6 py-3 text-left text-sm font-semibold text-black uppercase border-b border-gray-300"
              >
                Confirm Course
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in orders" :key="index">
              <td class="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                {{ order.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                {{ order.price }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                {{ order.detail }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                {{ order.user }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                {{ order.email }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                <button
                  v-if="!order.confirmed"
                  @click="confirmOrder(index)"
                  class="bg-blue-600 text-white px-4 py-2 rounded-md mr-2"
                >
                  Confirm
                </button>
                <button
                  v-if="!order.confirmed"
                  @click="rejectOrder(index)"
                  class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                >
                  Reject
                </button>
                <!-- Tick Icon -->
                <span v-if="order.confirmed" class="">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                  </div>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div
      v-if="showConfirmationDialog"
      class="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
    >
      <div class="bg-white p-8 rounded-lg">
        <p class="text-xl mb-4">Confirmation Successful!</p>
        <button
          @click="hideConfirmationDialog"
          class="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: [
        {
          name: "เพลง กากีนัง",
          price: "$20",
          detail: "กากีนังกังกากากีนัง ",
          user: "โตขึ้นมา ต้องขัดรองเท้า",
          email: "พ่อของเรานั้นสอนเอาไว้@EIEI.com",
          confirmed: false,
        },
        {
          name: "นักเขาบินข้ามเขา",
          price: "0.389",
          detail: "มันจึ้งมากนะ จึ้งจริง แต่จะบอกใครไม่ได้นะ",
          user: "เฮ้ยไอไนท์ พ่อมึงโทรมา ฉิบหายแล้วๆๆ ทำไงดีวะ ปิดดิๆ",
          email: "AiNight@gmailc.om",
          confirmed: false,
        },
      ],
      showConfirmationDialog: false,
    };
  },
  methods: {
    confirmOrder(index) {
      this.orders[index].confirmed = true;
      this.showConfirmationDialog = true;
      this.hideActions(index);
      this.$store.dispatch("order/confrimonder", this.confirmOrder);
    },
    rejectOrder(index) {
      this.showConfirmationDialog = false;
      this.orders.splice(index, 1);
      this.hideActions(index);
    },
    hideConfirmationDialog() {
      this.showConfirmationDialog = false;
    },
    hideActions(index) {
      this.orders[index].hideActions = true;
    },
  },
};
// import { mapState, mapActions } from 'vuex';

// export default {

//   computed: {
//     ...mapState(['orders', 'showConfirmationDialog'])
//   },
//   methods: {
//     ...mapActions(['confirmOrder', 'rejectOrder', 'fetchOrders']),
//     async confirmOrderHandler(index) {
//       try {
//         await this.confirmOrder(index);
//         await this.fetchOrders();
//       } catch (error) {
//         console.error('Error confirming order:', error);
//       }
//     },
//     async rejectOrderHandler(index) {
//       try {
//         await this.rejectOrder(index);
//         await this.fetchOrders();
//       } catch (error) {
//         console.error('Error rejecting order:', error);
//       }
//     }
//   }
// };
</script>
