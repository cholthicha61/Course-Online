<template>
  <div>
    <div class="flex-grow">
      <Banner />
    </div>

    <div class="">
      <AllCourseUnlog />
    </div>

    <v-container>
      <div class="head-course">
        <h1>Profile</h1>
      </div>
    </v-container>
    <div class="py-7">
      <ProfileCard />
    </div>

    <div class="">
      <Question />
    </div>
  </div>
  <!-- </v-container> -->
</template>

<script>
import Banner from "@/components/BanNer.vue";
import ProfileCard from "../components/ProFile.vue";
import Login from "../components/Login.vue";
import Register from "../views/Register.vue";
import Question from "@/components/Question.vue";
import AllCourseUnlog from "@/components/AllCourseUnlog.vue";
export default {
  components: {
    Banner,
    ProfileCard,
    AllCourseUnlog,
    Login,
    Register,
    Question
  },
};
</script>

<style scoped>
.head-course h1 {
  font-size: 30px;
  color: black;
  border-bottom: 1px solid #9e9e9e;
  font-style: italic;
}
body {
  font-family: Kanit;
}
header {
  line-height: 1.5;
  max-height: 100vh;
}
</style>
