<template>
  <div class="px-8 mt-8">
    <div class="head-course">
      <h1>Manage Course</h1>
    </div>
  </div>
  <div>
    <div style="display: flex; justify-content: flex-end">
      <!-- <router-link to="/addcourse" class="mt-5 ma-5" style="color: #fff; text-decoration: none"> -->
        <v-btn @click="goTo('addcourse')" color="#0284C7" class="mt-5 ma-5" style="color: #fff; text-decoration: none">Add Course</v-btn>
      <!-- </router-link> -->
    </div>
    <v-data-table-virtual :headers="headers" :items="courses" height="700">
      <template v-slot:[`item.no`]="{ index }">
        {{ index + 1 }}
      </template>

      <template #item="{ item }">
        <tr :key="item.coursename">
          <td style="
              width: 300px;
              min-width: 300px;
              max-width: 300px;
              text-align: start;
              word-wrap: break-word;
            ">
            {{ item.courseName }}
          </td>
          <td style="
              width: 300px;
              min-width: 300px;
              max-width: 300px;
              text-align: start;
              word-wrap: break-word;
            ">
            <v-select :items="categorys" v-model="item.categoryId" variant="underlined" return-object @update:modelValue="updateUser(item)">
</v-select>

          </td>
          <td style="
              width: 400px;
              min-width: 400px;
              max-width: 400px;
              text-align: start;
              word-wrap: break-word;
            ">
            {{ item.description }}
          </td>
          <td style="
              width: 200px;
              min-width: 200px;
              max-width: 200px;
              text-align: start;
              word-wrap: break-word;
            ">
            {{ item.price }}
          </td>
          <td style="
              width: 200px;
              min-width: 200px;
              max-width: 200px;
              text-align: center;
              word-wrap: break-word;
            ">
            <v-select variant="underlined">
            </v-select>
          </td>
          <td style="
              width: 200px;
              min-width: 200px;
              max-width: 200px;
              text-align: center;
              word-wrap: break-word;
            ">
            <v-btn color="warning" @click="EditCourse()" style="margin-right: 8px">
              edit</v-btn>
            <v-btn color="" @click="deleteCourse(item)">delete</v-btn>
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
        { title: "Piority", align: "center", value: "priority" },
        { title: "Action", align: "center" },
      ],
      course: [],
      courses: [
        {
          courseName: "wwwwwwwwwwwwwwwwwwwwwww",
          categoryId:"",
          description:
            "Description lor em50000000 00000000000 0000000000000000000 0000000000000000000000 0000",
          price: 20000000000000000,
          priority: "1",
        },
        {
          courseName: "wwwwwwwwwwwwwwwwwwwwwww",
          description:
            "Description lorem5000000000000000000000000000000000000000000000000000000000000000",
          price: 20000000000000000,
          priority: "2",
        },
      ],
      categorys: [{
        names: "",
      }],
    };
  },
  computed: {
    ...mapState({
      course: (state) => state.course.course,
      names: (state) => state.category.names,
    }),
  },
  async mounted() {
    await this.$store.dispatch("course/getCourse");
    this.getData();

  },
  methods: {
    async getData() {
      await this.$store.dispatch("category/getCat");
      this.categorys = this.names;
      console.log("lllllll:", this.categorys);
    },
    // async updateCatagory() {
    //   const payload = {
    //     category: true,
    //   }
    // },
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
      await this.$router.push(`/${path}`)
    }
    // async EditCourse(item) {
    //   console.log("Edit:", item);

    //   await this.$store.dispatch("course/editCourse", item);
    // }
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
