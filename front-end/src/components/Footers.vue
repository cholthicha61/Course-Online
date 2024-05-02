<template>
  <v-card color="#4A6FA5" class="text-centerd -flex flex-column" >
    <!-- <v-card-text>
      <v-btn v-for="icon in icons" :key="icon" class="mx-3 " icon>
        <v-icon>{{ icon }}</v-icon> 
      </v-btn>
    </v-card-text> -->

    <v-card-text class="py-3 ">
      
    </v-card-text>

    <!-- <v-btn
        v-for="icon in icons"
        :key="icon"
        :icon="icon"
        class="mx-4"
        variant="text"
      ></v-btn> -->

    <div class="py-2 flex items-center justify-center">
      <a href="#" class="text-sm underline mr-2"> FAQ </a>
      <h1 class="text-sm"> | </h1>
      <a href="#" class="text-sm px-2 underline"> Contact Us </a> 
    </div>

    <!-- <v-card-text class="flex justify-center bg-blue-800 py-2 text-center">
      {{ new Date().getFullYear() }} — <h1 class="font-bold"> Course Online </h1>
    </v-card-text> -->

   
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
