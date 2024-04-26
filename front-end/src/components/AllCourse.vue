<template lang="">
  <div>
    <div>
      <v-container class="flex justify-end">
      <input
        type="text"
        placeholder="Search"
        class="search-input w-64 px-4 py-2 border border-gray-300 rounded-full bg-white text-base text-gray-700"
      />
    </v-container>
    </div>
    <v-container class="head-course">
      <h1>Recommended course</h1>
    </v-container>
  </div>
  <div>
    <v-container>
      <v-row class="justify-start" no-gutters>
        <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-for="i in data" fixed>
          <v-sheet class="ma-3 rounded-border">
            <CardCourse />
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="head-course">
      <h1>All course</h1>
    </v-container>
    <v-container>
      <v-row class="justify-start" no-gutters>
        <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-for="i in course" fixed>
          <v-sheet class="ma-3 rounded-border">
            <CardCourse />
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CardCourse from "@/components/CardCourse.vue";
export default {
  components: {
    CardCourse,
  },
  data() {
    return {
      data: [1, 2, 3],
      course: [1, 2, 3, 4, 5],
    };
  },
  // computed: {
  //   courseList() {
  //     if(this.searchValue.trim().lenght > 0) {
  //       return this.users.filter((course) => course.Name == this.searchValue.trim())
  //     }
  //     return this.course
  //   }
  // }
};
</script>

<style scoped>
.head-course h1 {
  font-size: 30px;
  color: black;
  border-bottom: 1px solid #9e9e9e;
  font-style: italic;
}
.rounded-border {
  border-radius: 20px;
}
</style>
