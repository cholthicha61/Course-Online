<template lang="">
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
    <v-data-table-virtual :headers="headers" :items="course" height="570">
      <template v-slot:[`item.no`]="{ index }">
        {{ index + 1 }}
      </template>

      <template #item="{ item, index }">
        <tr :key="item.coursename">
          <td
            style="
              width: 150px;
              min-width: 150px;
              max-width: 150px;
              text-align: center;
              word-wrap: break-word;
            "
          >
            {{ index + 1 }}
          </td>
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
          >
            <!-- <v-select :items="categorys" v-model="item.categoryId" variant="underlined" return-object
              @update:modelValue="updateUser(item)">
              {{ item.category }}
            </v-select> -->
            <!-- <v-select :items="categorys.map(category => category.name)" variant="underlined"
              v-model="item.categorys.name" return-object @update:modelValue="updateCourseCategory(item)">
            </v-select> -->
            {{ item.categorys.name }}
          </td>
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
            {{ item.status }}
          </td>
          <td
            style="
              width: 100px;
              min-width: 100px;
              max-width: 100px;
              text-align: center;
              word-wrap: break-word;
            "
          >
            <v-select
              :items="courses.map((course) => course.priority)"
              variant="underlined"
              v-model="item.priority"
              return-object
              @update:modelValue="updatePriority(item)"
            >
            </v-select>
            <!-- <v-select :items="priorityItems" variant="underlined" v-model="item.priority" return-object
              @update:modelValue="handleUpdate">
            </v-select> -->

            <!-- {{ item.priority }} -->
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
        { title: "No.", align: "center", value: "id" },
        {
          title: "Course Name",
          align: "start",
          value: "courseName",
          sortable: true,
        },
        {
          title: "Category",
          align: "start",
          value: "category",
          sortable: true,
        },
        {
          title: "Detail",
          align: "start",
          value: "description",
          sortable: true,
        },
        { title: "Price", align: "start", value: "price", sortable: true },
        { title: "Type", align: "center", value: "priority", sortable: true },
        {
          title: "Piority",
          align: "center",
          value: "priority",
          sortable: true,
        },
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
    // this.getCatagory();
  },
  methods: {
    // async getCatagory() {
    //   await this.$store.dispatch("category/getCategory");
    //   this.categorys = this.names;
    //   console.log("this.category", this.names);
    // },
    // async editCourse(item) {
    //   const payload = {
    //     id: itemm.id,
    //     category: item.category
    //   }
    // },
    async getCourse() {
      await this.$store.dispatch("course/getCourse");
      this.courses = this.course;
      console.log("this.wwwwwcourse", this.courses);
    },
    addCourse() {
      console.log("Add Course button clicked!");
    },
    EditCourse() {
      console.log("Edit Course button clicked!");
    },
    async deleteCourse(item) {
      console.log("Delete:", item);
      await this.$store.dispatch("course/deleteCourse", item.id);
    },
    async goTo(path) {
      await this.$router.push(`/${path}`);
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
    async updatePriority(item) {
      const payload = {
        id: item.id,
        priority: item.priority,
      };
      console.log("====================================");
      console.log("sssssss", payload);
      console.log("====================================");
      await this.$store.dispatch("course/updatePriority", payload);
      await this.getCourse();
    },
    // handleUpdate(newValue) {
    //   this.item.priority = newValue;
    //   this.refreshData();
    // },
    // async refreshData() {
    //   // โหลดข้อมูล courses จากแหล่งข้อมูล (เช่น API)
    //   try {
    //     // const response = await axios.get(`${ENDPOINT.COURSE}/update-priority/${payload.id}`);

    //     this.priorityItems = response.data.map(course => course.priority);
    //   } catch (error) {
    //     console.error('เกิดข้อผิดพลาดในการโหลดข้อมูล: ', error);
    //   }
    // },
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
