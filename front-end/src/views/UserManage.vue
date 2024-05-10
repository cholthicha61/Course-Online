<template>
  <div class="px-8 mt-8">
    <div class="head-course">
      <h1>Manage User</h1>
    </div>
  </div>
  <div class="mt-9">
      
    <v-data-table-virtual :headers="headers" :items="users" height="560">
      <template v-slot:[`item.no`]="{ index }">
        {{ index + 1 }}
      </template>

      <template #item="{ item }">
        <tr :key="item.id">
          <td
            style="
              width: 150px;
              min-width: 150px;
              max-width: 150px;
              text-align: center;
              word-wrap: break-word;
            "
          >
            {{ item.id }}
          </td>
          <td
            style="
              width: 250px;
              min-width: 250px;
              max-width: 250px;
              text-align: start;
              word-wrap: break-word;
            "
          >
            {{ formatDate(item.createdAt) }}
          </td>
          <td
            style="
              width: 300px;
              min-width: 300px;
              max-width: 300px;
              text-align: start;
              word-wrap: break-word;
            "
          >
            {{ item.fname }}
          </td>
          <td
            style="
              width: 300px;
              min-width: 300px;
              max-width: 300px;
              text-align: start;
              word-wrap: break-word;
            "
          >
            {{ item.lname }}
          </td>
          <td
            style="
              width: 300px;
              min-width: 300px;
              max-width: 300px;
              text-align: start;
              word-wrap: break-word;
            "
          >
            {{ item.email }}
          </td>
          <td
            style="
              width: 200px;
              min-width: 200px;
              max-width: 200px;
              text-align: start;
              word-wrap: break-word;
            "
          >
            {{ item.phone }}
          </td>
          <td
            style="
              width: 150px;
              min-width: 150px;
              max-width: 150px;
              text-align: center;
            "
          >
            <v-btn
              :class="{ 'green-btn': item.active, 'red-btn': !item.active }"
              @click="handleClick"
              >Click</v-btn
            >
            {{ item.active }}
          </td>
        </tr>
      </template>
    </v-data-table-virtual>
  </div>
</template>

<script >
import { mapState } from "vuex";
import moment from "moment";
import Swal from "sweetalert2";

export default {
  data: () => ({
    headers: [
      {
        title: "No.",
        align: "center",
        value: "id",
      },
      {
        title: "CreatedAt",
        align: "start",
        value: "createdAt",
      },
      {
        title: "First Name",
        align: "start",
        value: "fname",
      },
      {
        title: "Last Name",
        align: "start",
        value: "lname",
      },
      {
        title: "Email",
        align: "start",
        value: "email",
      },
      {
        title: "Tel.",
        align: "start",
        value: "phone",
      },
      {
        title: "Status",
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
    async updateUser() {
      await this.$store.dispatch("user/updateUser");
    },
    formatDate(date) {
      return moment(date).format("lll");
    },
    handleClick() {
      console.log("Click Click Clik");
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Change status!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Changed!",
            text: "Status change.",
            icon: "success",
          });
        }
      });
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
.green-btn {
  background-color: green;
  color: white;
}
.red-btn {
  background-color: red;
  color: white;
}
</style>
