import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/layout/BaseLayout.vue"),
      children: [
        {
          path: "/",
          name: "main",
          component: () => import("../views/Main.vue"),
        },
        {
          path: "/admin",
          name: "admin",
          component: () => import("../views/admin.vue"),
        },
      ]
    },

    {
      path: "/home",
      name: "home",
      component: () => import("../views/Home.vue"),
    },
    {
      name: "master",
      path: "/master",
      component: () => import('../layout/Master.vue'),
      // redirect: '/dashboard',
      // children: [
      //   {
      //     name: 'dashboard',
      //     path: '/dashboard',
      //     component: import('../views/Dashboard.vue'),
      //   }
      // ]
      
      },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/Dashboard.vue"),
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("../components/Register.vue"),
    },
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
    {
      path: "/allcourse",
      name: "allcourse",
      component: () => import("../components/AllCourse.vue"),
    },
    // {
    //   path: '/addcourse',
    //   name: 'addcourse',
    //   component: () => import('../components/AddCourse.vue'),
    // },
    
  ],
});

export default router;
