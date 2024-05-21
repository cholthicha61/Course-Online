<template>
    <div class="menu-item " @click="isOpen = !isOpen">
      <a href="#">
        {{ title }}
      </a>
      <svg viewBox="0 0 1030 638" width="10">
        <path d="M1017 68L541 626q-11 12-26 12t-26-12L13 68Q-3 49 6 24.5T39 0h952q24 0 33 24.5t-7 43.5z" fill="#4A6FA5"></path>
      </svg>
      <transition name="fade" appear>
        <div class="sub-menu" v-if="isOpen">
          <div v-for="(item, i) in items" :key="i" class="menu-item py-3 px-3 hover:text-sky-800 hover:bg-sky-300 bg-sky-200">
            <a :href="item.link" @click="logout(item)">{{ item.title }}</a>
          </div>
        </div>
      </transition>
    </div>
  </template>
  
  <script>
  export default {
    name: 'dropdown',
    props: ['title', 'items'],
    data () {
      return {
        isOpen: false
      }
    },
    methods: {
        async logout(item) {
            console.log('logout',item.title);
            
            if(item.title == 'Logout') {
                await this.$store.dispatch('auth/logout')
                localStorage.removeItem('user');
                localStorage.removeItem('role');
                localStorage.removeItem('accessToken'); 
                router.push('/homepage'); 

            }
        }
    }
  }
  </script>
  
  <style scoped>
  nav .menu-item svg {
    width: 10px;
    margin-left: 10px;
  }
  
  nav .menu-item .sub-menu {
    position: absolute;
    background-color: #ffffff;
    top: calc(100% + 3px);
    left: 59%;
    transform: translateX(-50%);
    width: max-content;
    border-radius: 0px 16px 16px 16px;
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: all .5s ease-out;
  }
  
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  </style>