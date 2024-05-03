<template>
  <v-card color="#4A6FA5" class="footer text-center flex flex-column">
    <v-card-text class="py-4"></v-card-text>
    <!-- <svg
      href="#"
      height="30px"
      width="1500px"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 291.319 291.319"
      class="="
    >
          <path
            style="fill: #ffffff"
            d="M145.659,0c80.45,0,145.66,65.219,145.66,145.66c0,80.45-65.21,145.659-145.66,145.659 S0,226.109,0,145.66C0,65.219,65.21,0,145.659,0z"
          ></path>
          <path
            style="fill: #00248f"
            d="M163.394,100.277h18.772v-27.73h-22.067v0.1c-26.738,0.947-32.218,15.977-32.701,31.763h-0.055 v13.847h-18.207v27.156h18.207v72.793h27.439v-72.793h22.477l4.342-27.156h-26.81v-8.366 C154.791,104.556,158.341,100.277,163.394,100.277z"
          ></path>
    </svg> -->
    <div class="py-2 flex items-center justify-center">
      <a href="#" class="text-sm underline mr-2">FAQ</a>
      <h1 class="text-sm">|</h1>
      <a href="#" class="text-sm px-2 underline">Contact Us</a>
    </div>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
};
</script>

<style scoped>
.v-card footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}

.content {
  margin-bottom: 80px;
}
</style>
