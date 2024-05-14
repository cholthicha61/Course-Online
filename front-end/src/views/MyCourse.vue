<template>
  <v-container class="head-course">
    <h1 class="mt-10">My Course</h1>
  </v-container>

  <div class="bg-white"></div>
</template>

<script>
export default {
  components: {

  },
  methods: {
    async getData() {
      const payload = {
        order: true,
      };
      await this.$store.dispatch("category/getCategory", payload);
      this.categorys = this.names;
    },
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
