import { createRouter, createWebHistory } from 'vue-router'
import RecomendCourse from '../components/AllCourse.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: () => import("../views/Main.vue"),
    },
  ],
});

export default router;
