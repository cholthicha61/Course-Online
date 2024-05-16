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

      <v-card-btn class="card-button pa-2 d-flex justify-between">
        <v-btn value="favorites">
          <!-- <v-icon>mdi-heart</v-icon> -->
          <span>icon</span>
        </v-btn>
        <v-btn
          class="buy-button text-whit font-weight-regular mb-5"
          text="BUY"
          variant="tonal"
          @click="setOpenModal(course)"
        ></v-btn>
        <!-- <button @click="ff" class="btn-buy rounded-md "> 
           Buy 
        </button> -->
      </v-card-btn>
    </v-card>
  </div>
</template>

<script>
import { ENDPOINT } from "@/constants/endpoint";
export default {
  name: "CardCourse",
  data() {
    return {
      isHover: false,
      img: ENDPOINT.IMG,
    };
  },
  props: {
    course: {},
    setOpenModal: {
      type:Function,
    },
  },
  watch: {
    course(newVal) {
      console.log("card course", newVal);
    },
  },
  mounted() {
    console.log("ppppppp", `${this.img}/${this.course.courseImage}`);
  },
  methods: {
    toggleShadow() {
      this.isHover = !this.isHover;
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
