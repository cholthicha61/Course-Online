<template>
  <div class="px-8 mt-8">
    <div class="head-course">
      <h1>Inbox</h1>
    </div>
  </div>
  <div class="mt-9">
    <v-data-table-virtual :headers="headers" :items="users" height="calc(100vh - 280px)">
      <template v-slot:[`item.no`]="{ index }">
        {{ index + 1 }}
      </template>

      <template #item="{ item }">
        <tr :key="item.id">
          <td class="text-between" style="width: 300px; max-width: 300px; word-wrap: break-word">{{ item.createdAt }}</td>
          <td style="width: 300px; max-width: 300px; word-wrap: break-word">{{ item.fname }}</td>
          <td style="width: 300px; max-width: 300px; word-wrap: break-word">{{ item.email }}</td>
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
    users: [],
  }),
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
