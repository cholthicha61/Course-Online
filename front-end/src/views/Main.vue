<template>
  <div>
    <!-- <login /> -->
    <div class="flex-grow">
      <Banner />
    </div>

    <div class="">
      <AllCourse />
    </div>

    <!-- <div> 
        <div class="py-4">
        <div class="sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl max-w-screen-lg mx-auto">
        <h1 class="py-4 font-bold text-black border-b-2 border-gray-400 w-full">Profile</h1>
      <div class="sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl max-w-screen-2xl mx-auto border-b-2 border-black"> 
             <h1 class="rounded py-2 px-9 md:text-2xl italic font-bold"> Profile </h1>
    </div> -->

    <v-container class="head-course">
      <h1>Profile</h1>
    </v-container>
    <div class="py-8 w-full">
      <ProfileCard />
    </div>
    <div class="">
      <QuestionPopup />
    </div>
  </div>
</template>

<script>
import Banner from "@/components/BanNer.vue";
import ProfileCard from "../components/Profile.vue";
import QuestionPopup from "@/components/QuestionPopup.vue";
import AllCourse from "../components/AllCourse.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";


export default {
  components: {
    Banner,
    ProfileCard,
    QuestionPopup,
    AllCourse,
    Login,
    Register,
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
</style>
