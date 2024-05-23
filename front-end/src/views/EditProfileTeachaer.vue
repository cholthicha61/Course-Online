<template>
  <div class="container mx-auto px-4">
    <h2 class="text-2xl font-bold text-center my-9">Edit Profile Teacher</h2>
    <div class="flex items-center flex-col w-full max-w-lg mx-auto border-gray-200 rounded-lg">
      <div class="flex flex-col w-96">
        <label class="mb-1 text-gray-700">Firstname</label>
        <input
          type="text"
          class="form-input border border-gray-300 rounded-md px-1 py-1"
        />
        <span class="text-blue-100 mb-2">{{ fnameError }}</span>
      </div>

      <div class="flex flex-col mb-2 w-96">
        <label class="mb-2 text-gray-700">Lastname</label>
        <input
          type="text"
          class="form-input border border-gray-300 rounded-md px-1 py-1"
        />
      </div>

      <div class="flex flex-col mb-4 w-96">
        <label class="mb-2 text-gray-700">Email</label>
        <input
          type="email"
          class="form-input border border-gray-300 rounded-md px-1 py-1"
        />
      </div>

      <div class="flex flex-col mb-4 w-96">
        <label class="mb-2 text-gray-700">Phone</label>
        <input
          type="tel"
          class="form-input border border-gray-300 rounded-md px-1 py-1"
        />
      </div>

      <div class="flex flex-col mb-4 w-96">
        <label class="mb-2 text-gray-700">Details</label>
        <input
          type="text"
          class="form-input border border-gray-300 rounded-md px-1 py-1"
        />
      </div>
      <div class="flex flex-col mb-4 w-96"> Picture </div>
      <div class="flex flex-col picture mr-11">
        <v-file-input
          :rules="rules"
          accept="image/png, image/jpeg, image/bmp"
          label="Add Picture"
          placeholder="Pick an avatar"
          class="w-full"
        >
        </v-file-input>
      </div>

      <div class="">
        <button
          @click="updateUser()"
          class="bg-sky-600 text-white font-bold py-2 px-10 rounded-md hover:bg-sky-800"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    rules: [
      (value) => {
        return (
          !value ||
          !value.length ||
          value[0].size < 2000000 ||
          "Avatar size should be less than 2 MB!"
        );
      },
    ],
  }),

  methods: {
    updateUser() {
      console.log("User updated");
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 100%;
}
.picture {
  width: 82%;
}

</style>
