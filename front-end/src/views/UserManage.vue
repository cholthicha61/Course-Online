<template>
  <div>
    <v-data-table-virtual
      :headers="headers"
      :items="virtualUsers"
      item-value="name"
      class="center-headers"
    >
      <template #item="{ item }">
        <tr :key="item.name">
          <td class="text-start">{{ item.number }}</td>
          <td class="text-start">{{ item.name }}</td>
          <td class="text-start">{{ item.email }}</td>
          <td class="text-start">
            <v-switch
            v-model="item.status"
            color="primary"
            :label="'Activated'"
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
export default {
  data() {
    return {
      model: true,
      headers: [
        { title: "No.", align: "start", value: "number" },
        { title: "Name", align: "start", value: "name" },
        { title: "Email", align: "start", value: "email" },
        { title: "Status", align: "start", value: "status" },
      ],
      users: [
        {
          number: "",
          name: "Yarnnawit jajajajaja",
          email: "YarnnawitYarnnawit@gmail.com",
          status: true,
        },
        {
          number: "",
          name: "BubuIsdog dog",
          email: "BubuIsdogBubuIsdog@gmail.com",
          status: false,
        },
        {
          number: "",
          name: "cat bebebebee",
          email: "bebebebeebebebebee@gmail.com",
          status: false,
        },
      ],
    };
  },

  computed: {
    virtualUsers() {
      return [...Array(20).keys()].map((i) => {
        const user = { ...this.users[i % this.users.length] };
        user.number = `${user.number} ${i + 1}`;
        return user;
      });
    },
  },
};
</script>

<style scoped>
.text-start {
  text-align: start;
}

.text-end {
  text-align: end;
}
</style>
