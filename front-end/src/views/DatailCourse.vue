<template  lang="">
  <div>
    <v-container class="head-course">
      <h1 class="mt-10">Detail Course</h1>
    </v-container>
  </div>
  <div class="mt-5 my-10">
    <div class="w-50 ml-64">
      <v-carousel hide-delimiters>
        <v-carousel-item v-for="(item, i) in items" :key="i" cover>
          <div @click="moveImageWrapperLeft(i)" ref="imageWrappers">
            <img :src="item.src" alt="Item Image" class="rounded-xl"/>
          </div>
        </v-carousel-item>
      </v-carousel>
    </div>
  </div>
  <div
    class="box-border w-80 mr-24 absolute right-40 rounded-xl bg-sky-50"
  >
    <div class="text-xl px-8 mt-10 ">
      <strong style="overflow: hidden; word-wrap: break-word;" >
        TOEIC Onlineiehedovjfbopfdjbofdjbjwwwwwwwwwwwwwwwwwfdia
      </strong>
    </div>
    <h1 class="text-4xl font-bold text-orange-500 mt-8 ml-8">฿2500.00</h1>
    <div class="flex justify-center">
      <div class="h-14 w-64 mt-10 rounded-lg bg-sky-800">
        <p class="text-white font-bold text-center text-2xl py-2"> Buy </p>
      </div>
    </div>
    <div class="flex justify-center">
      <div class="h-14 w-64 mt-8 rounded-lg bg-sky-600">
        <p class="text-white font-bold text-center text-2xl py-2"> Favorites </p>
      </div>
    </div>
  </div>
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
    };
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
  height: 62%;
  top: 25%;
}
</style>