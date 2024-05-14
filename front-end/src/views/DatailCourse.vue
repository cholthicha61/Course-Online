<template>
  <div class="mt-36">
    <div class="w-50 bg-slate-600">
      <v-carousel hide-delimiters>
        <v-carousel-item v-for="(item, i) in items" :key="i" cover>
          <div @click="moveImageWrapperLeft(i)" ref="imageWrappers">
            <img :src="item.src" alt="Item Image" />
          </div>
        </v-carousel-item>
      </v-carousel>
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

<style>
.image-wrapper img {
  object-fit: cover;
}
</style>