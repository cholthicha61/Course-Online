<template>
  <v-container class="head-course">
    <h1 class="mt-10">Detail Course</h1>
  </v-container>
  <ConfirmCourse
    :openModal="openModal"
    :course="itemCourse"
    :setCloseModal="setCloseModal"
  />
  <div class="carousel-container mt-5 my-10 w-50 ml-64">
    <v-carousel hide-delimiters>
      <v-carousel-item
        v-if="coursebyid && coursebyid.courseImage"
        :key="coursebyid.courseImage"
        cover
      >
        <v-responsive aspect-ratio="16/9">
          <div @click="moveImageWrapperLeft(0)" class="image-wrapper">
            <img
              :src="`${img}/${coursebyid.courseImage}`"
              :alt="coursebyid.courseName"
              class="rounded-xl"
            />
          </div>
        </v-responsive>
      </v-carousel-item>
      <v-carousel-item v-for="(item, i) in items" :key="i" cover>
        <v-responsive aspect-ratio="16/9">
          <div @click="moveImageWrapperLeft(i + 1)" class="image-wrapper">
            <img :src="item.src" :alt="`Image ${i + 1}`" class="rounded-xl" />
          </div>
        </v-responsive>
      </v-carousel-item>
    </v-carousel>

    <div
      v-if="coursebyid"
      class="box-border z- absolute right-48 rounded-xl bg-sky-50 py-2"
    >
      <h1 class="text-2xl mx-4 mt-10">
        <strong style="overflow: hidden; word-wrap: break-word">
          <b
            class="text-sm text-sky-500"
            style="display: block; margin-bottom: 0.5rem"
            >Online Course</b
          >
          {{ coursebyid.courseName }}
        </strong>
      </h1>

      <h2
        v-if="coursebyid"
        class="text-4xl font-bold text-orange-500 mt-8 ml-8"
      >
        ฿{{ coursebyid.price }} บาท
      </h2>
      
      <div class="flex justify-center">
        <div class="h-14 w-64 mt-10 rounded-lg bg-sky-900 hover:bg-sky-600">
          <p
            @click="setOpenModal(coursebyid)"
            class="text-white font-bold font-sans text-center text-2xl py-3 hover:text-cyan-900"
          >
            Buy
          </p>
        </div>
      </div>
      <div class="flex justify-center">
        <div
          class="h-14 w-64 mt-8 rounded-lg bg-sky-200 flex items-center justify-between px-4"
        >
          <v-btn
            value="favorites"
            class="rounded-circle"
            @click="toggleFavorite"
            style="
              width: 40px;
              height: 40px;
              min-width: 40px;
              min-height: 40px;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: white;
              border-radius: 50%;
              padding: 0;
              margin: 0;
            "
          >
            <template v-if="!isFavorite">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-6 h-6"
              >
                <path
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </template>
            <template v-else>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#fc0345"
                class="w-6 h-6"
              >
                <path
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </template>
          </v-btn>
          <p
            class="text-sky-900 font-bold font-sans text-center text-2xl flex-grow mr-5"
          >
            Favorites
          </p>
        </div>
      </div>
    </div>
  </div>

  <div v-if="coursebyid" class="justify-start w-50 mt-5 my-16 ml-64">
    <h1 class="text-lg font-bold">รายละเอียดคอร์สเรียน</h1>
    <p class="text-base mt-2 indent-10 text-wrap">
      {{ coursebyid.description }}
    </p>
  </div>

  <div class="flex justify-end my-16 px-48">
    <div class="box-border-teacher text-wrap rounded-xl bg-sky-50 py-14 -mt-64">
      <h1 class="text-xl text-center">
        {{ teacher.fname }} {{ teacher.lname }}
      </h1>
      <div class="text-center text-sm mt-4">
        <p>อีเมล: {{ teacher.email }}</p>
        <p>โทรศัพท์: {{ teacher.phone }}</p>
        <p>ประวัติผู้สอน: {{ teacher.desc }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import ConfirmCourse from "@/views/ConfirmCourse.vue";
import { mapState } from "vuex";
import { ENDPOINT } from "@/constants/endpoint";

export default {
  data() {
    return {
      items: [
        { src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg" },
        { src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg" },
        { src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg" },
        { src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg" },
      ],
      isHover: false,
      isFavorite: false,
      openModal: false,
      img: ENDPOINT.IMG,
      itemCourse: {},
      teacher: [],
      courses: [],
    };
  },
  components: {
    ConfirmCourse,
  },
  computed: {
    ...mapState({
      favorite: (state) => state.favorite.favorite,
      user: (state) => state.user.user,
      coursebyid: (state) => state.course.selectedCourse,
    }),
  },
  watch: {
    course(newVal) {
      console.log("card course", newVal);
      return newVal;
    },
    isFavorite(newVal) {
      return newVal;
    },
  },
  mounted() {
    this.checkFavorite(this.course, this.user);
  },
  async mounted() {
    this.getTeacher();
    await this.getCourse();
  },
  methods: {
    setOpenModal(item) {
      this.itemCourse = item;
      this.openModal = true;
    },

    setCloseModal() {
      this.openModal = false;
    },
    async getTeacher() {
      await this.$store.dispatch("user/getTeacher");
      this.teacher = this.user;
      console.log("teacher", this.teacher);
    },
    async getCourse() {
      await this.$store.dispatch("course/getCourseById", this.$route.params.id);
      this.courses = this.course;
      console.log("getcourse", this.course);
    },
    checkFavorite(course, user) {
      _.map(course?.favoriteByUsers, (fav) => {
        if (fav?.id == user.id) {
          this.isFavorite = true;
        }
      });
    },
    toggleShadow() {
      this.isHover = !this.isHover;
    },
    async toggleFavorite(course) {
      this.isFavorite = !this.isFavorite;
      const payload = {
        userId: this.user.id,
        courseId: course.id,
      };
      console.log("toggleFavorite", course);

      if (course?.favoriteByUsers && course.favoriteByUsers.length != 0) {
        _.map(course?.favoriteByUsers, async (fav) => {
          if (fav?.id == this.user.id) {
            console.log("favorite/deleteFavorite");
            await this.$store.dispatch("favorite/deleteFavorite", payload);
          } else {
            console.log("favorite/updateFavorite1");
            await this.$store.dispatch("favorite/updateFavorite", payload);
          }
        });
      } else {
        console.log("favorite/updateFavorite2");
        await this.$store.dispatch("favorite/updateFavorite", payload);
      }
    },
  },
};
</script>

<style scoped>
.carousel-container {
  display: flex;
  max-width: 800px;
  width: 100%;
}

.box-border {
  width: 300px;
  height: 509px;

}

.box-border-teacher {
  width: 300px;
  height: 260px;
}

.v-carousel {
  height: auto !important;
}

.v-carousel-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-wrapper {
  width: 100%;
  height: 100%;
}

.image-wrapper img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

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
