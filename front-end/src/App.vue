<template>
  <div class="bg-white">
    <AllCourse />
  </div>
</template>

<script>
import AllCourse from "./components/AllCourse.vue";

export default {
  components: {
    AllCourse,
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
</style>
