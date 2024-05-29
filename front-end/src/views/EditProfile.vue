<template>
  <div class="container mx-auto mt-2 px-4 md:px-16 lg:px-64">
    <h2 class="text-3xl font-bold text-center mt-18 md:mt-12 lg:mt-24">Edit Profile</h2>
    <div
      class="flex flex-col items-center w-full py-3 border-gray-200 rounded-lg"
    >
      <div class="flex flex-col w-96">
        <label class="mb-2 text-gray-700">Firstname</label>
        <input
          type="text"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-full"
          v-model="user.fname"
        />
        <span class="text-red-600">{{ fnameError }}</span>
      </div>

      <div class="flex flex-col w-96">
        <label class="mb-2 text-gray-700">Lastname</label>
        <input
          type="text"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-full"
          v-model="user.lname"
        />
      </div>

      <div class="flex flex-col w-96">
        <label class="mb-2 text-gray-700">Email</label>
        <input
          type="email"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-full"
          v-model="user.email"
        />
      </div>

      <div class="flex flex-col w-96">
        <label class="mb-2 text-gray-700">
          Password <span class="text-red-600"></span>
        </label>
        <input
          type="password"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-full"
          v-model="user.password"
        />
        <span class="text-red-600">{{ passwordError }}</span>
      </div>

      <div class="flex flex-col w-96">
        <label class="mb-2 text-gray-700">
          Confirm password <span class="text-red-600"></span>
        </label>
        <input
          type="password"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-full"
          v-model="confirmPassword"
        />
        <span class="text-red-600">{{ confirmPasswordError }}</span>
      </div>

      <div class="flex flex-col mb-2 w-96">
        <label class="mb-2 text-gray-700">Phone</label>
        <input
          type="tel"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-full"
          v-model="user.phone"
        />
      </div>

      <div class="mt-2 w-96">
        <button
          @click="updateUser()"
          class="w-full bg-sky-600 text-white font-bold py-2 px-10 rounded-md hover:bg-sky-800"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      user: {},
      fname: "",
      lname: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      payload: {
        fname: "",
        lname: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    async updateUser() {
      if (this.user.password !== this.confirmPassword) {
        await Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Passwords do not match!',
        });
        return;
      }

      await this.$store.dispatch("user/updateUser", {
        userId: this.user.id,
        newData: this.user,
      });

      this.user = {
        fname: "",
        lname: "",
        email: "",
        phone: "",
        password: "",
      };
      this.confirmPassword = "";
      console.log("User information updated successfully!");
    },
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    console.log("user", this.user);
  },
};
</script>

<style scoped>
</style>
