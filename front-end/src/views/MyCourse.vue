<template>
  <v-container class="head-course">
    <h1 class="mt-10">My Course</h1>
    </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data(){
    return{     
      user: JSON.parse(localStorage.getItem("user")),

    }
  },
  components: {
  },
  // computed: {
  //   ...mapState({
  //     course: (state) => state.course.course,
  //   }),
  // },

  // watch: {
  //   users(newVal) {
  //     return newVal;
  //   },
  // },
  // async mounted() {
  // },
  // methods: {
  //   async get() {
  //     const payload = {
  //       userId: this.user.id,
  //     };
  //     await this.$store.dispatch("favorite/getFavorite", payload);
  //     // this.favorite = this.favorite;
  //   },
  // },
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
