<template>
  <v-card flat dark padless class="text-center py-5">
    <v-card-text>
      <v-btn v-for="icon in icons" :key="icon" class="mx-3 " icon>
        <v-icon>{{ icon }}</v-icon> <!-- Remove size attribute -->
      </v-btn>
    </v-card-text>

    <v-card-text class="py-2 ">
      TOEIC® and TOEFL® are registered trademarks of Educational Testing Service (ETS). This product is not endorsed or approved by ETS.
    </v-card-text>

    <a href="#" class="text-sm border-r border-black px-2 underline"> FAQ </a> 
    <a href="#" class="text-sm px-2 underline"> Contact Us </a> 

  </v-card>

    <v-card-text class="flex justify-center bg-gray-300 py-2 text-center">
      {{ new Date().getFullYear() }} — <h1 class="font-bold"> Course Online </h1>
    </v-card-text>

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
