<template>
    <div class="container mx-auto max-w-sm mt-16">
      <h2 class="text-3xl font-bold text-center">Login Account</h2>
  
        <div class="mt-6">
          <label for="email" class="block mb-2">Email</label>
          <input type="email" id="email" v-model="payload.email" class="w-full p-2 border rounded-md focus:outline-none">
        </div>
  
        <div class="mt-6">
          <label for="password" class="block mb-2">Password</label>
          <input type="password" id="password" v-model="payload.password" class="w-full p-2 border rounded-md focus:outline-none">
        </div>
  
        <div class="mt-4 flex items-center">
          <input type="checkbox" id="savePassword" v-model="savePassword" class="mr-2">
          <label for="savePassword" class="text-sm">Save Password</label>
        </div>
  
        <div class="mt-4">
          <a href="#" class="text-sm text-gray-500 hover:text-gray-600">Forgot Password?</a>
        </div>
  
        <div class="mt-6">
          <button @click="Login()" type="submit" class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
            Login
          </button>
        </div>

  
      <div class="mt-6 text-center">
        <p>Don't have an account? <a href="#" class="text-blue-500 hover:text-blue-600">Create Account</a></p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        payload: {
          email: '',
          password: ''
        }
        
      };
    },
  
    methods: {
      handleSubmit(event) {
        event.preventDefault();
  
        console.log('Login submitted:', this.email, this.password);
  
        this.email = '';
        this.password = '';
        // this.savePassword = false;
      },
      async Login(){
        await this.$store.dispatch('auth/Login',this.payload)

      }
    },
  };
  </script>
