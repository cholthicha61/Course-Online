import { createRouter, createWebHistory } from 'vue-router'
import RecomendCourse from '../views/AllCourse.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'recommendcourse',
      component: RecomendCourse
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      
    },
    // {
    //   path: '/home',
    //   name: 'home',
    //   component: '../views/HomeView.vue'
    // }
  ]
})

export default router
