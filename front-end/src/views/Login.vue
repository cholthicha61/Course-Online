<template>
  <div class="container mx-auto max-w-sm mt-16">
    <h2 class="text-3xl font-bold text-center">Login Account</h2>
  
    <form @submit.prevent="Login" class="mt-6">
      <div class="mt-6">
        <label for="email" class="block mb-2">Email</label>
        <input type="email" id="email" v-model="payload.email" class="w-full p-2 border rounded-md focus:outline-none" @keydown.enter="submitForm">
      </div>
  
      <div class="mt-6">
        <label for="password" class="block mb-2">Password</label>
        <input type="password" id="password" v-model="payload.password" class="w-full p-2 border rounded-md focus:outline-none" @keydown.enter="submitForm">
      </div>

      <!-- Additional fields or elements -->

      <div class="mt-6">
        <button type="submit" class="w-full bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-800 transition-colors">
          Login
        </button>
      </div>
    </form>

    <!-- Other elements -->
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      payload: {
        email: '',
        password: ''
      }
    };
  },

  computed: {
    ...mapState({
      profile: (state) => state.auth.profile
    })
  },

  methods: {
    async Login() {
      await this.$store.dispatch('auth/login', this.payload);
    },

    submitForm() {
      this.Login(); 
    }
  }
};
</script>
