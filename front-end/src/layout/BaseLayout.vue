<template>
  <div>
    <div v-if="role == 'admin'">
      <MasterVue />
    </div>
    <div v-else>
      <NavbarLogin />
      <div>
        <RouterView />
      </div>
      <Footers />
    </div>
  </div>
</template>

<script>
import MasterVue from "./Master.vue";
import Footers from "./Footers.vue";
import Navbar from "./Navbar.vue";
import NavbarLogin from "@/components/NavbarLogin.vue";

export default {
  components: {
    Navbar,
    Footers,
    MasterVue,
    NavbarLogin,
  },
  data() {
    return {
      role: localStorage.getItem("role"),
    };
  },

  mounted() {
    console.log("ff", this.role);
  },
};
</script>

<style></style>
