<template>
  <v-card
    style="border-radius: 10px"
    elevation="hover"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <v-img
      height="200px"
      src="https://pbs.twimg.com/media/FaL6vmQaAAA63UG.jpg"
      cover
    >
    </v-img>

    <v-card-text>
      <h1 @click="toggleShadow" :class="{ 'cursor-pointer': !isHover }">TOEIC</h1>
      <div class="description-course mt-1">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia,
          possimus.
        </p>
      </div>
      <div class="text-end">
        <h2 class="mt-13">฿2,500.00</h2>
      </div>
    </v-card-text>

    <v-card-btn
      class="card-button pa-2"
      style="display: flex; justify-content: space-between"
    >
      <v-btn value="favorites">
        <!-- <v-icon>mdi-heart</v-icon> -->
        <span>icon</span>
      </v-btn>
      <v-btn class="btn-buy "> Buy </v-btn>
    </v-card-btn>
  </v-card>
</template>

<script>
export default {
  name: "CardCourse",
  data() {
    return {
      isHover: false,
    };
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
  background-color: #075985;
  border-color: #075985;
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


</style>
