<template v-slot:text>
    <div class="py-8 px-8">
      <div class="head-course">
        <h1>Inbox</h1>
      </div>
      <v-card class="mt-4">
        <v-text-field
          v-model="search"
          prepend-inner-icon=""
          class="ml-5 mr-5"
          variant="outlined"
          hide-details
          single-line
        >
          <div class="mr-">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
  
          <span class=""> </span>
        </v-text-field>
        <v-data-table
          :headers="headers"
          :items="desserts"
          :search="search"
        ></v-data-table>
      </v-card>
    </div>
  </template>

<script>
export default {
  data() {
    return {
      search: "",
      headers: [
        {
          align: "start",
          key: "name",
          sortable: false,
          title: "Email",
        },
        { key: "message", title: "Message" },
      ],
      desserts: [
        {
          name: "frozen@gmail.com",
          message: "รีวิวคอร์สเรียนเพิ่มเติมหน่อยค่า",
        },
        {
          name: "yogurt@gmail.com",
          message: "ขอรายละเอียดคอร์ส",
        },
        {
          name: "baifern@gmail.com",
          message: "เริ่มเรียนวันที่เท่าไหร่คะ",
        },
        {
          name: "aaa@gmail.com",
          message: "มีคอร์สฝึกพูดภาษามั้ยคะ",
        },
        {
          name: "test@gmail.com",
          message: "รีวิวคอร์สเรียนเพิ่มเติม",
        },
        {
          name: "user01@gmail.com",
          message: "รายละเอียดคอร์สเพิ่มเติม",
        },
        {
          name: "nana@gmail.com",
          message: "อยากทราบราคาเพิ่มเติม",
        },
        {
          name: "alexza01@gmail.com",
          message: "เรียนกี่เดือนคับ",
        },
      ],
    };
  },
};
</script>

<style scoped>
.head-course h1 {
  font-size: 30px;
  color: black;
  border-bottom: 1px solid #9e9e9e;
  font-style: italic;
}
</style>
