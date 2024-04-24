<template>
  <v-card flat tile dark padless class="pink white--text text-center py-5">
    <v-card-text>
      <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text " icon>
        <v-icon>{{ icon }}</v-icon> <!-- Remove size attribute -->
      </v-btn>
    </v-card-text>

    <v-card-text class="white--text py-2 ">
      TOEIC® and TOEFL® are registered trademarks of Educational Testing Service (ETS). This product is not endorsed or approved by ETS.
    </v-card-text>

    <!-- <li :key="link.name" class="" v-for="link in Links" style="list-style-type: none;">
    <a :href="link.link" class="text-l text-sky-800">{{ link.name }}</a>
    </li> -->


    <a href="#" class="white--text text-sm border-r border-black px-2 underline"> FAQ </a> 
    <a href="#" class="white--text text-sm px-2 underline"> Contact Us </a> 

  </v-card>

    <v-card-text class="white--text bg-gray-300 py-2 text-center">
      {{ new Date().getFullYear() }} — <strong>Course-Online</strong>
    </v-card-text>

</template>

<script>
export default {
  // setup() {
  //           const Links = [
  //               {name: "Home", link: "#"},
  //           ];
  //           return { Links};
  //       },
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
