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
      path: "/home",
      name: "home",
      component: () => import("../views/Home.vue"),
    },
    // {
    //   name: "master",
    //   path: "/",
    //   component: import('../views/layout/Master.vue'),
    //   redirect: '/dashboard',
    //   children: [
    //     {
    //       name: 'dashboard',
    //       path: '/dashboard',
    //       component: import('../views/Dashboard.vue'),
    //     }
    //   ]
    //   },
  ],
});

export default router;
