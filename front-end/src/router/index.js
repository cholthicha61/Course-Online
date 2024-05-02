import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "",
      component: () => import("@/layout/BaseLayout.vue"),
      children: [
        {
          path: "/home",
          name: "home",
          component: () => import("../views/Main.vue"),
        },
        {
          path: "/admin",
          name: "admin",
          component: () => import("../views/admin.vue"),
        },
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("../views/Dashboard.vue"),
        },
        {
          path: "/allcourse",
          name: "allcourse",
          component: () => import("../components/AllCourse.vue"),
        },
      ],
    },
    {
      path: "",
      component: () => import("../layout/FullPage.vue"),
      children: [
        {
          path: "/login",
          name: "login",
          component: () => import("../components/Login.vue"),
        },
        {
          path: "/register",
          name: "register",
          component: () => import("../components/Register.vue"),
        },
      ],
    },
  ],
});

export default router;
