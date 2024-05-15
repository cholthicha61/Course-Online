<template>
  <div class="container mx-auto px-96 mt-8">
    <h1 class="text-3xl font-bold mb-10 text-left">Edit Course</h1>
    <div class="mb-4 flex items-center">
      <label for="courseName" class="block w-1/4 mr-4">Name:</label>
      <input
        type="text"
        id="courseName"
        v-model="course.courseName"
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
      <label for="description" class="block w-1/4 mr-4">Detail:</label>
      <textarea
        id="description"
        v-model="course.description"
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
        <option value="" disabled>Select status</option>
        <option value="New">New</option>
        <option value="Recommand">Recommand</option>
        <option value="General">General</option>
        <option value="off">Off</option>
      </select>
    </div>
    <div class="mb-4 flex items-center">
      <label for="categoryId" class="block w-1/4 mr-4">Category:</label>
      <select
        id="category"
        v-model="course.category"
        class="w-3/4 p-2 border border-gray-300 rounded"
        @change="categoryChangeHandler"
      >
        <option value="" disabled>Select category</option>
        <option
          v-for="option in categories"
          :key="option.id"
          :value="option.id"
        >
          {{ option.name }}
        </option>
      </select>
    </div>

    <div class="mb-4 flex items-center">
      <div class="w-1/4 mr-4">
        <label class="block">Upload image :</label>
      </div>
      <div class="flex items-center ml-13">
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
            @change="handleFileUpload"
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
        </div>
      </div>
    </div>

    <div class="flex justify-center mt-10 ml-10">
      <button
        @click="confirmSave"
        class="bg-sky-700 text-white px-9 py-2 rounded hover:shadow-xl hover:bg-sky-800"
      >
        Save
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
// import configAxios from "@/axios/configAxios";
// import course from "@/store/modules/course";
// import axios from "axios";
// import { update } from "lodash";
import Swal from "sweetalert2";
import { mapState } from "vuex";

export default {
  data() {
    return {
      course: {
        courseName: "",
        price: "",
        description: "",
        status: "",
        category: "",
        images: [],
      },
    };
  },

  computed: {
    ...mapState({
      categories: (state) => state.category.names,
      courseFromStore: (state) => state.course.selectedCourse,
    }),
  },
  watch: {
    courseName(newVal) {
      return newVal;
    },
  },

  async mounted() {
    const courseId = this.$route.params.id;
    await this.$store.dispatch("course/getCourseById", courseId);
    const courseData = this.courseFromStore;
    if (courseData) {
      this.course = { ...courseData };
    }
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
    handleFileUpload(event) {
      for (const item of event.target.files) {
        this.course.images.push(item);
      }
    },
    async confirmSave() {
      const confirmResult = await Swal.fire({
        title: "ยืนยันการแก้ไข",
        text: "คุณแน่ใจหรือไม่ที่จะบันทึกการเปลี่ยนแปลง?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "ใช่",
        cancelButtonText: "ไม่",
      });

      if (confirmResult.isConfirmed) {
        const courseId = this.$route.params.id;
        // course
        const payload = {
          id: courseId,
          updateData: {
            courseName: this.course?.courseName,
            price: this.course?.price,
            description: this.course?.description,
            status: this.course?.status,
            categoryId: this.course?.category,
            images: this.course?.images,
          },
        };
        await this.$store.dispatch("course/updateCourse", payload);
      }
    },

    cancel() {
      this.$router.push({ name: "coursemanage" });
    },
  },
};
</script>
