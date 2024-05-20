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
      <label class="picture mb-2 text-gray-700">รูปภาพ</label>
      <!-- <div
          id="image-preview-1"
          class="max-w-sm p-6 mb-4 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer mr-4 overflow-scroll-y"
        >
          <input
            id="upload-1"
            type="file"
            class="hidden"
            accept=".jpg,.png,.gif"
            multiple
            @change="handleFileUpload($event)"
          />
          <label
            v-if="user.userImage.length == 0"
            for="upload-1"
            class="cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-8 h-8 text-gray-700 mx-auto mb-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-700">
              Upload picture
            </h5>
            <p class="font-normal text-sm text-gray-400 md:px-6">
              Choose photo size should be less than
              <b class="text-gray-600">2mb</b>
            </p>
            <p class="font-normal text-sm text-gray-400 md:px-6">
              and should be in
              <b class="text-gray-600">JPG, PNG, or GIF</b> format.
            </p>
          </label>
          <div v-for="(item, i) in course.images" :key="i">
            <span class="text-gray-500 bg-gray-200 z-50">{{ item.name }}</span>
          </div>
        </div> -->
      
      <v-file-input
        :rules="rules"
        accept="image/png, image/jpeg, image/bmp"
        label="เพิ่มรูปภาพที่นี่"
        placeholder="Pick an avatar"
        style="width: 430px"
        class="mr-8"
      >
      </v-file-input>
      <div class="mt-3">

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
<<<<<<< HEAD
    ],
  }),

  methods: {
    uploadImage() {
      axios
        .post("teacherprofile/teacherprofile", formData)
        .then((response) => {
          console.log("Teacherprofile added successfully", response);
          // this.$store.dispatch("addCourse", response.data);
        })
        .catch((error) => {
          console.error("Failed to add course", error);
        });
    },
  }
=======
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
>>>>>>> baifern-dev
};
</script>
