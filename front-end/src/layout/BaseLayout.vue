<template>
  <div>
    <div v-if="role == 'admin'">
      <MasterVue />
     
    </div>
    <div v-else>
      <NavbarLogin />

      <v-main>
        <v-container fluid>
            <router-view></router-view>
       
        </v-container>
      </v-main>
      <!-- <MainVue/> -->
      <Footers />
    </div>
  </div>
</template>

<script>
import MasterVue from "./Master.vue";
import Footers from "./Footers.vue";
import Navbar from "./Navbar.vue";
import NavbarLogin from "@/components/NavbarLogin.vue";
// import MainVue from '../views/Main.vue';

export default {
  components: {
    Navbar,
    Footers,
    MasterVue,
    // MainVue,
    NavbarLogin,
  },
  data() {
    return {
      role: localStorage.getItem("role"),
    };
  },

  mounted() {
    console.log("ff",this.role );
  },
};
</script>

<style></style>
