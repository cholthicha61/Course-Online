import { createRouter, createWebHistory } from "vue-router";
import RecomendCourse from "../views/AllCourse.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: () => import("../views/Main.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AllCourse.vue"),
    },
  ],
});

export default router;
