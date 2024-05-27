<template lang="">
  <div class="px-8 mt-8">
    <div class="head-course">
      <h1>Manage User</h1>
    </div>
  </div>
  <div class="mt-9">
    <v-data-table-virtual :headers="headers" :items="users">
      <template #item="{ item, index }">
        <tr :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ formatDate(item.createdAt) }}</td>
          <td>{{ item.fname }}</td>
          <td>{{ item.lname }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.phone }}</td>
          <td class="switch-td">
            <v-switch
              v-model="item.active"
              @update:modelValue="updateUser(item)"
              :label="getStatusLabel(item.active)"
              inset
              color="info"
            ></v-switch>
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
  data: () => ({
    headers: [
      { title: "No.", align: "start", value: "index" },
      { title: "CreatedAt", align: "start", value: "createdAt", sortable: true },
      { title: "First Name", align: "start", value: "fname", sortable: true },
      { title: "Last Name", align: "start", value: "lname", sortable: true },
      { title: "Email", align: "start", value: "email", sortable: true },
      { title: "Tel.", align: "start", value: "phone", sortable: true },
      { title: "Status", align: "start", value: "active", sortable: true },
    ],
    users: [],
    status: ["true", "false"],
  }),

  computed: mapState({
    user: (state) => state.user.user,
  }),

  async mounted() {
    await this.getData();
  },

  methods: {
    async getData() {
      await this.$store.dispatch("user/getUser");
      this.users = this.user.map((item, index) => ({ ...item, index: index + 1 }));
    },

    async updateUser(item) {
      const payload = {
        id: item.id,
        active: item.active,
      };
      console.log('====================================');
      console.log(payload);
      console.log('====================================');

      const { isConfirmed } = await Swal.fire({
        title: "Do you want to update status of user?",
        // text: "คุณจะไม่สามารถย้อนกลับสิ่งนี้ได้!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it",
        cancelButtonText: "Cancel",

      });
      if (isConfirmed) {
        await this.$store.dispatch("user/updateStatus", payload);
        Swal.fire({
          title: "Update status of user successfully",
          // text: "เปลี่ยนสถานะสำเร็จ",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        item.active = !item.active;

      }
    },

    formatDate(date) {
      return new Date(date).toLocaleString();
    },
    getStatusLabel(active) {
      return active ? "active" : "inactive";
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

/* .v-data-table {
  overflow-x: auto;
} */

.v-data-table th {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.switch-td {
  min-width: 160px;
  /* กำหนดความกว้างของ td */
}
</style>
