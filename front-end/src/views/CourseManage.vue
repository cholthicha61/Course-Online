<template>
    <div class="px-8 mt-8">
    <div class="head-course">
      <h1>Manage Course</h1>
    </div>
  </div>
  <div>
    <div style="display: flex; justify-content: flex-end">
      <v-btn class="mt-5 ma-5" color="#0284C7" @click="addCourse"
        >Add Course</v-btn
      >
    </div>
    <v-data-table-virtual :headers="headers" :items="course" height="500">
      <template v-slot:[`item.no`]="{ index }">
        {{ index + 1 }}
      </template>

      <template #item="{ item }">
        <tr :key="item.coursename">
          <td
            class="text-start"
            style="width: 150x; max-width: 150px; word-wrap: break-word"
          >
            {{ item.courseName }}
          </td>
          <td
            class="text-start"
            style="width: 150x; max-width: 150px; word-wrap: break-word"
          >
            {{ item.categoryId }}
          </td>
          <td
            class="text-start"
            style="width: 150x; max-width: 150px; word-wrap: break-word"
          >
            {{ item.description }}
          </td>
          <td
            class="text-start"
            style="width: 150x; max-width: 150px; word-wrap: break-word"
          >
            {{ item.price }}
          </td>
          <td
            class="text-start"
            style="width: 150x; max-width: 150px; word-wrap: break-word"
          >
            {{ item.cstatus }}
          </td>

          <!-- <td class="text-center" style="width: 100px">

            <v-btn
              color="#0284C7"
              @click="performAction(item)"
              style="margin-right: 8px"
            >
              up</v-btn
            >
            <v-btn color="#0284C7" @click="performAction(item)">down</v-btn>
          </td> -->
          <td
            class="text-center"
            style="width: 150x; max-width: 150px; word-wrap: break-word"
          >
            <v-btn
              color="warning"
              @click="setPriority(item)"
              style="margin-right: 8px"
            >
              edit</v-btn
            >
            <v-btn color="" @click="setPriority(item)">delete</v-btn>
          </td>
        </tr>
      </template>
    </v-data-table-virtual>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      headers: [
        { title: "Course Name", align: "start", value: "courseName" },
        { title: "Category", align: "start", value: "categoryId" },
        { title: "Detail", align: "start", value: "description" },
        { title: "Price", align: "start", value: "price" },
        { title: "Piority", align: "start", value: "priority" },
        // { title: "Status", align: "start", value: "Status" },
        { title: "Action", align: "center" },
      ],
      course: [],
    };
  },
  computed: {
    ...mapState({
      course: (state) => state.course.course,
    }),
  },
  async mounted() {
    await this.$store.dispatch("course/getCourse");
  },
  methods: {
    addCourse() {
      console.log("Add Course button clicked!");
    },
    performAction(item) {
      console.log("Perform action for:", item.cname);
    },
    setPriority(item) {
      console.log("Set priority for:", item.cname);
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