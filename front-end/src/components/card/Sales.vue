<template>
  <v-container>
    <v-card>
      <v-card-title class="text-overline">
        All course

        <div class="text-sky-800 text-h3 font-weight-bold">70%</div>

        <div class="text-h6 text-medium-emphasis font-weight-regular">
          ฿2,938.00 Bath
        </div>
      </v-card-title>
      <br />
      <v-card-text>
        <div
          :style="`right: calc(${review} - 32px)`"
          class="position-absolute mt-n8 text-caption text-sky-800"
        >
          Total
        </div>
        <v-progress-linear
        color="blue-darken-3"
          height="22"
          model-value="90"
          rounded="lg"
        >
          <v-badge
            :style="`right: ${review}`"
            class="position-absolute"
            color="white"
            dot
            inline
          ></v-badge>
        </v-progress-linear>

        <div class="d-flex justify-space-between py-3">
          <span class="text-sky-800 font-weight-medium">
            $26,442.00 Bath
          </span>

          <span class="text-medium-emphasis"> $29,380.00 total </span>
        </div>
      </v-card-text>

      <v-divider></v-divider>

      
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({ review: "30%" }),
};
</script>

<style></style>
