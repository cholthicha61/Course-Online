<template>
  <div class="container mx-auto px-4 md:px-0">
    <h2 class="text-3xl font-bold text-center my-5">Edit Profile Teacher</h2>

    <div class="flex flex-col items-center w-full md:px-96 py-3 border-gray-200 rounded-lg">
      <!-- Profile Picture Section -->
      <div class="flex flex-col items-center mb-8">
        <label class="mb-2 text-gray-700">Picture</label>
        <v-file-input
          :rules="rules"
          accept="image/png, image/jpeg, image/bmp"
          label="เพิ่มรูปภาพที่นี่"
          placeholder="Pick an avatar"
          class="w-96"
          v-model="teacher.file"
        ></v-file-input>
      </div>

      <!-- Form Fields -->
      <div class="flex flex-col w-full mb-4">
        <label class="mb-2 text-gray-700">Firstname</label>
        <input
          type="text"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-full"
          v-model="teacher.fname"
        />
        <span class="text-red-500">{{ fnameError }}</span>
      </div>

      <div class="flex flex-col w-full mb-4">
        <label class="mb-2 text-gray-700">Lastname</label>
        <input
          type="text"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-full"
          v-model="teacher.lname"
        />
      </div>

      <div class="flex flex-col w-full mb-4">
        <label class="mb-2 text-gray-700">Email</label>
        <input
          type="email"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-full"
          v-model="teacher.email"
        />
      </div>

      <div class="flex flex-col w-full mb-4">
        <label class="mb-2 text-gray-700">Phone</label>
        <input
          type="tel"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-full"
          v-model="teacher.phone"
        />
      </div>

      <div class="flex flex-col w-full mb-4">
        <label class="mb-2 text-gray-700">Information</label>
        <input
          type="text"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-full"
          v-model="teacher.desc"
        />
      </div>

      <div class="mt-2 w-full">
        <button
          @click="updateUser"
          class="w-full bg-sky-600 text-white font-bold py-2 rounded-md hover:bg-sky-800"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      teacher: {
        fname: '',
        lname: '',
        email: '',
        phone: '',
        desc: '',
        file: null,
      },
      fnameError: '',
      rules: [(v) => !!v || 'Required'], // Example rule
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
  async mounted() {
    this.getTeacher();
  },
  methods: {
    async getTeacher() {
      await this.$store.dispatch("user/getTeacher");
      this.teacher = this.user;
      console.log("teacher", this.teacher);
    },
    async updateUser() {
      // Add validation or other logic if necessary
      await this.$store.dispatch("user/updateUser", {
        userId: this.teacher.id,
        newData: this.teacher,
      });
      console.log("Updated teacher data", this.teacher);
    },
  },
};
</script>
