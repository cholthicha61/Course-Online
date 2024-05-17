<template>
  <div>
    <h1>สวัสดี</h1>
  </div>
</template>

<script>
// router/index.js
import Vue from 'vue';
import Router from 'vue-router';
import EditCourse from '@/components/EditCourse.vue'; 

Vue.use(Router);

export default new Router({
  routes: [
    {
        path: "/edit/:id",
          name: "edit",
          component: () => import("../components/Edit.vue"),
    },
    
  ],
});

</script>

<style>

</style>