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
          title: "Date",
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
    const today = new Date().toISOString().split('T')[0]; // วันที่ปัจจุบัน
    const { value: formValues } = await Swal.fire({
      title: "Enter Start and End Dates",
      html:
        `<input id="start-date" type="date" class="swal2-input" min="${today}">` +
        `<input id="end-date" type="date" class="swal2-input" min="${today}">`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Submit",
      cancelButtonText: "Cancel",
      preConfirm: () => {
        const startDate = document.getElementById("start-date").value;
        const endDate = document.getElementById("end-date").value;
        if (!startDate || !endDate) {
          Swal.showValidationMessage("Please enter both Start and End Dates");
          return false;
        }
        if (new Date(startDate) < new Date(today) || new Date(endDate) < new Date(today)) {
          Swal.showValidationMessage("Start and End Dates must be today or later");
          return false;
        }
        if (new Date(endDate) <= new Date(startDate)) {
          Swal.showValidationMessage("End Date must be greater than Start Date");
          return false;
        }
        return [startDate, endDate];
      },
    });

    if (formValues) {
      const [startdate, enddate] = formValues;
      const confirmPayload = {
        orderId,
        startdate,
        enddate,
        status: StatusOrder.Incourse,
      };
      const dateOrderPayload = {
        orderId,
        startdate,
        enddate
      };

      // Dispatch confirmOrder and dateOrder simultaneously
      await Promise.all([
        this.$store.dispatch("order/confirmOrder", confirmPayload),
        this.$store.dispatch("order/dateOrder", dateOrderPayload)
      ]);

      Swal.fire(
        "Confirmed!",
        "The order has been confirmed with the start and end dates.",
        "success"
      ).then(() => {
        window.location.reload(); // รีโหลดหน้าหลังจากการยืนยันเสร็จสิ้น
      });
    }
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
