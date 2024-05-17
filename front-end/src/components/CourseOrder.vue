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
            <tr v-for="(item, index) in order" :key="index">
              <td class="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                {{ item.course.courseName }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                {{ item.course.price }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                {{ item.course.description }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                {{ item.user.fname }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                {{ item.user.email }}
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
                <span v-if="order.confirmed" class="text-blue-500 ml-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 inline-block"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16z"
                      clip-rule="evenodd"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M5.86 10.75a.75.75 0 01-.743-.646L5.01 6.5a.75.75 0 011.486-.208l.117.849 3.98-1.281a.75.75 0 11.457 1.44l-4.5 1.446a.75.75 0 01-.484.002l-4.5-1.446a.75.75 0 11.457-1.44l3.98 1.281.117-.85a.75.75 0 01.646-.743z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Swal from "sweetalert2";

export default {
  name: "CourseOrders",
  data() {
    return {
      orders: [],
      a:{
        a1:555,
        a2:"yuiop"
      }
    };
  },

  computed: {
    ...mapState("order", ["orders"]),
    ...mapState({
      order: (state) => state.order.order,
    }),
  },
  async mounted() {
    this.getOrder();
  },

  methods: {
    async getOrder() {
      await this.$store.dispatch("order/getOrder");
      this.orders = this.order;
      console.log("wwwwwwwwwwww", this.order);
    },

    
    async confirmOrder(index) {
      // const confirmedOrder = this.orders[index];
      const result = await Swal.fire({
        title: "ยืนยันออเดอร์นี้ใช่มั้ย?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });
      if (result.isConfirmed) {
        await this.confirmOrderAction(confirmedOrder);
        // console.log('KKKK',this.orders);
        Swal.fire({
          title: "Confirmed!",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          this.$router.push({ name: "AllConfirmcourse" });
        });
        this.orders.splice(index, 1);
      }
    },
    async rejectOrder(index) {
      // const rejectedOrder = this.orders[index];
      const result = await Swal.fire({
        title: "ยืนยันที่จะลบออเดอร์นี้หรือไม่?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });

      if (result.isConfirmed) {
        await this.rejectOrderAction(rejectedOrder);
        Swal.fire({
          title: "Deleted!",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        this.orders.splice(index, 1);
      }
    },
  },
};
</script>

