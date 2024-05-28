<template>
  <div class="py-8 px-10 md:px-8">
    <div class="head-course">
      <h1>Dashboard</h1>
      <div
        class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10"
      >
        <div class="">
          <router-link to="/usermanage">
            <DashboardUser />
          </router-link>
        </div>

        <div class="">
          <router-link to="/courseorder">
            <DashboarCourse />
          </router-link>
        </div>
        
        <div class="">
          <router-link to="/inbox">
            <DashboardInbox />
          </router-link>
        </div>

        <div class="">
          <router-link to="/allconfrime">
            <DashboarConfirme />
          </router-link>
        </div>

        <div class="">
          <router-link to="/cancle-order">
            <DashboardCancle />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardUser from "@/components/card/DashboardUser.vue";
import DashboarCourse from "@/components/card/DashboardCourse.vue";
import DashboarConfirme from "@/components/card/DashboardConfirm.vue";
import DashboardInbox from "@/components/card/DashboardInbox.vue";
import DashboardCancle from "@/components/card/DashboardCancle.vue";
export default {
  components: {
    DashboardUser,
    DashboarCourse,
    DashboarConfirme,
    DashboardInbox,
    DashboardCancle
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
