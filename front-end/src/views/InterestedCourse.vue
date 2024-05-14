<template>
  <v-container class="head-course">
    <h1 class="mt-10">Interested Course</h1>
  </v-container>
  <ConfirmCourse/>
  <div class="bg-white"></div>
</template>

<script>
import ConfirmCourse from './ConfirmCourse.vue';

export default {
  components: {
    ConfirmCourse,
  },
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
