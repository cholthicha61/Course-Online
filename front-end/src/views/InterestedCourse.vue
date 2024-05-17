<template>
  <v-container class="head-course">
    <h1 class="mt-10">Interested Course</h1>
      <v-row class="justify-start" no-gutters>
        <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-for="i in favorite" fixed>
          <v-sheet class="ma-3 rounded-border">
            <CardCourse :course="i" :setOpenModal="setOpenModal" />
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>

  <!-- <v-container class="head-course">
    <h1 class="mt-10">Interested Course</h1>
  </v-container> -->

  <div></div>
</template>

<script>
import CardCourse from "@/components/CardCourse.vue";
import favorite from "@/store/modules/favorite";
import ConfirmCourse from "@/views/ConfirmCourse.vue";
import { mapState } from "vuex";

export default {
  data(){
    return{
      // favorite: [],
      openModal: false,
      itemCourse: {},
      user: JSON.parse(localStorage.getItem("user")),

    }
  },
  components: {
    CardCourse,
    ConfirmCourse,
  },
  computed: {
    ...mapState({
      favorite: (state) => state.favorite.favorite,
    }),
  },

  watch: {
    users(newVal) {
      return newVal;
    },
  },
  async mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      const payload = {
        userId: this.user.id,
      };
      await this.$store.dispatch("favorite/getFavorite", payload);
      // this.favorite = this.favorite;
    },
    setOpenModal(item) {
      this.itemCourse = item;
      this.openModal = true;
    },
    setCloseModal() {
      this.openModal = false;
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
