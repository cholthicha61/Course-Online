<template>
  <div>
    <v-card
      style="border-radius: 10px"
      elevation="hover"
      @mouseenter="isHover = true"
      @mouseleave="isHover = false"
    >
      <v-img height="200px" :src="`${img}/${this.course.courseImage}`" cover>
      </v-img>

      <v-card-text>
        <h1 @click="toggleShadow" :class="{ 'cursor-pointer': !isHover }">
          {{ course.courseName }}
        </h1>
        <div class="description-course mt-1">
          <p>
            {{ course.description }}
          </p>
        </div>
        <div class="text-end">
          <h2 class="mt-13">{{ course.price }} บาท</h2>
        </div>
      </v-card-text>
       <!-- <div waitting>
        <div class="border-t-4"></div>

        <div class="text-center mt-5">
          <div class="text-center mt-5">
            <button
              class="bg-sky-400 text-white py-4 px-5 hover:bg-primary-dark rounded-lg text-lg"
              type="button"
            >
              Waiting for confirmation
            </button>
          </div>
        </div>
      </div> -->
      <!-- <div confirm>
        <div class="border-t-4"></div>

        <div class="text-center">
          <div class="text-center mt-5">
            <button
              class="bg-green-400 text-white px-20 hover:bg-primary-dark rounded-lg text-lg"
              type="button"
            >
              confirmed
            </button>
            <div class="mt-4">
              <p class="text-lg">start 16/05/67</p>
              <p class="text-lg">end 16/05/67</p>
            </div>
          </div>
        </div>
      </div> -->
      <v-card-btn
        class="card-button pa-2 d-flex align-items-center justify-between"
      >
        <v-btn
          value="favorites"
          class="rounded-circle"
          @click="toggleFavorite(course)"
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
              fill="none"
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

        <v-btn
          class="buy-button text-white font-weight-regular mb-5"
          style="height: 40px; display: flex; align-items: center"
          text="BUY"
          variant="tonal"
          @click="setOpenModal(course)"
        ></v-btn>
      </v-card-btn>
    </v-card>
  </div>
</template>

<script>
import { ENDPOINT } from "@/constants/endpoint";
import _ from "lodash";
import { mapState } from "vuex";
export default {
  name: "CardCourse",
  data() {
    return {
      isHover: false,
      isFavorite: false,
      img: ENDPOINT.IMG,
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
  computed: {
    ...mapState({
      favorite: (state) => state.favorite.favorite,
    }),
  },
  props: {
    course: {},
    setOpenModal: {
      type: Function,
    },
  },
  watch: {
    course(newVal) {
      // newVal.push({isFavorite : false})
      console.log("card course", newVal);
      return newVal;
    },
    isFavorite(newVal) {
      return newVal;
    },
  },
  mounted() {
    // console.log("ppppppp", `${this.img}/${this.course.courseImage}`);
    this.checkFavorite(this.course, this.user);
    // console.log('ssss', this.course);
  },
  methods: {
    checkFavorite(course, user) {
      _.map(course?.favoriteByUsers, (fav) => {
        // console.log('newVal.favoriteByUsers,', fav);
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

      if (this.isFavorite) {
        await this.$store.dispatch("favorite/updateFavorite", payload);
      } else {
        await this.$store.dispatch("favorite/deleteFavorite", payload);
      }
    },
  },
};
</script>

<style scoped>
.v-card {
  transition: box-shadow 0.3s ease;
}
.v-card:hover {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}
.v-card-text h1 {
  font-weight: bold;
  font-size: 20px;
}
.v-card-text h1:hover {
  color: #075985;
}
.btn-buy {
  color: #fff;
  background-color: #098ad0;
  border-color: #0982c4;
  width: 120px;
}

.text-end h2 {
  font-size: 24px;
  color: #fc5d19;
  font-weight: bold;
}
.description-course {
  color: grey;
}
.cursor-pointer {
  cursor: pointer;
}
.v-btn {
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  bottom: -18px;
}
</style>
