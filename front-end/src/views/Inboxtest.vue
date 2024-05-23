<template>
  <div class="px-8 mt-8">
    <div class="head-course">
      <h1>Inbox</h1>
    </div>
  </div>
  <div class="mt-9">
    <v-data-table-virtual :headers="headers" :items="userEmail">
      <template #item="{ item, index }">
        <tr :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ formatDate(item.date) }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.message }}</td>
        </tr>
      </template>
    </v-data-table-virtual>
  </div>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";

export default {
  data: () => ({
    headers: [
      { title: "No.", align: "start", value: "no" },
      { title: "Date", align: "start", value: "date" },
      { title: "Email", align: "start", value: "email" },
      { title: "Message", align: "start", value: "message" }
    ],
    userEmail: [],
  }),
  computed: {
    ...mapState({
      users: (state) => state.user.users,
    }),
  },
  async mounted() {
    this.getData();
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleString();
    },
    async getData() {
      const payload = {
        question: true,
      };
      await this.$store.dispatch("user/getUser", payload);
      console.log("user", this.users);
      this.setDataEmail(this.users);
    },
    setDataEmail(users) {
      console.log("users", users.length);
      const setData = [];
      _.forEach(users, (user) => {
        if (!_.isEmpty(user.questions)) {
          _.forEach(user.questions, (question) => {
            setData.push({
              date: question.createdAt,
              email: user.email,
              message: question.message,
            });
          });
        }
      });
      this.userEmail = setData;
      console.log("useremail", this.userEmail);
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
