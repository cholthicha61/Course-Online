<template>
  <div class="flex flex-col min-h-screen">
    <div class="fixed top-0 left-0 w-full z-10">
      <div v-if="role !== 'admin'">
        <NavbarLogin />
      </div>
    </div>
    <div class="flex-grow pt-16"> 
      <div v-if="role == 'admin'">
        <MasterVue />
      </div>
      <div v-else>
        <RouterView />
      </div>
    </div>
    <Footers v-if="role !== 'admin'" class="mt-auto" />
  </div>
</template>

<script>
import MasterVue from "./Master.vue";
import Footers from "./Footers.vue";
import NavbarLogin from "@/components/NavbarLogin.vue";

export default {
  components: {
    MasterVue,
    Footers,
    NavbarLogin,
  },
  data() {
    return {
      role: localStorage.getItem("role"),
    };
  },
  mounted() {
    console.log("Role:", this.role);
  },
};
</script>

<style scoped>
/* Tailwind CSS utilities will handle most of the styling */
</style>
