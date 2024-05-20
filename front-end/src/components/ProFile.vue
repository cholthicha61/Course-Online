<template>
  <div class="flex justify-center items-center">
    <div
      class="w-100 max-w-screen-lg p-8 bg-stone-200 rounded-lg shadow-lg hover:shadow-xl"
    >
      <div class="flex justify-center">
        <img
          src="../../public/img/PTeacherEng.jpg"
          alt="Profile Image"
          class="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md transition duration-500 transform hover:scale-110"
        />
      </div>
      <div class=" mt-4">
        <h2 class="text-center text-xl text-gray-700 font-semibold hover:text-sky-500">
          <!-- คุณครูเพ็ญศรี ตลก76ฉาก -->
          {{teacher.fname}} {{teacher.lname}}
        </h2>
        <div class="text-x text-gray-700 mt-2">
          <p>
            อีเมล:
            <span class="font-medium hover:text-gray-400">{{teacher.email}}</span>
          </p>
          <p>
            โทรศัพท์:
            <span class="font-medium hover:text-gray-400">{{teacher.phone}}</span>
          </p>
        </div>
        <p class="text-sm text-gray-600 mt-2 hover:text-gray-400">
          ประวัติผู้สอน: {{teacher.desc}}
        </p>
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

<style>
</style>
