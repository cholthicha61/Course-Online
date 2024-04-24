<template>
  <div class="">
      <Navbar />
    <div class="flex-grow">
      <Banner class="" />
    </div>
    <div> 
       <h1 class=" py-2 px-7 md:text-2xl italic font-bold"> Profile </h1>
    <div class="py-8 w-full border-2 border-gray-200">
          <ProfileCard />
    </div>    
    </div>
  
    <QuestionPopup />
  
    <Footers/>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Banner from "./components/BanNer.vue";
import ProfileCard from "./components/ProFile.vue";
import QuestionPopup from './components/QuestionPopup.vue';
import Footers from './components/Footers.vue';

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

