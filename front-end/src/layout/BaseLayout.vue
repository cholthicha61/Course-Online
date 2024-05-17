<template>
  <div class="flex flex-col min-h-screen">
    <div class="flex-grow">
      <div v-if="role == 'admin'">
        <MasterVue />
      </div>
      <div v-else>
        <NavbarLogin />
        <div class="flex-grow">
          <RouterView />
        </div>
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
