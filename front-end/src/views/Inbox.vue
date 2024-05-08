<template>
  <div class="px-8 mt-8">
    <div class="head-course">
      <h1>Inbox</h1>
    </div>
  </div>
  <div class="mt-9">
    <v-data-table-virtual
      :headers="headers"
      :items="emails"
      height="calc(100vh - 280px)"
    >
      <template v-slot:[`item.no`]="{ index }">
        {{ index + 1 }}
      </template>

      <template #item="{ item }">
        <tr :key="item">
          <td
            class="text-between"
            style="width: 300px; max-width: 300px; word-wrap: break-word"
          >
            {{ formatDate(item.date) }}
          </td>
          <td style="width: 300px; max-width: 300px; word-wrap: break-word">
            {{ item.email }}
          </td>
          <td style="width: 300px; max-width: 300px; word-wrap: break-word">
            {{ item.message }}
          </td>
        </tr>
      </template>
    </v-data-table-virtual>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    headers: [
      {
        title: "Date",
        align: "start",
        value: "date",
      },
      {
        title: "Email",
        align: "start",
        value: "email",
      },
      {
        title: "Message",
        align: "start",
        value: "message",
      },
    ],
    emails: [],
  }),
  computed: {
    ...mapState({
      emails: (state) => state.inbox.emails,
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
      await this.$store.dispatch("inbox/getEmail");
      this.emails = JSON.parse(JSON.stringify(this.inbox));

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
