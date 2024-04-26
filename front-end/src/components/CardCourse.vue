<template>
  <v-card style="border-radius: 20px" elevation="10">
    <v-img
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      cover
    >
    </v-img>

    <v-card-text>
      <h1>TOEIC500</h1>
      <div class="description-course mt-1">
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo cum amet, hic est iusto quam?
        </p>
      </div>
      <div class="text-end mt-2">
        <h2>฿2,500</h2>
      </div>
    </v-card-text>

    <v-card-btn
      class="card-button pa-2 d-flex justify-between"
    >
      <v-btn value="favorites">
        <!-- <v-icon>mdi-heart</v-icon> -->
        <span>icon</span>
      </v-btn>
      <v-btn class="btn-buy"> Buy </v-btn>
    </v-card-btn>
  </v-card>
</template>

<script>
export default {
  name: "CardCourse",
  // data() {
  //   return {
  //     Name: '',
  //     courseDescription: '',
  //     coursePrice: ''
  //   }
  // },
  // mounted() {
  //   this.fetchCourseData();
  // },
  // methods: {
  //   fetchCourseData() {
  //     setTimeout(() => {
  //       this.Name = 'Toei';
  //       this.courseDescription = 'lorem ipsum dolor';
  //       this.coursePrice = '฿2000';
  //     }, 1000); 
  //   }
  // }
};
</script>

<style scoped>
.v-card-text h1 {
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
}
.v-card-text h1:hover {
  color: #075985; /* เมื่อเมาส์ผ่านไปเหนือจะเปลี่ยนสีเป็นแดง */
}
.btn-buy {
  color: #ffff; /* กำหนดสีของตัวหนังสือ */
  background-color: #075985; /* กำหนดสีพื้นหลัง */
  border-color: #075985; /* กำหนดสีของเส้นขอบ */
  width: 140px
}
.text-end h2 {
  font-size: 24px; /* กำหนดขนาดฟ้อนต์เป็น 24px */
  color: #fc5d19;
  font-weight: bold;
}
.description-course {
  color: grey;
}
</style>
