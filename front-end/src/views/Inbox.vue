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
          <td v-if="item.email == null">{{ (item.user.email) }}</td>
          <td v-else>{{ (item.email) }}</td>

          <td>{{ (item.message) }}</td>
        </tr>
      </template>

            <!-- <template v-slot:[`item.name`]="{ item }">
        <b class="border-2 border-red-500">{{ item.name }}</b>
      </template> -->


    </v-data-table-virtual>
  </div>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";
export default {
  data: () => ({
    headers: [
    {
        title: "No.", 
        align: "start", 
        value: "no"

      },
      {
        title: "Date",
        align: "start",
        value: "date",
        sortable: true
      },
      {
        title: "Email",
        align: "start",
        value: "email",
        sortable: true
      },
      {
        title: "Message",
        align: "start",
        value: "message",
        sortable: true 
      },
      
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
      console.log("wwwwww",this.email);
    },
    }
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
