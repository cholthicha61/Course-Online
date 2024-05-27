<template>
  <div class="flex justify-center mt-8">
    <div class="rounded-lg w-full">
      <h1 class="text-4xl mb-8 text-center bg-gray-100 px-4 py-4 rounded-lg">
        Course Orders
      </h1>
      <div class="overflow-x-auto">
        <v-data-table-virtual :headers="headers" :items="order" height="500">
          <template #item="{ item, index }">
            <tr :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ formatDate(item.createdAt) }}</td>
              <td>{{ item.user.email }}</td>
              <td>{{ item.course ? item.course.courseName : "None" }}</td>
              <td>{{ item.course && item.course.categorys ? item.course.categorys.name : "None" }}</td>
              <td>{{ item.course ? item.course.price : "None" }}</td>
              
              <td style="text-align: center; min-width: 120px">
                <v-btn color="blue" @click="confirmOrder(item.id)" style="margin-right: 10px">Confirm</v-btn>
                <v-btn color="warning" @click="rejectOrder(item.id)">Reject</v-btn>
              </td>
            </tr>
          </template>
        </v-data-table-virtual>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Swal from "sweetalert2";
import { StatusOrder } from "@/constants/enum";

export default {
  name: "CourseOrders",
  data() {
    return {
      headers: [
        { title: "No.", align: "start", value: "index" },
        { title: "CreatedAt", align: "start", value: "createdAt", sortable: true },
        { title: "Email", align: "start", value: "email", sortable: true },
        { title: "Course Name", align: "start", value: "course.courseName", sortable: true },
        { title: "Category", align: "start", value: "categorys.name", sortable: true },
        { title: "Price", align: "start", value: "price", sortable: true },
        { title: "Action", align: "center" },
      ],
      // test: [],
    };
  },
  
  computed: {
    ...mapState({
      order: (state) => state.order.order,
    }),
  },
  async mounted() {
    await this.getOrder();
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleString();
    },
    async getOrder() {
      const payload = { status: StatusOrder.Waiting };
      await this.$store.dispatch("order/getOrder", payload);
      console.log("ORDER", this.order);
    },
    async confirmOrder(orderId) {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to confirm this order?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, confirm it!',
        cancelButtonText: 'Cancel'
      });

      if (result.isConfirmed) {
        const payload = { orderId, status: StatusOrder.Incourse };
        console.log("Payload:", payload);
        await this.$store.dispatch("order/confirmOrder", payload);
        Swal.fire(
          'Confirmed!',
          'The order has been confirmed.',
          'success'
        ).then(() => {
          window.location.reload();
        });
      }
    },
    async rejectOrder(orderId) {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to reject this order?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, reject it!',
        cancelButtonText: 'Cancel'
      });

      if (result.isConfirmed) {
        const payload = { orderId, status: StatusOrder.Canceled };
        console.log("Payload:", payload);
        await this.$store.dispatch("order/rejectOrder", payload);
        Swal.fire(
          'Rejected!',
          'The order has been rejected.',
          'success'
        ).then(() => {
          window.location.reload();
        });
      }
    },
  },
};
</script>
