<template>
  <div class="mx-auto">
    <h2 class="text-2xl font-bold text-center my-3">Edit Profile Teacher</h2>
    <div
      class="flex items-center flex-col w-full max-w-lg mx-auto border-gray-200 rounded-lg"
    >
      <div class="flex flex-col w-96">
        <label class="mb-2 text-gray-700">Firstname</label>
        <input
          type="text"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-full"
          v-model="teacher.fname"
        />
        <span class="text-red-500">{{ fnameError }}</span>
      </div>

      <div class="flex flex-col w-96 m-1">
        <label class="mb-2 text-gray-700">Lastname</label>
        <input
          type="text"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-full"
          v-model="teacher.lname"
        />
      </div>

      <div class="flex flex-col w-96 m-1">
        <label class="mb-3 text-gray-700">Email</label>
        <input
          type="email"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-full"
          v-model="teacher.email"
        />
      </div>

      <div class="flex flex-col w-96 m-1">
        <label class="mb-3 text-gray-700">Phone</label>
        <input
          type="tel"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-full"
          v-model="teacher.phone"
        />
      </div>

      <!-- <div class="flex flex-col w-96 m-1">
        <label class="mb-3 text-gray-700">Information</label>
        <input
          type="text"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-full"
          v-model="teacher.desc"
        />
      </div> -->
      <div class="flex flex-col w-96 m-1">
        <label class="mb-3 text-gray-700">Information</label>
        <textarea
          id="detail"
          v-model="teacher.desc"
          class="w-96 p-2 border border-gray-300 rounded"
        ></textarea>
      </div>
      <div class="flex flex-col mb-4 w-96">Picture</div>
      <div class="flex flex-col picture mr-11">
        <v-file-input
          :rules="rules"
          accept="image/png, image/jpeg, image/bmp"
          label="Add Picture"
          placeholder="Pick an avatar"
          class=""
          v-model="teacher.userImage"
        >
        </v-file-input>
      </div>
      <div class="flex flex-col w-96">
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
        fname: "",
        lname: "",
        email: "",
        phone: "",
        desc: "",
        file: null,
      },
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
      await this.$store.dispatch("user/updateUser", {
        userId: this.teacher.id,
        newData: this.teacher,
      });
      console.log("Updated teacher data", this.teacher);
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 100%;
}
.picture {
  width: 82%;
}
</style>
