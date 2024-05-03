<template>
  <div class="py-8 ">
    <div class="container mx-auto px-96 mt-8">
      <h1 class="text-3xl font-bold mb-10 text-left">Change Password</h1>
      <label for="newpassword" class="block w-1/4  ">New Password</label>
      <div class="mb-4 flex items-center">
        <input
          type="text"
          id="name"
          v-model="password.newpassword"
          class="w-3/4 p-2 border border-gray-300 rounded"
        />
      </div>
      <label for="price" class="block w-1/4 mr-4">Confirme Password</label>

      <div class="mb-4 flex items-center">
        <input
          type="text"
          id="confirmepassword"
          v-model="password.confirmepassword"
          class="w-3/4 p-2 border border-gray-300 rounded"
        />
      </div>

      <div class="flex justify-center mt-10 ml-10">
        <button
          @click="submitPassword"
          class="bg-sky-700 text-white px-9 py-2 rounded hover:shadow-xl hover:bg-sky-800"
        >
          Submit
        </button>
        <div class="w-4"></div>
        <button
          @click="cancel"
          class="bg-gray-500 text-white px-9 py-2 rounded hover:shadow-xl hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: {
        newpassword: "",
        confirmepassword: "",
      },
    };
  },

  methods: {
    submitPassword() {
      console.log("Course submission logic goes here");
      this.uploadImage();
    },
    cancel() {
      console.log("Cancel logic goes here");
    },
  },
};
</script>
