import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: () => import("../views/Main.vue"),
    },
    {
      path: "/usermanage",
      name: "usermanage",
      component: () => import("../views/UserManage.vue"),
    }
  ],
});

export default router;
