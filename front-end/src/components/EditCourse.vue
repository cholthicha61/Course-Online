<template>
  <div class="container mx-auto px-96 mt-8">
    
    <h1 class="text-3xl font-bold mb-10 text-left ">Edit Course</h1>
    <div class="mb-4 flex items-center">
      <label for="name" class="block w-1/4 mr-4">Name:</label>
      <input
        type="text"
        id="name"
        v-model="course.name"
        class="w-3/4 p-2 border border-gray-300 rounded"
      />
    </div>
    <div class="mb-4 flex items-center">
      <label for="price" class="block w-1/4 mr-4">Price:</label>
      <input
        type="text"
        id="price"
        v-model="course.price"
        class="w-3/4 p-2 border border-gray-300 rounded"
      />
    </div>
    <div class="mb-4 flex items-center">
      <label for="detail" class="block w-1/4 mr-4">Detail:</label>
      <textarea
        id="detail"
        v-model="course.detail"
        class="w-3/4 p-2 border border-gray-300 rounded"
      ></textarea>
    </div>
    <div class="mb-4 flex items-center">
      <label for="status" class="block w-1/4 mr-4">Status:</label>
      <select
        id="status"
        v-model="course.status"
        class="w-3/4 p-2 border border-gray-300 rounded"
      >
        <option value="" disabled selected>Select status</option>
        <option value="New">New</option>
        <option value="Recommand">Recommand</option>
        <option value="General">General</option>
      </select>
    </div>
    <div class="mb-1 flex items-center">
      <div class="w-1/4 mr-4">
        <label class="block">Upload image :</label>
      </div>
      <div class="flex items-center ml-13">
        <div
          id="image-preview-1"
          class="max-w-sm p-6 mb-4 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer mr-4"
        >
          <input
            id="upload-1"
            type="file"
            class="hidden"
            accept="image/*"
            @change="handleFileUpload(1, $event)"
          />
          <label for="upload-1" class="cursor-pointer ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-8 h-8 text-gray-700 mx-auto mb-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-700">
              Upload picture
            </h5>
            <p class="font-normal text-sm text-gray-400 md:px-6">
              Choose photo size should be less than
              <b class="text-gray-600">2mb</b>
            </p>
            <p class="font-normal text-sm text-gray-400 md:px-6">
              and should be in
              <b class="text-gray-600">JPG, PNG, or GIF</b> format.
            </p>
            <span id="filename-1" class="text-gray-500 bg-gray-200 z-50"></span>
          </label>
        </div>

        <div
          id="image-preview-2"
          class="max-w-sm p-6 mb-4 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer"
        >
          <input
            id="upload-2"
            type="file"
            class="hidden"
            accept=".png,.jpg"
            @change="handleFileUpload(2, $event)"
          />
          <label for="upload-2" class="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-8 h-8 text-gray-700 mx-auto mb-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-700">
              Upload picture
            </h5>
            <p class="font-normal text-sm text-gray-400 md:px-6">
              Choose photo size should be less than
              <b class="text-gray-600">2mb</b>
            </p>
            <p class="font-normal text-sm text-gray-400 md:px-6">
              and should be in
              <b class="text-gray-600">JPG, PNG, or GIF</b> format.
            </p>
            <span id="filename-2" class="text-gray-500 bg-gray-200 z-50"></span>
          </label>
        </div>
      </div>
    </div>
    <!-- <div class="flex items-center justify-center space-x-80 mb-12">
      <div class="w-full">
        <label
          for="upload-1"
          class="w-32 text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center cursor-pointer"
        >
          <span class="text-center">Upload</span>
        </label>
        <input
          id="upload-1"
          type="file"
          class="hidden"
          accept="image/*"
          @change="handleFileUpload(1, $event)"
        />
      </div>
      <div class="w-full">
        <label
          for="upload-2"
          class="w-32 text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center cursor-pointer"
        >
          <span class="text-center">Upload</span>
        </label>
        <input
          id="upload-2"
          type="file"
          class="hidden"
          accept="image/*"
          @change="handleFileUpload(2, $event)"
        />
      </div>
    </div> -->

    <div class="flex justify-center mt-10 ml-10">
      <button
        @click="submitCourse"
        class="bg-sky-700 text-white px-9 py-2 rounded hover:shadow-xl hover:bg-sky-800"
      >
        Submit
      </button>
      <div class="w-4"></div>
      <button @click="cancel" class="bg-gray-500 text-white px-9 py-2 rounded hover:shadow-xl hover:bg-gray-500">
        Cancel
      </button>
    </div>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      course: {
        name: "",
        price: "",
        detail: "",
        status: "",
        images: [null, null],
      },
    };
  },

  methods: {
    handleFileUpload(index, event) {
      this.course.images[index - 1] = event.target.files[0];

      console.log();
      const filenameLabel = document.getElementById(`filename-${index}`);
      console.log(" this.course.images[index - 1]", event.target.result);
      filenameLabel.textContent = event.target.files[0].name;

      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview.innerHTML = `<img src="${event.target.result}" class="max-h-48 rounded-lg mx-auto" alt="Image preview" />`;
        imagePreview.classList.remove(
          "border-dashed",
          "border-2",
          "border-gray-400"
        );
      };
    },
    submitCourse() {
      console.log("Course submission logic goes here");
      this.uploadImage();
    },
    uploadImage() {
      this.course.images.forEach((image, index) => {
        if (image) {
          console.log("image", image);
          // const formData = new FormData();
          // formData.append('image', image);

          // fetch('your-upload-url', {
          //     method: 'POST',
          //     body: formData
          //   })
          //   .then(response => {
          //     if (response.ok) {
          //       console.log(`Image ${index + 1} uploaded successfully`);
          //     } else {
          //       throw new Error(`Failed to upload image ${index + 1}`);
          //     }
          //   })
          //   .catch(error => {
          //     console.error(`Error uploading image ${index + 1}:`, error);
          //   });
        }
      });
    },
    cancel() {
      console.log("Cancel logic goes here");
    },
  },
};
</script>
  