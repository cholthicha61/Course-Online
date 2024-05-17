<template>
  <div class="container mx-auto">
    <h2 class="text-3xl font-bold text-center m-5">Edit Profile Teacher</h2>
    <div
      class="flex items-center flex-col w-full px-96 border-gray-200 rounded-lg"
    >
      <div class="flex flex-col ">
        <label class="mb-2 text-gray-700">ชื่อ</label>
        <input
          type="text"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-96"
          v-model="teacher.fname"
        />
        <span class="text-blue-100">{{ fnameError }}</span>
      </div>

      <div class="flex flex-col mb-4">
        <label class="mb-2 text-gray-700">นามสกุล</label>
        <input
          type="text"
          class="form-input border border-l-gray-300 rounded-md px-2 py-2 w-96"
          v-model="teacher.lname"
        />
      </div>

      <div class="flex flex-col mb-4">
        <label 
        class="mb-2 text-gray-700" >อีเมล</label>
        
        <input
          type="email"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-96"
          v-model="teacher.email"
        />
      </div>

      <div class="flex flex-col mb-4">
        <label class="mb-2 text-gray-700">โทรศัพท์</label>
        <input
          type="tel"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-96"
          v-model="teacher.phone"
        />
      </div>
      <div class="flex flex-col mb-4">
        <label class="mb-2 text-gray-700">ประวัติผู้สอน</label>
        <input
          type="tel"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-96"
          v-model="teacher.desc"
        />
      </div>
      <label  class="picture mb-2 text-gray-700" >รูปภาพ</label>
      <v-file-input
        :rules="rules"
        accept="image/png, image/jpeg, image/bmp"
        label="เพิ่มรูปภาพที่นี่"
        placeholder="Pick an avatar"
        style="width: 430px"
        class="mr-4"      
        v-model="teacher.file"
        >
      </v-file-input>
      <div class="">
        <button
          @click="updateUser()"
          class="w-96 bg-sky-600 text-white font-bold py-2  rounded-md hover:bg-sky-800"
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
      teacher: [],
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
  },
};
</script>

<style scoped>
.picture {
  margin-right:67%;
  
}
</style>
