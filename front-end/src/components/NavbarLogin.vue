<template>
<nav class="px-5 flex items-center justify-end text-lg">
      <div class="menu-item hover:text-sky-500"><a href="#">Home</a></div>
      <div class="menu-item hover:text-sky-500"><a href="#">All Course</a></div>
      <Dropdown class="hover:text-sky-500" title="Menu" :items="services" />
    </nav>
  </template>
  
  <script>
import Dropdown from './Dropdown.vue'
  export default {
    name: 'navbar',
    components: {
      Dropdown
    },
    data () {
      return {
        services: [
          {
            title: 'My Course',
            link: '#'
          },
          {
            title: 'Interested Course',
            link:'#'
          },
          {
            title: 'Question',
            link: '#'
          },
          {
            title: 'Edit Profile',
            link: '#'
          },
          {
            title: 'Logout',
            link: '#'
          },
        ]
      }
    }
  }
  </script>
  
  <style>
  nav {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  nav .menu-item {
    color: #4A6FA5;
    padding: 10px 20px;
    position: relative;
    text-align: center;
    border-bottom: 3px solid transparent;
    display: flex;
    transition: 0.4s;
  }
  
  nav .menu-item.active,
  nav .menu-item:hover {
    background-color: #C0D6DF;
    border-bottom-color: #4A6FA5;
  }
  
  nav .menu-item a {
    color: inherit;
    text-decoration: none;
  }
  </style>