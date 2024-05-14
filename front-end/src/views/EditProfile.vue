<template>
  <div class="container mx-auto mt-4">
    <h2 class="text-3xl font-bold text-center m-9 ">Edit Profile</h2>

    <div
      class="flex items-center flex flex-col w-full px-96 py-3 border-gray-200 rounded-lg"
    >
      <div class="flex flex-col mb-4">
        <label class="mb-2 text-gray-700">Firstname</label>
        <input
          type="text"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-96"
          v-model="user.fname"
        />
        <span class="text-blue-100">{{ fnameError }}</span>
      </div>

      <div class="flex flex-col mb-4">
        <label class="mb-2 text-gray-700">Lastname</label>
        <input
          type="text"
          class="form-input border border-l-gray-300 rounded-md px-2 py-2 w-96"
          v-model="user.lname"
        />
      </div>

      <div class="flex flex-col mb-4">
        <label class="mb-2 text-gray-700">Email</label>
        <input
          type="email"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-96"
          v-model="user.email"
        />
      </div>

      <div class="flex flex-col mb-4">
        <label class="mb-2 text-gray-700">Phone</label>
        <input
          type="tel"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-96"
          v-model="user.phone"
        />
      </div>
      <button
        @click="updateUser()"
        class="w-96 bg-sky-600 text-white font-bold py-2 px-4 rounded-md hover:bg-sky-800"
      >
        Save
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {},
      fname: "",
      lname: "",
      email: "",
      phone: "",
      payload: {
        fname: "",
        lname: "",
        phone: "",
        email: "",
      },
    };
  },
  computed: {
   
  },
  methods: {
    
    async updateUser() {
      // this.payload = {
      //   fname: this.user.fname,
      //   lname: this.user.lname,
      //   email: this.user.email,
      //   phone: this.user.phone,
      // };
      // console.log("userId :", userId);
      console.log("this.payload :", this.user);

      await this.$store.dispatch("user/updateUser", {
        userId: this.user.id,
        newData: this.user,
      });

      console.log("payload", this.user);
    },
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem('user'))
    console.log('user', this.user);

  },
};
</script>
