<template>
  <div>
    <div id="app" class="bg-sky-200 h-screen">
      <Navbar />
      
    <Banner class="" />

    <ProfileCard />
    <QuestionPopup />
    </div>

  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Banner from "./components/BanNer.vue";
import ProfileCard from "./components/ProFile.vue";
import QuestionPopup from './components/QuestionPopup.vue';
export default {
  components: {
    Navbar,
    Banner,
    ProfileCard,
    QuestionPopup,
  },
};
</script>

<style>
</style>




<script setup>
</script>


<style>
</style>
