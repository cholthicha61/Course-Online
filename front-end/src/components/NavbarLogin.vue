<template>
  <nav class="px-5 flex items-center justify-end text-lg">
    <div class="menu-item "><a href="/home">Home</a></div>
    <div class="menu-item "><a href="/allcourse">All Course</a></div>

    <DropdownLogin
      class="hover:text-sky-500 px-8"
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
          link: "#",
        },
        {
          title: "Interested Course",
          link: "#",
        },
        {
          title: "Question",
          link: "#",
        },
        {
          title: "Edit Profile",
          link: "#",
        },
        {
          title: "Logout",
          link: "/login",
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
  color: #4a6fa5;
  padding: 16px 20px;
  position: relative;
  text-align: center;
  border-bottom: 3px solid transparent;
  display: flex;
  transition: 0.4s;
  
}

nav .menu-item.active,
nav .menu-item:hover {
  background-color: #bae6fd;
}

nav .menu-item:hover {
  color: #0ea5e9;
}
nav .menu-item a {
  color: inherit;
  text-decoration: none;
}
</style>
