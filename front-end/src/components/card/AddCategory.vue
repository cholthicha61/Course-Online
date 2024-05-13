<template>
    <div>
      <!-- ปุ่มเปิด popup -->
      <button @click="openPopup" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        เพิ่มหมวดหมู่
      </button>
  
      <!-- popup -->
      <div v-if="isPopupOpen" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
        <div class="bg-white p-8 rounded-lg w-96">
          <!-- หัวข้อ -->
          <h2 class="text-gray-700 text-xl font-bold mb-4">Add Category</h2>
          
          <!-- แบบฟอร์ม -->
          <form @submit.prevent="submitForm">
            <div class="mb-4">
              <label for="fname" class="block text-gray-600">Name:</label>
              <input type="text" v-model="fname" id="fname" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
            </div>
            
            <!-- ปุ่มยืนยัน -->
            <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">ยืนยัน</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isPopupOpen: false,
        fname: '' 
      };
    },
    methods: {
      openPopup() {
        this.isPopupOpen = true;
      },
      closePopup() {
        this.isPopupOpen = false;
      },
      submitForm() {
       
        console.log('Submitted:', this.fname);
        this.fname = ''; 
        this.closePopup(); 
      }
    }
  };
  </script>
  