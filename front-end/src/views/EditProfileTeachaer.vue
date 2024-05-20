<template>
  <div class="container mx-auto">
    <h2 class="text-3xl font-bold text-center m-9">Edit Profile Teacher</h2>
    <div
      class="flex items-center flex-col w-full px-96 py-3 border-gray-200 rounded-lg"
    >
      <div class="flex flex-col">
        <label class="mb-2 text-gray-700">ชื่อ</label>
        <input
          type="text"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-96"
        />
        <span class="text-blue-100">{{ fnameError }}</span>
      </div>

      <div class="flex flex-col mb-4">
        <label class="mb-2 text-gray-700">นามสกุล</label>
        <input
          type="text"
          class="form-input border border-l-gray-300 rounded-md px-2 py-2 w-96"
        />
      </div>

      <div class="flex flex-col mb-4">
        <label class="mb-2 text-gray-700">อีเมล</label>
        <input
          type="email"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-96"
        />
      </div>

      <div class="flex flex-col mb-4">
        <label class="mb-2 text-gray-700">โทรศัพท์</label>
        <input
          type="tel"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-96"
        />
      </div>
      <div class="flex flex-col mb-4">
        <label class="mb-2 text-gray-700">ประวัติผู้สอน</label>
        <input
          type="tel"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-96"
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
        <button
          @click="updateUser()"
          class="w-96 bg-sky-600 text-white font-bold py-2 px-10 rounded-md hover:bg-sky-800"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    rules: [
      (value) => {
        return (
          !value ||
          !value.length ||
          value[0].size < 2000000 ||
          "Avatar size should be less than 2 MB!"
        );
      },
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
};
</script>
<style scoped>
.picture {
  margin-right:50%;
  
}
</style>
