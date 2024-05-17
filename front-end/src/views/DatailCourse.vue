<template lang="html">
  <v-container class="head-course">
    <h1 class="mt-10">Detail Course</h1>
  </v-container>

  <div class="mt-5 my-10 w-50 ml-64">
    <v-carousel hide-delimiters>
      <template v-slot:prev="{ props }">
        <v-btn color="white" icon @click="props.onClick"> < </v-btn>
      </template>
      <template v-slot:next="{ props }">
        <v-btn color="white" icon @click="props.onClick"> > </v-btn>
      </template>
      <v-carousel-item v-for="(item, i) in items" :key="i" cover>
        <div @click="moveImageWrapperLeft(i)" ref="imageWrappers">
          <img :src="item.src" alt="Item Image" class="rounded-xl" />
        </div>
      </v-carousel-item>
    </v-carousel>
  </div>

  <div
    class="box-border w-80 mr-24 absolute right-40 rounded-xl bg-sky-50 py-2"
  >
    <h1 class="text-2xl px-8 mt-10">
      <strong style="overflow: hidden; word-wrap: break-word">
        English Interview to Get a Job ฝึกตอบสัมภาษณ์ให้ได้งาน
      </strong>
    </h1>
    <h2 class="text-4xl font-bold text-orange-500 mt-8 ml-8">฿2500.00</h2>
    <div class="flex justify-center">
      <div class="h-14 w-64 mt-10 rounded-lg bg-sky-900 hover:bg-sky-600">
        <p
          class="text-white font-medium font-sans text-center text-2xl py-3 hover:text-cyan-900"
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
          class="text-sky-900 font-medium font-sans text-center text-2xl flex-grow mr-5"
        >
          Favorites
        </p>
      </div>
    </div>
  </div>

  <v-card class="mx-64 my-8 text-left" elevation="0" max-width="845">
    <v-card-item>
      <v-card-title> Course Description </v-card-title>
    </v-card-item>
    <v-card-text class="indent-10 text-wrap">
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
    </v-card-text>

    <v-card-item>
      <v-card-title> Course Description </v-card-title>
    </v-card-item>
    <v-card-text class="indent-10 text-wrap">
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
    </v-card-text>
  </v-card>
  
</template>

<script>
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
    };
  },
  methods: {
    toggleShadow() {
      this.isHover = !this.isHover;
    },
    toggleFavorite() {
      this.isFavorite = !this.isFavorite;
    },
    prevSlide() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        this.currentIndex = this.images.length - 1;
      }
    },
    nextSlide() {
      if (this.currentIndex < this.images.length - 1) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0;
      }
    },
  },
};
</script>

<style scoped>
.image-wrapper img {
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

.box-border {
  height: 44%;
  top: 18%;
}
</style>
