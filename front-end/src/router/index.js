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

    {
      path: "/R3",
      name: "Register",
      component: () => import("../components/Register.vue"),
    },
    {
          path: '/login',
          name: 'login',
          component: () => import('../components/Login.vue'),
        
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../components/Register.vue'),
    },
    {
      path: '/allcourse',
      name: 'allcourse',
      component: () => import('../components/AllCourse.vue'),
    }
  ],
});

export default router;
