import { createRouter, createWebHistory } from "vue-router";

const routes =  [
    {
      path: "",
      component: () => import("../layout/BaseLaoutHome.vue"),
      children: [
        {
          path: "/homepage",
          name: "homepage",
          component: () => import("../views/HomePage.vue"),
          meta: { requiresGuest: true },
        },
        {
          path: "/allcourse-user",
          name: "allcourse-user",
          component: () => import("../components/AllCourse.vue"),
          meta: { requiresGuest: true },
        },
        {
          path: "/addcourse",
          name: "addcourse",
          component: () => import("../views/AddCourse.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/inbox",
          name: "inbox",
          component: () => import("../views/Inbox.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/changePassword",
          name: "changePassword",
          component: () => import("../views/ChangePassword.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/coursemanage",
          name: "coursemanage",
          component: () => import("../views/CourseManage.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/allconfirm",
          name: "allconfirm",
          component: () => import("../views/AllconfrimedCourse.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/editcourse",
          name: "Editcourse",
          component: () => import("../components/EditCourse.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: '/editcourse/:id',
          name: 'EditCourse',
          component: () => import("../components/EditCourse.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/usermanage",
          name: "usermanage",
          component: () => import("../views/UserManage.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/category",
          name: "category",
          component: () => import("../views/Category.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/courseorder",
          name: "courseorder",
          component: () => import("../components/CourseOrder.vue")
        },
        {
          path: "/teacherprofile",
          name: "teacherprofile",
          component: () => import("../views/EditProfileTeachaer.vue")
        },
        // {
        //   path: "/teacherprofiles",
        //   name: "teacherprofiles",
        //   component: () => import("../views/ProFile.vue")
        // }
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
          meta: { requiresAuth: true },
        },

        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("../views/Dashboard.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/allcourse",
          name: "allcourse",
          component: () => import("../components/AllCourse.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/interested",
          name: "interested",
          component: () => import("../views/InterestedCourse.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/mycourse",
          name: "mycourse",
          component: () => import("../views/MyCourse.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/edit-profile",
          name: "edit-profile",
          component: () => import("../views/EditProfile.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/detailcourse/:id",
          name: "datailcourse",
          component: () => import("../views/DatailCourse.vue"),
          meta: { requiresAuth: true },
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
          meta: { requiresGuest: true },
        },
        {
          path: "/register",
          name: "register",
          component: () => import("../views/Register.vue"),
          meta: { requiresGuest: true },
        },
      ],
    },
  ]

const router = createRouter({
  history: createWebHistory(),
  routes
})
const isAuthenticated = () => {
  const token = localStorage.getItem("accessToken");
  console.log("token",token);
  return token !== null && token !== undefined;
};


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated()) {
    next({ name: 'login' });
  } else if (to.matched.some(record => record.meta.requiresGuest) && isAuthenticated()) {
    const role = localStorage.getItem("role");
    if (role == 'user') {
      next({ name: 'home' });

    } else {
      next({ name: 'dashboard' });

    }
  } else {
    next();
  }
});

export default router;
