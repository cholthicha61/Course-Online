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
import Swal from "sweetalert2";
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
        linkEmail: "",
        linkFacebook: "",
        linkLine: "",
        userImage: null,
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
      console.log("User data from Vuex:", this.user); // ตรวจสอบข้อมูลที่ได้จาก Vuex store
      this.teacher = { ...this.user }; 
    },
    isWhitespaceOrEmpty(string) {
      return !string || !string.trim();
    },
    async updateTeacher() {
      if (
        this.isWhitespaceOrEmpty(this.teacher.fname) ||
        this.isWhitespaceOrEmpty(this.teacher.lname) ||
        this.isWhitespaceOrEmpty(this.teacher.email) ||
        this.isWhitespaceOrEmpty(this.teacher.phone) 
      ) {
        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill out all fields without whitespace!",
        });
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.teacher.email)) {
        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter a valid email address!",
        });
        return;
      }
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(this.teacher.phone)) {
        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter a valid phone number!",
        });
        return;
      }
      if (this.teacher.userImage instanceof File) {
        await this.$store.dispatch("user/updateTeacher", {
          newData: {
            fname: this.teacher.fname,
            lname: this.teacher.lname,
            phone: this.teacher.phone,
            email: this.teacher.email,
            desc: this.teacher.desc,
            linkEmail: this.teacher.linkEmail,
            linkFacebook: this.teacher.linkFacebook,
            linkLine: this.teacher.linkLine,
            userImage: this.teacher.userImage,
          },
        });
      } else {
        await this.$store.dispatch("user/updateTeachernoImage", {
          newData: {
            fname: this.teacher.fname,
            lname: this.teacher.lname,
            phone: this.teacher.phone,
            email: this.teacher.email,
            desc: this.teacher.desc,
            linkEmail: this.teacher.linkEmail,
            linkFacebook: this.teacher.linkFacebook,
            linkLine: this.teacher.linkLine,
          },
        });
      }
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
