<template>
  <v-card color="#4A6FA5" class="text-center flex flex-column">
    <v-card-text class="py-3"></v-card-text>

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
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram'
    ]
  })
}
</script>

<style>
.v-card {
  position: fixed;
  bottom: 0;
  width: 100%;
}

.content {
  margin-bottom: 80px; 
}
</style>
