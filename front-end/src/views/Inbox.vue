<template>
  <div class="px-8 mt-8">
    <div class="head-course">
      <h1>Inbox</h1>
    </div>
  </div>
  <div class="mt-9">
    <v-data-table-virtual :headers="headers" :items="email" height="500">
      <template #item="{ item, index }">
        <tr :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ formatDate(item.createdAt) }}</td>
          <td v-if="item.email == null">{{ item.user ? item.user.email : 'N/A' }}</td>
          <td v-else>{{ item.email }}</td>
          <td>{{ item.message }}</td>
          <!-- <td style="text-align: center; min-width: 120px">
            <v-btn color="blue" @click="answer(item.id)" style="margin-right: 10px">Answer</v-btn>
          </td> -->
          <td style="text-align: center; min-width: 120px">
            <template v-if="!item.answered && item.status">
              <v-btn color="blue" @click="answer(item.id)" style="margin-right: 10px">Answer</v-btn>
            </template>
            <template v-else>
              <span style="color: gray">Answered</span>
            </template>
          </td>
        </tr>
      </template>
    </v-data-table-virtual>
  </div>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";
import Swal from "sweetalert2";
export default {
  data: () => ({
    headers: [
      { title: "No.", align: "start", value: "no" },
      { title: "Date", align: "start", value: "date", sortable: true },
      { title: "Email", align: "start", value: "email", sortable: true },
      { title: "Message", align: "start", value: "message", sortable: true },
      { title: "Action", align: "center" },
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
    async answer(id) {
      try {
        const result = await Swal.fire({
          icon: "question",
          title: "Have you answered the question?",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        });

        if (result.isConfirmed) {
          await this.$store.dispatch("inbox/updateQuestionStatus", { id, status: false });
          const item = this.email.find((email) => email.id === id);
          if (item) {
            item.answered = true;
          }
          Swal.fire({
            icon: "success",
            title: "Answered the question",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      } catch (error) {
        console.error("Error updating question status:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update question status",
        });
      }
    },
  },
};
</script>

<style scoped>
.head-course h1 {
  font-size: 30px;
  color: rgb(11, 94, 188);
  border-bottom: 1px solid #d9d9d9;
  font-style: italic;
}
</style>
