<template>
  <nav class="navbar-container">
    <div class="menu-item" @click="$router.push('/home')"><a>Home</a></div>
    <div class="menu-item" @click="$router.push('/allcourse')"><a>All Course</a></div>
    <DropdownLogin
      class="menu-item dropdown-item"
      :title="userEmail.email"
      :items="services"
    />
  </nav>
</template>

<script>
import DropdownLogin from './DropdownLogin.vue';

export default {
  name: 'NavbarLogin',
  components: {
    DropdownLogin,
  },
  data() {
    return {
      services: [
        {
          title: 'My Course',
          link: '/mycourse',
        },
        {
          title: 'Interested Course',
          link: '/interested',
        },
        {
          title: 'Edit Profile',
          link: '/edit-profile',
        },
        {
          title: "Logout",
          link: "/homepage",
        },
      ],
      userEmail: '',
    };
  },
  mounted() {
    this.userEmail = JSON.parse(localStorage.getItem('user'));
  },
};
</script>

<style scoped>
.navbar-container {
  background-color: #cde5f2;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 50; /* Ensures it is above other content but below the dropdown */
}

.menu-item {
  color: #022a65;
  font-size: 1.125rem; /* 18px, same as Navbar */
  padding: 1rem 1rem;
  position: relative;
  text-align: center;
  display: flex;
  align-items: center; /* Ensures vertical alignment */
  transition: background-color 0.3s, color 0.3s; /* Smooth transition */
  cursor: pointer;
}

.menu-item:hover {
  background-color: #8dd6fd;
  color: #016d9e;
}

.menu-item a {
  color: inherit;
  text-decoration: none;
  display: block;
  width: 100%;
  height: 100%;
}

.dropdown-item {
  padding: 0 1rem;
  position: relative;
}

.dropdown-item .dropdown-menu {
  position: absolute;
  right: 0;
  top: 100%;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 100; /* Ensures the dropdown is on top */
  min-width: 200px; /* Ensures a minimum width for the dropdown */
}

.dropdown-item .dropdown-menu a {
  color: #022a65;
  font-size: 1.125rem; /* 18px, same as Navbar */
  padding: 1rem;
  text-decoration: none;
  display: block;
  transition: background-color 0.3s, color 0.3s; /* Smooth transition */
}

.dropdown-item .dropdown-menu a:hover {
  background-color: #8dd6fd;
  color: #016d9e;
}
</style>
