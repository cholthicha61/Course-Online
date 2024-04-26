<template>
  <div class="w-full">
    <v-row>
      <v-col cols="12">
        <v-carousel show-arrows interval="3000" cycle hide-delimiter-background>
          <template v-slot:prev="{ props }">
            <v-btn
              color="info"
              variant="elevated"
              @click="props.onClick"
            ></v-btn>
          </template>
          <template v-slot:next="{ props }">
            <v-btn
              color="info"
              variant="elevated"
              @click="props.onClick"
            ></v-btn>
          </template>
          <v-carousel-item
            v-for="(item, index) in images"
            :key="index"
            :src="item.src"
            cover
            @click="showSingleImage(index)"
          ></v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" persistent max-width="500">
      <v-btn
        icon
        dark
        @click="dialog = false"
        class="absolute top-0 -right-full"
      >
        X
      </v-btn>

      <img
        :src="selectedImage"
        alt="Selected Image"
        class="w-full cursor-pointer"
        @click="nextSlide"
      />
    </v-dialog>
  </div>
</template>

<script>
import { mdiAccount } from "@mdi/js";

export default {
  data() {
    return {
      path: mdiAccount,
      images: [
        { src: "../../public/img/cat01.jpg" },
        { src: "../../public/img/cat02.jpg" },
        { src: "../../public/img/cat03.jpg" },
      ],
      dialog: false,
      selectedImage: "",
      currentIndex: 0,
    };
  },
  methods: {
    showSingleImage(index) {
      this.selectedImage = this.images[index].src;
      this.dialog = true;
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
    closeDialogOnEscape() {
      this.dialog = false;
    },
  },
  mounted() {
    window.addEventListener("keydown", this.closeDialogOnEscape);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.closeDialogOnEscape);
  },
};
</script>

<style scoped>
.v-carousel {
  max-width: 100%;
  max-height: 90%;
}
</style>
