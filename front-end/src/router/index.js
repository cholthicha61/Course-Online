import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "",
      component: () => import("../layout/BaseLaoutHome.vue"),
      children: [
        {
          path: "/homepage",
          name: "homepage",
          component: () => import("../views/Main.vue"),
        },
        {
          path: "/allcourse-user",
          name: "allcourse-user",
          component: () => import("../components/AllCourse.vue"),
        },
        {
          path: "/addcourse",
          name: "addcourse",
          component: () => import("../views/AddCourse.vue"),
        },
        {
          path: "/inbox",
          name: "inbox",
          component: () => import("../views/Inbox.vue"),
        },
        {
          path: "/changePassword",
          name: "changePassword",
          component: () => import("../views/ChangePassword.vue"),
        },
        {
          path: "/coursemanage",
          name: "coursemanage",
          component: () => import("../views/CourseManage.vue"),
        },
        {
          path: "/allconfriem",
          name: "allconfriem",
          component: () => import("../views/AllconfrimedCourse.vue"),
        },
        {
          path: "/editcourse",
          name: "editcourse",
          component: () => import("../components/EditCourse.vue"),
        },
        {
          path: "/usermanage",
          name: "usermanage",
          component: () => import("../views/UserManage.vue"),
        },
        {
          path: "/category",
          name: "category",
          component: () => import("../views/Category.vue"),
        },
      ],
    },
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
          component: () => import("../views/Login.vue"),
        },
        {
          path: "/register",
          name: "register",
          component: () => import("../views/Register.vue"),
        },
      ],
    },
  ],
});

export default router;
