<template>
  <div id="app" style="font-family: 'Kanit'">
    <v-app>
      <v-main>
        <Navbar />
        <div class="mt-24">
          <RouterView />
        </div>
        <Footers />
        <!-- <Master/> -->
      </v-main>
    </v-app>
</div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import Footers from "./components/Footers.vue";
import Master from "./views/layout/Master.vue";
</script>

<style scoped lang="scss">
ิิbody {
  font-family: Kanit;
}
header {
  line-height: 1.5;
  max-height: 100vh;
}

</style>
