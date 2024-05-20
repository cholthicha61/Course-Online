<template lang="">
  <div class="px-8 mt-8">
    <h1 class="text-4xl mb-10 text-center bg-gray-100 px-4 py-4 rounded-lg">
      Confirmed Orders
    </h1>
  </div>
  <div>
    <v-data-table-virtual :headers="headers" :items="confirmedOrders" height="100vh">
      <template v-slot:[`item.no`]="{ index }">
        {{ index + 1 }}
      </template>
      <template #item="{ item, index }">
        <tr :key="item.courseName">
          <td class="table-cell">{{ index + 1 }}</td>
          <td class="table-cell">{{ formatDate(item.createdAt) }}</td>
          <td class="table-cell">{{ item.courseName }}</td>
          <td class="table-cell" v-if="item.categorys">
            {{ item.categorys.name }}
          </td>
          <td class="table-cell" v-else>N/A</td>
          <td class="table-cell">{{ item.description }}</td>
          <td class="table-cell">{{ item.price }}</td>
          <td class="table-cell">{{ item.status }}</td>
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
import Swal from "sweetalert2";

export default {
  data() {
    return {
      headers: [
        { title: "No.", align: "start", value: "id" },
        { title: "CreatedAt", align: "start", value: "createdAt", sortable: true },
        { title: "Course Name", align: "start", value: "courseName", sortable: true },
        { title: "Category", align: "start", value: "categorys.name", sortable: true },
        { title: "Detail", align: "start", value: "description", sortable: true },
        { title: "Price", align: "start", value: "price", sortable: true },
        { title: "Type", align: "start", value: "priority", sortable: true },
        { title: "Action", align: "start" },
      ],
    };
  },
  computed: {
    ...mapState({
      order: (state) => state.order.order,
      confirmedOrders: (state) => state.order.confirmedOrders,
      course: (state) => state.course.course,
      names: (state) => state.category.names,
    }),
  },
  async mounted() {
    await this.getOrder();
  },
  methods: {
    async getOrder() {
      await this.$store.dispatch("order/getOrder");
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
};
</script>

<style scoped>
.table-cell {
  max-width: 100px;
  word-wrap: break-word;
  white-space: normal;
}
</style>
