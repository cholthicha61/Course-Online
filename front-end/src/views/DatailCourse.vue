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
      <v-carousel-item v-for="(item, i) in items" :key="i" cover>
        <v-responsive aspect-ratio="16/9">
          <div @click="moveImageWrapperLeft(i)" class="image-wrapper">
            <img :src="item.src" alt="Item Image" class="rounded-xl" />
          </div>
        </v-responsive>
      </v-carousel-item>
    </v-carousel>
    <div class="box-border absolute right-48 rounded-xl bg-sky-50 py-2">
      <h1 class="text-2xl px-8 mt-10">
        <strong style="overflow: hidden; word-wrap: break-word">
          English Interview to Get a Job ฝึกตอบสัมภาษณ์ให้ได้งาน
        </strong>
      </h1>
      <h2 class="text-4xl font-bold text-orange-500 mt-8 ml-8">฿2500.00</h2>
      <div class="flex justify-center">
        <div class="h-14 w-64 mt-10 rounded-lg bg-sky-900 hover:bg-sky-600">
          <p
            @click="setOpenModal(course)"
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

  <div class="justify-start w-50 mt-5 my-16 ml-64">
    <h1 class="text-lg font-bold">รายละเอียดคอร์สเรียน</h1>
    <p class="text-base mt-2 indent-10 text-wrap">
      คอร์สออนไลน์นี้
      นำเนื้อหามาจากคอร์สออนไลน์ที่ผู้สอนเคยใช้สอนผู้เรียนที่เตรียมตัวไปสัมภาษณ์งานเป็นภาษาอังกฤษจริง
      ๆ จนประสบความสำเร็จและได้งานนั้น
      ผู้เขียนจึงนำสไลด์เหล่านั้นมาดัดแปลงเป็นฉบับวิดิโอ
      เพื่อให้ผู้เรียนได้ความรู้ในด้านการสัมภาษณ์งานเป็นภาษาอังกฤษ
      ซึ่งหากผู้เรียนกำลังเตรียมตัวจะสัมภาษณ์งาน
      แต่ยังนึกภาพไม่ออกว่าจะเจอคำถามประเภทไหน
      หรือไม่รู้ว่าจะเริ่มตอบอย่างไรหากเจอคำถามจากผู้สัมภาษณ์
      ไม่ว่าจะเป็นการให้เราแนะนำตัว หรือถามรายละเอียดด้านงานเชิงลึก
      คอร์สออนไลน์นี้จะเป็นคำตอบที่ดีให้แก่คุณครับ
      ผู้เรียนควรแต่งประโยคภาษาอังกฤษง่าย ๆ ได้บ้าง
      หรือผ่านการเรียนภาษาอังกฤษมาบ้าง
      เพราะคอร์สนี้ไม่ได้ลงรายละเอียดของไวยากรณ์ขั้นพื้นฐาน
    </p>
  </div>

  <div class="flex justify-end my-16 px-48">
    <div class="box-border-teacher text-wrap rounded-xl bg-sky-50 py-14 -mt-64">
      <h1 class="text-xl text-center">คุณครูเพ็ญศรี ตลก76ฉาก</h1>
      <div class="text-center text-sm mt-4">
        <p>อีเมล: example@example.com</p>
        <p>โทรศัพท์: 123-456-7890</p>
        <p>
          ประวัติผู้สอน: Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Duis suscipit ligula nec erat congue fermentum. Maecenas vitae
          tellus vitae lacus accumsan eleifend.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import ConfirmCourse from "@/views/ConfirmCourse.vue";
import { mapState } from "vuex";
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
      itemCourse: {},
    };
  },
  components: {
    ConfirmCourse,
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
  methods: {
    setOpenModal(item) {
      this.itemCourse = item;
      this.openModal = true;
    },

    setCloseModal() {
      this.openModal = false;
    },
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
  height: 455px;
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
