<template lang="">
  <div class="px-8 mt-8">
    <h1 class="text-4xl mb-10 text-center bg-gray-100 px-4 py-4 rounded-lg">
      Confirmed Orders
    </h1>
  </div>
  <div>
    <v-data-table-virtual :headers="headers" :items="order" height="450">
      <template #item="{ item, index }">
        <tr :key="index">
          <td class="table-cell">{{ index + 1 }}</td>
          <td class="table-cell">{{ formatDate(item.createdAt) }}</td>
          <td>{{ item.user.email }}</td>
          <td class="table-cell">{{ item.course.courseName }}</td>
          <td class="table-cell">
            {{ item.course.categorys ? item.course.categorys.name : "None" }}
          </td>
          <td class="table-cell">{{ formatPrice(item.course.price) }}</td>

          <td class="table-cell" style="text-align: center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#1E90FF"
              class="w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clip-rule="evenodd"
              />
            </svg>
          </td>
        </tr>
      </template>
    </v-data-table-virtual>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { StatusOrder } from "@/constants/enum";

export default {
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
          value: "courseName",
          sortable: true,
        },
        {
          title: "Category",
          align: "start",
          value: "categorys.name",
          sortable: true,
        },
        { title: "Price", align: "start", value: "price", sortable: true },
        { title: "Action", align: "start" },
      ],
      // order: []
    };
  },
  computed: {
    ...mapState({
      order: (state) => state.order.order,
      course: (state) => state.course.course,
      names: (state) => state.category.names,
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
      const payload = {
        status: StatusOrder.Incourse,
      };
      await this.$store.dispatch("order/getOrder", payload);
      console.log("orderorderorder", this.order);
    },
    formatPrice(price) {
      return price
        .toLocaleString("en-US", { style: "currency", currency: "THB" })
        .replace("THB", "฿");
    },
  },
};
</script>

<style scoped>
/* .table-cell {
  max-width: 100px;
  word-wrap: break-word;
  white-space: normal;
} */
</style>
