<template>
  <div class="container mx-auto px-96 mt-8">
    <div>
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded -ml-96"
        @click="goToCoursePage"
      >
        Back
      </button>
    </div>
    <h1 class="text-3xl font-bold mb-10 text-left">Add Course</h1>

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
        <option value="off">Off</option>
      </select>
    </div>
    <div class="mb-4 flex items-center">
      <label for="category" class="block w-1/4 mr-4">Category:</label>
      <select
        id="category"
        v-model="course.category"
        class="w-3/4 p-2 border border-gray-300 rounded"
        @change="categoryChangeHandler"
      >
        <option value="" disabled>Select category</option>
        <option v-for="option in category" :value="option.id">
          {{ option.name }}
        </option>
      </select>
    </div>

    <div class="mb-2 flex items-center">
      <div class="w-1/4 mr-4">
        <label class="block">Upload image :</label>
      </div>
      <div class="flex items-center ml-13">
        <!-- <div class="flex justify-center max-w-42 max-h-36 text-nowrap"> -->
        <div
          id="image-preview-1"
          class="max-w-sm p-6 mb-4 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer mr-4 overflow-scroll-y"
        >
          <input
            id="upload-1"
            type="file"
            class="hidden"
            accept=".jpg,.png,.gif"
            multiple
            @change="handleFileUpload($event)"
          />
          <label
            v-if="course.images.length == 0"
            for="upload-1"
            class="cursor-pointer"
          >
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
          </label>
          <div v-for="(item, i) in course.images" :key="i">
            <span class="text-gray-500 bg-gray-200 z-50">{{ item.name }}</span>
          </div>
          <!-- </div> -->
        </div>
      </div>
    </div>

    <div class="flex justify-center mt-10 ml-10">
      <button
        @click="submitCourse"
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
</template>

<script>
import axios from "axios"; // เพิ่มการนำเข้า Axios
import { mapState } from "vuex";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      course: {
        name: "",
        price: "",
        detail: "",
        status: "",
        category: "",
        images: [],
        // categoryOptions: ["toeic", "toefl"],
        // newCategory: "",
      },
      // showNewCategoryInput: false,
    };
  },

  watch: {
    category(newVal) {
      return newVal;
    },
  },

  computed: {
    ...mapState({
      category: (state) => state.category.names,
    }),
  },

  async mounted() {
    await this.$store.dispatch("category/getCategory");
  },

  methods: {
    categoryChangeHandler() {
      if (this.course.category === "Add New Category") {
        this.showNewCategoryInput = true;
      } else {
        this.showNewCategoryInput = false;
      }
    },
    addNewCategory() {
      if (this.newCategory.trim() === "") {
        alert("Please enter a category name.");
        return;
      }
      if (!this.course.categoryOptions.includes(this.newCategory)) {
        this.course.categoryOptions.push(this.newCategory);
      }
      this.course.category = this.newCategory;
      this.newCategory = "";
    },
    handleFileUpload(event) {
      console.log("Hello event", event);

      for (const item of event.target.files) {
        this.course.images.push(item);
      }
      console.log("SSSS", this.course.images);

      console.log("pppp", event.target.result);

      const reader = new FileReader();
      // reader.onload = (e) => {
      //   const imagePreview = document.getElementById(`image-preview-${index}`);
      //   imagePreview.innerHTML = `<img src="${event.target.files[0].name}" class="max-h-48 rounded-lg mx-auto" alt="Image preview" />`;
      //   imagePreview.classList.remove("border-dashed", "border-2", "border-gray-400");
      // };

      reader.readAsDataURL(event.target.files[0]);
    },
    submitCourse() {
      if (
        !this.course.name ||
        !this.course.price ||
        !this.course.detail ||
        !this.course.status ||
        !this.course.category ||
        this.course.images.filter((image) => image).length === 0
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill in all required fields!",
        });
        return;
      }

      this.$store
        .dispatch("course/addCourse", this.course)
        .then(() => {
          this.showConfirmationDialog = true;
          Swal.fire({
          icon: "success",
          title: "เพิ่มคอร์สสำเร็จ",
          text: "",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
            this.$router.go();
          });
          console.log("Course added successfully");
        })
        .catch((error) => {
          console.error("Failed to add course", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to add course!",
          });
        });
    },

    uploadImage() {
      axios
        .post("addcourse/addCourse", formData)
        .then((response) => {
          console.log("Course added successfully", response);
          // this.$store.dispatch("addCourse", response.data);
        })
        .catch((error) => {
          console.error("Failed to add course", error);
        });
    },
    goToCoursePage() {
      this.$router.push({ name: "coursemanage" });
    },
    cancel() {
      this.course = {
        name: "",
        price: "",
        detail: "",
        status: "",
        category: "",
        images: [],
      };
    },
  },
};
</script>
