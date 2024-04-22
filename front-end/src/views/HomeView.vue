<script setup>
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main>
    <TheWelcome />
    <v-container>
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <v-btn size="x-small">Extra small Button</v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn size="small">Small Button</v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn>Regular Button</v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn size="large">Large Button</v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn size="x-large">X-Large Button</v-btn>
      </v-col>
    </v-row>
  </v-container>
  <h1 className="text-3xl font-bold underline text-orange-500">
      Hello world! 

    </h1>
  </main>
</template>
