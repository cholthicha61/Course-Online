<template>
  <div
    class="h-screen bg-sky-600"
    id="side-bar"
    :class="dataOpenSideBar == true ? 'side-bar-visible' : 'side-bar-close'"
  >
    <div class="bg-sky-600 h-[50px] flex justify-center items-center">
      <div
        class="text-xl font-bold text-center flex items-center justify-center text-white h-full"
        v-show="dataOpenSideBar"
      >
        Course-online
      </div>
      <img
        src="https://www.jollyboxdesign.com/wp-content/uploads/2021/08/Editor.png"
        v-show="!dataOpenSideBar"
        class="p-1 w-8 h-8 rounded-full ring-2 ring-gray-100 dark:ring-gray-500"
        alt="Avatar"
      />
    </div>
    <div class="flex flex-col justify-between h-[calc(100vh-3rem)] bg-sky-600">
      <div class="menu-man text-left px-2 whitespace-nowrap">
        <div class="profile flex justify-center items-center text-center p-5">
          <div class="text-center text-white" v-show="dataOpenSideBar">
            <div class="flex justify-center">
              <img
                src="https://www.jollyboxdesign.com/wp-content/uploads/2021/08/Editor.png"
                class="p-1 w-24 h-24 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 mb-4"
                alt="Avatar"
              />
            </div>

            <h5 class="text-xl font-medium leading-tight mb-2">
              {{ adminEmail.email }}
            </h5>
            <p class="text-white">Admin</p>
          </div>
        </div>
        <div
          class="hover:bg-sky-400 hover:text-sky-800 py-3 rounded-sm cursor-pointer text-gray-300 px-1"
        >
          <router-link to="/Dashboard" class="px-2 flex space-x-2"
            ><span v-tooltip.right="'Home'"></span>
            <span class="absolute bottom left-9 px-4" v-show="dataOpenSideBar">Home</span></router-link
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-7 h-7 "
          >
            <path
              d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z"
            />
            <path
              d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z"
            />
          </svg>
        </div>
        <div
          class="px-1 hover:bg-sky-400 hover:text-sky-800 py-3 rounded-md cursor-pointer text-gray-300"
        >
          <router-link to="/Inbox" class="px-2 flex space-x-2"
            ><span class="" v-tooltip.right="'Inbox'"></span>
            <span class="absolute bottom left-9 px-4" v-show="dataOpenSideBar">Inbox</span></router-link
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z"
            />
            <path
              d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z"
            />
          </svg>
        </div>
        <div
          class="px-1 hover:bg-sky-400 hover:text-sky-800 py-3 rounded-md cursor-pointer text-gray-300"
        >
          <router-link to="/coursemanage" class="px-2 flex space-x-2"
            ><span class="" v-tooltip.right="'Manage Course'"></span>
            <span class="absolute bottom left-9 px-4" v-show="dataOpenSideBar">Manage Course</span></router-link
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z"
            />
          </svg>
        </div>
        <div
          class="px-1 hover:bg-sky-400 hover:text-sky-800 py-3 rounded-md cursor-pointer text-gray-300"
        >
          <router-link to="/usermanage" class="px-2 flex space-x-2"
            ><span class="" v-tooltip.right="'Manage User'"></span>
            <span class="absolute bottom left-9  px-4" v-show="dataOpenSideBar">Manage User</span></router-link
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataOpenSideBar: Boolean,
  },
  data() {
    return {
      adminEmail: "",
    };
  },
  mounted() {
    this.adminEmail = JSON.parse(localStorage.getItem("user"));
    // this.adminEmail = localStorage.getItem('user')
  },
};
</script>

<style lang="scss" scoped>
.p-tooltip-text {
  font-size: 10px !important;
}

#side-bar {
  overflow: hidden;
  transition: 300ms;
}

.side-bar-visible {
  width: 250px !important;
}

.side-bar-close {
  width: 50px !important;
}
</style>
