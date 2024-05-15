<template>
  <div class="px-8 mt-8">
    <div class="head-course">
      <h1>Manage Course</h1>
    </div>
  </div>
  <div>
    <div style="display: flex; justify-content: flex-end">
      <v-btn
        @click="goTo('addcourse')"
        color="#0284C7"
        class="mt-5 ma-5"
        style="color: #fff; text-decoration: none"
        >Add Course</v-btn
      >
    </div>
    <v-data-table-virtual :headers="headers" :items="course" height="700">
      <template v-slot:[`item.no`]="{ index }">
        {{ index + 1 }}
      </template>

      <template #item="{ item }">
        <tr :key="item.coursename">
          <td
            style="
              width: 300px;
              min-width: 300px;
              max-width: 300px;
              text-align: start;
              word-wrap: break-word;
            "
          >
            {{ item.courseName }}
          </td>
          <td
            style="
              width: 300px;
              min-width: 300px;
              max-width: 300px;
              text-align: start;
              word-wrap: break-word;
            "
          ></td>
          <td
            style="
              width: 400px;
              min-width: 400px;
              max-width: 400px;
              text-align: start;
              word-wrap: break-word;
            "
          >
            {{ item.description }}
          </td>
          <td
            style="
              width: 200px;
              min-width: 200px;
              max-width: 200px;
              text-align: start;
              word-wrap: break-word;
            "
          >
            {{ item.price }}
          </td>
          <td
            style="
              width: 200px;
              min-width: 200px;
              max-width: 200px;
              text-align: center;
              word-wrap: break-word;
            "
          >
            <v-select variant="underlined"> </v-select>
          </td>
          <td
            style="
              width: 200px;
              min-width: 200px;
              max-width: 200px;
              text-align: center;
              word-wrap: break-word;
            "
          >
            <v-btn
              color="warning"
              @click="EditCourse(item.id)"
              style="margin-right: 8px"
            >
              edit</v-btn
            >
            <v-btn color="" @click="deleteCourse(item.id)">delete</v-btn>
          </td>
        </tr>
      </template>
    </v-data-table-virtual>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      headers: [
        { title: "Course Name", align: "start", value: "courseName" },
        { title: "Category", align: "start", value: "category" },
        { title: "Detail", align: "start", value: "description" },
        { title: "Price", align: "start", value: "price" },
        { title: "Piority", align: "center", value: "priority" },
        { title: "Action", align: "center" },
      ],
      courses: [],
    };
  },
  computed: {
    ...mapState({
      course: (state) => state.course.course,
      names: (state) => state.category.names,
    }),
  },
  async mounted() {
    this.getCourse();
    this.getCatagory();
    console.log("getCourse", this.getCourse);
  },
  methods: {
    async getCatagory() {
      await this.$store.dispatch("category/getCategory");
      this.categorys = this.names;
      console.log("this.category", this.names);
    },
    async getCourse() {
      await this.$store.dispatch("course/getCourse");
      this.courses = this.course;
      console.log("this.wwwwwcourse", this.courses);
    },
    addCourse() {
      console.log("Add Course button clicked!");
    },
    async deleteCourse(courseId) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.$store.dispatch("course/deleteCourse", courseId);
        }
      });
    },
    async goTo(path) {
      await this.$router.push(`/${path}`);
    },
    async EditCourse(id) {
      this.$router.push({ name: "EditCourse", params: { id: id } });
    },
  },
};
</script>

<style scoped>
.head-course h1 {
  font-size: 30px;
  color: rgb(11, 94, 188);
  border-bottom: 1px solid #d9d9d9;
  font-style: italic;
}
</style>
