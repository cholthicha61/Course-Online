<template lang="">
  <div class="px-8 mt-8">
    <div class="head-course">
      <h1>Manage Course</h1>
    </div>
  </div>
  <div>
    <div style="display: flex; justify-content: flex-end; margin-top: 15px;">
      <v-btn @click="goTo('addcourse')" color="#0284C7" class="ma-5" style="color: #fff; text-decoration: none">Add Course</v-btn>
    </div>

    <v-data-table-virtual :headers="headers" :items="course" height="100hv">
      <template v-slot:[`item.no`]="{ index }">
        {{ index + 1 }}
      </template>
<template #item="{ item ,index}">
        <tr :key="item.coursename">
          <td class="table-cell"> {{ index + 1 }} </td>
          <td class="table-cell"> {{ formatDate(item.createdAt)}} </td>
          <td class="table-cell"> {{ item.courseName }} </td>
          <td class="table-cell" v-if="item.categorys"> {{ item.categorys.name }} </td>
          <td class="table-cell" v-else> N/A </td>
          <td class="table-cell"> {{ item.description }} </td>
          <td class="table-cell"> {{ item.price }} </td>
          <td class="table-cell"> {{ item.status }} </td>
          <!-- <td class="table-cell" > -->
            <!-- <v-select
              :items="courses.map((course) => course.priority)"
              variant="underlined"
              v-model="item.priority"
              return-object
              @update:modelValue="updatePriority(item)"
            >
            </v-select> -->
          <!-- </td> -->
          <td class="table-cell" style="text-align: center;">
            <v-btn color="blue" @click="EditCourse(item)" style="margin-right: 10px;">edit</v-btn>
            <v-btn color="warning" @click="deleteCourse(item.id)">delete</v-btn>
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
        { title: "No.", align: "start", value: "id" },
        { title: "CreateAt", align: "start", value: "createdAt", sortable: true },
        {
          title: "Course Name",
          align: "start",
          value: "courseName",
          sortable: true,
        },
        {
          title: "Category",
          align: "start",
          value: "categorys.name",
          sortable: true,
        },
        {
          title: "Detail",
          align: "start",
          value: "description",
          sortable: true,
        },
        { title: "Price", align: "start", value: "price", sortable: true },
        { title: "Type", align: "start", value: "priority", sortable: true },
        // {
        //   title: "Priority",
        //   align: "start",
        //   value: "priority",
        //   sortable: true,
        // },
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
  },
  methods: {
    async getCourse() {
      await this.$store.dispatch("course/getCourse");
      this.courses = this.course;
    },
    async deleteCourse(courseId) {
      Swal.fire({
        title: "คุณต้องการลบคอร์สหรือไม่",
        // text: "คุณจะไม่สามารถย้อนกลับสิ่งนี้ได้!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่, ต้องการลบ",
        cancelButtonText: "ยกเลิก",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.$store.dispatch("course/deleteCourse", courseId);
          await this.$store.dispatch("course/getCourse");
          Swal.fire({
            icon: "success",
            title: "ลบคอร์สสำเร็จ",
            // text: "ลบคอร์สสำเร็จ",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
    },

    async updatePriority(item) {
      const payload = {
        id: item.id,
        priority: item.priority,
      };
      await this.$store.dispatch("course/updatePriority", payload);
      await this.getCourse();
    },
    EditCourse(item) {
      console.log("Edit:", item);
      // Handle edit course functionality here
    },
    async goTo(path) {
      await this.$router.push(`/${path}`);
    },
    formatDate(date) {
      return new Date(date).toLocaleString();
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

.table-cell {
  max-width: 100px;
  word-wrap: break-word;
  white-space: normal;
}
</style>
