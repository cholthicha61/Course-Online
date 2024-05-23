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
