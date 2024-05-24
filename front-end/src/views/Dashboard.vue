<template>
  <div class="py-8 px-4 md:px-8">
    <div class="head-course">
      <h1>Dashboard</h1>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8"
      >
        <div class="py-8">
          <DashboardUser />
        </div>
        <div class="py-8">
          <router-link to="/courseorder">
            <DashboarCourse />
          </router-link>
        </div>
        <div class="py-8">
          <router-link to="/allconfirm">
            <DashboarConfirme />
          </router-link>
        </div>
        <div class="py-8">
          <DashboardInbox />
        </div>
      </div>
      <!-- <div class="mt-8">
        <AllSales />
      </div> -->
      <!-- <div class="">
          <Sale />
      </div> -->
    </div>
  </div>
</template>

<script>
import DashboardUser from "@/components/card/DashboardUser.vue";
import DashboarCourse from "@/components/card/DashboardCourse.vue";
import DashboarConfirme from "@/components/card/DashboardConfirm.vue";
import DashboardInbox from "@/components/card/DashboardInbox.vue";
import Sale from "@/components/card/Sales.vue";
import AllSales from "@/components/card/AllSales.vue";

export default {
  components: {
    DashboardUser,
    DashboarCourse,
    DashboarConfirme,
    DashboardInbox,
    Sale,
    AllSales,
  },
};
</script>

<style scoped>
.head-course h1 {
  font-size: 30px;
  color: rgb(11, 94, 188);
  border-bottom: 1px solid #d9d9d9;
  font-style: italic;
}
</style>
