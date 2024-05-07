<template>
   <div class="px-8 mt-8">
    <div class="head-course">
      <h1>Manage User</h1>
    </div>
  </div>
  <div class="mt-9">
    <v-data-table-virtual
      :headers="headers"
      :items="users"
      height="560"
    >
      <template v-slot:[`item.no`]="{ index }">
        {{ index + 1 }}
      </template>
      <!-- <template v-slot:[`item.status`]="{ item }">
        <v-switch
          v-model="item.active"
          color="#0284C7"
          :label="'Activated'"
          hide-details
          inset
        />
      </template> -->

      <template #item="{ item }">
        <tr :key="item.id">
          <td
            class="text-start"
            style="width: 150px; max-width: 150px; word-wrap: break-word"
          >
            {{ item.id }}
          </td>
          <td
            class="text-between"
            style="width: 300px; max-width: 300px; word-wrap: break-word"
          >
          {{ formatDate(item.createdAt) }}
          </td>
          <td style="width: 300px; max-width: 300px; word-wrap: break-word">
            {{ item.fname }}
          </td>
          <td style="width: 300px; max-width: 300px; word-wrap: break-word">
            {{ item.lname }}
          </td>
          <td style="width: 300px; max-width: 300px; word-wrap: break-word">
            {{ item.email }}
          </td>
          <td style="width: 300px; max-width: 300px; word-wrap: break-word">
            {{ item.phone }}
          </td>
          <td style="width: 100px; margin-left: auto">
            <v-switch
              v-model="item.active"
              color="#0284C7"
              hide-details
              inset
            />
          </td>
        </tr>
      </template>
    </v-data-table-virtual>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from 'moment';

export default {
  data: () => ({
    headers: [
      {
        title: "No.",
        align: "start",
        value: "id",
      },
      {
        title: "createdAt",
        align: "start",
        value: "createdAt",
      },
      {
        title: "fName",
        align: "start",
        value: "fname",
      },
      {
        title: "lName",
        align: "start",
        value: "lname",
      },
      {
        title: "Email",
        align: "start",
        value: "email",
      },
      {
        title: "phone",
        align: "start",
        value: "phone",
      },
      {
        title: "status",
        align: "center",
        value: "active",
      },
    ],
    users: [],
  }),

  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
  watch: {
    user(newVal) {
      return newVal;
    },
  },
  async mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      await this.$store.dispatch("user/getUser");
      this.users = JSON.parse(JSON.stringify(this.user));
    },
    formatDate(date) {
      return moment(date).format('llll');
    }
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
