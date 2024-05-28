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
              <td>
                {{
                  item.course && item.course.categorys
                    ? item.course.categorys.name
                    : "None"
                }}
              </td>
              <td>
                {{ item.course ? formatPrice(item.course.price) : "None" }}
              </td>

              <td style="text-align: center; min-width: 120px">
                <v-btn
                  color="blue"
                  @click="confirmOrder(item.id)"
                  style="margin-right: 10px"
                  >Confirm</v-btn
                >
                <v-btn color="warning" @click="rejectOrder(item.id)"
                  >Reject</v-btn
                >
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
        {
          title: "CreatedAt",
          align: "start",
          value: "createdAt",
          sortable: true,
        },
        { title: "Email", align: "start", value: "email", sortable: true },
        {
          title: "Course Name",
          align: "start",
          value: "course.courseName",
          sortable: true,
        },
        {
          title: "Category",
          align: "start",
          value: "categorys.name",
          sortable: true,
        },
        { title: "Price", align: "start", value: "price", sortable: true },
        { title: "Action", align: "center" },
      ],
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
    },
    async confirmOrder(orderId) {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to confirm this order?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, confirm it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        const { value: formValues } = await Swal.fire({
          title: "Enter Start and End Dates",
          html:
            '<input id="start-date" type="date" class="swal2-input">' +
            '<input id="end-date" type="date" class="swal2-input">',
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: "Submit",
          cancelButtonText: "Cancel",
          preConfirm: () => {
            return [
              document.getElementById("start-date").value,
              document.getElementById("end-date").value,
            ];
          },
        });

        if (formValues) {
          const [startDate, endDate] = formValues;
          const payload = {
            orderId,
            startDate,
            endDate,
            status: StatusOrder.Incourse,
          };
          // this.startDate = formValues[0];
          // this.endDate = formValues[1];

          // const payload = { orderId, startDate: this.startDate, endDate: this.endDate, status: StatusOrder.Incourse };
          await this.$store.dispatch("order/confirmOrder", payload);
          Swal.fire(
            "Confirmed!",
            "The order has been confirmed with the start and end dates.",
            "success"
          ).then(() => {
            // window.location.reload();
          });
        }
      }
    },
    async rejectOrder(orderId) {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to reject this order?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, reject it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        const payload = { orderId, status: StatusOrder.Canceled };
        await this.$store.dispatch("order/rejectOrder", payload);
        Swal.fire("Rejected!", "The order has been rejected.", "success").then(
          () => {
            window.location.reload();
          }
        );
      }
    },
    async dateOrder(orderId) {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to reject this order?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, reject it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        const payload = { orderId, startdate: startdate, enddate: enddate };
        await this.$store.dispatch("order/dateOrder", payload);
        Swal.fire("Rejected!", "The order has been rejected.", "success").then(
          () => {
            window.location.reload();
          }
        );
      }
    },
    formatPrice(price) {
      return price
        .toLocaleString("en-US", { style: "currency", currency: "THB" })
        .replace("THB", "฿");
    },
  },
};
</script>
