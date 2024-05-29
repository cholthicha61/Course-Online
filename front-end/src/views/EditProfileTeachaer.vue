<template>
  <div class="mx-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl">
    <div class="container mx-auto mt-2 px-0 md:px-16 lg:px-64">
      <h2 class="text-2xl font-bold text-center my-6">Edit Profile Teacher</h2>
      <div class="flex items-center flex-col w-full max-w-lg mx-auto border-gray-200 rounded-lg">
        <div class="flex flex-col w-full md:w-96 mb-4">
          <label class="mb-2 text-gray-700">Firstname</label>
          <input type="text" class="form-input border border-gray-300 rounded-md px-2 py-2 w-full"
            v-model="teacher.fname" />
          <span class="text-red-500">{{ fnameError }}</span>
        </div>

        <div class="flex flex-col w-full md:w-96 mb-4">
          <label class="mb-2 text-gray-700">Lastname</label>
          <input type="text" class="form-input border border-gray-300 rounded-md px-2 py-2 w-full"
            v-model="teacher.lname" />
        </div>

        <div class="flex flex-col w-full md:w-96 mb-4">
          <label class="mb-2 text-gray-700">Email</label>
          <input type="email" class="form-input border border-gray-300 rounded-md px-2 py-2 w-full"
            v-model="teacher.email" />
        </div>

        <div class="flex flex-col w-full md:w-96 mb-4">
          <label class="mb-2 text-gray-700">Phone</label>
          <input type="tel" class="form-input border border-gray-300 rounded-md px-2 py-2 w-full"
            v-model="teacher.phone" />
        </div>
        <div class="flex flex-col w-full md:w-96 mb-4">
          <label class="flex flex-col w-full md:w-96 mb-4 text-gray-700">Information</label>
          <textarea id="detail" v-model="teacher.desc"
            class="flex flex-col w-full md:w-96 mb-4 p-2 border border-gray-300 rounded"></textarea>
        </div>
        <div class="flex flex-col w-full md:w-96 mb-4">Picture</div>
        <div class="flex flex-col picture mr-11">
          <v-file-input variant="outlined" accept=".jpg,.png,.gif" label="Add Picture" placeholder="Pick an avatar"
            v-model="teacher.userImage">
          </v-file-input>
        </div>
        <div class="flex flex-col w-full md:w-96 mb-4">
          <button @click="updateUser" class="w-full bg-sky-600 text-white font-bold py-2 rounded-md hover:bg-sky-800">
            Save
          </button>
        </div>
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
      files: {
        name: "",

      }

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
      this.files.name = this.teacher.userImage;
      console.log("teacher", this.teacher);
      console.log("teacherwwwwww", this.files.name);
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
