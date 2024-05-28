<template>
  <div class="flex-container px-10 md:px-8 mt-8 flex flex-col ">
    <div class="head-course">
      <h1 class="text-2xl md:text-4xl">Inbox</h1>
    </div>
    <div class="mt-10 md:mt-9 flex-grow">
      <v-data-table-virtual :headers="headers" :items="email" class="h-full">
        <template #item="{ item, index }">
          <tr :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ formatDate(item.createdAt) }}</td>
            <td v-if="item.email == null">
              {{ item.user ? item.user.email : "N/A" }}
            </td>
            <td v-else>{{ item.email }}</td>
            <td>{{ item.message }}</td>
            <td class="status-cell">
              <input type="checkbox" id="checkbox" v-model="item.checked" />
              <label for="checkbox">{{ item.status }}</label>
            </td>
          </tr>
        </template>
      </v-data-table-virtual>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";
export default {
  data: () => ({
    headers: [
      { title: "No.", align: "start", value: "no" },
      { title: "Date", align: "start", value: "date", sortable: true },
      { title: "Email", align: "start", value: "email", sortable: true },
      { title: "Message", align: "start", value: "message", sortable: true },
      { title: "Status", align: "start", value: "status", sortable: true },
    ],
    email: [],
  }),
  computed: {
    ...mapState({
      emails: (state) => state.inbox.emails,
    }),
  },
  async mounted() {
    this.getQuestion();
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleString();
    },
    async getQuestion() {
      await this.$store.dispatch("inbox/getQuestion");
      this.email = this.emails;
      console.log("Fetched emails:", this.email);
    },
  },
};
</script>

<style scoped>
.head-course h1 {
  color: rgb(11, 94, 188);
  border-bottom: 1px solid #d9d9d9;
  font-style: italic;
}
.v-data-table-virtual {
  height: 100%;
}

</style>
