<template>
  <div class="bg-sky-200 h-screen">
    <div class="fixed w-full">
      <Navbar />

    </div>
      <div class="w-full h-full"></div>
     <Banner class="" />

    <ProfileCard />
    <QuestionPopup />

      <Footer />
    </div>

</template>

<script>
import Navbar from "./components/Navbar.vue";
import Banner from "./components/BanNer.vue";
import ProfileCard from "./components/ProFile.vue";
import QuestionPopup from './components/QuestionPopup.vue';
import Footers from "./components/Footers.vue";
export default {
  components: {
    Navbar,
    Banner,
    ProfileCard,
    QuestionPopup,
    Footers,
  },
};
</script>

