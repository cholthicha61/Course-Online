<template>
  <nav class=" px-5 flex items-center justify-end text-lg bg-sky-200">
    <div @click="$router.push('/home')" class="menu-item "><a >Home</a></div>
    <div @click="$router.push('/allcourse')" class="menu-item "><a >All Course</a></div>

    <DropdownLogin
      class="hover:text-sky-800 px-4"
      :title="userEmail.email"
      :items="services"
      style="z-index: 99"
    />

  </nav>
</template>

<script>
import DropdownLogin from "./DropdownLogin.vue";
// import Dropdown from './Dropdown.vue'
export default {
  name: "navbar",
  components: {
    DropdownLogin,
  },
  data() {
    return {
      services: [
        {
          title: "My Course",
          link: "/mycourse",
        },
        {
          title: "Interested Course",
          link: "/interested",
        },
        {
          title: "Edit Profile",
          link: "/edit-profile",
        },
        {
          title: "Logout",
          link: "/homepage",
        },
      ],
      userEmail: ''
    };
  },

  mounted() {
    this.userEmail = JSON.parse(localStorage.getItem('user'))
  }
};
</script>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: center;
}

nav .menu-item {
  color: #022a65;
  padding: 16px 20px;
  position: relative;
  text-align: center;
  border-bottom: 3px solid transparent;
  display: flex;
  transition: 0.4s;
  
}

nav .menu-item.active,
nav .menu-item:hover {
  background-color: #8dd6fd;
}

nav .menu-item:hover {
  color: #0c9ee2;
}
nav .menu-item a {
  color: inherit;
  text-decoration: none;
  
}
</style>
