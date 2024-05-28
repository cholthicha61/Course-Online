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
          <td style="text-align: center; min-width: 120px">
            <template v-if="!item.answered && item.status">
              <v-btn color="blue" @click="answer(item.id)" style="margin-right: 10px">Answer</v-btn>
            </template>
            <template v-else class="i-con-1">
              <svg
              style="margin-left: 65px"
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
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiCheckboxMarkedOutline } from '@mdi/js'
export default {
  components: {
    SvgIcon
  },
  data: () => ({
    headers: [
      { title: "No.", align: "start", value: "no" },
      { title: "Date", align: "start", value: "date", sortable: true },
      { title: "Email", align: "start", value: "email", sortable: true },
      { title: "Message", align: "start", value: "message", sortable: true },
      { title: "Action", align: "center" },
    ],
    email: [],
    mdiCheckboxMarkedOutline
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
