<template>
  <v-card
    class="mx-auto w-96 drop-shadow-xl hover:shadow-xl"
    max-width="500"
    style="background-color: #99CCFF"
  >
    <v-card-text class="flex justify-start">
      <p class="text-h4 font-weight-black text-white mt-1">Completed course</p>
    </v-card-text>
    <div class="px-8 flex items-center">
      <div
        class="rounded-full bg-white w-12 h-12 flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#0ea5e9"
          class="w-7 h-7"
        >
          <path
            fill-rule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <p class="text-4xl hover:text-sky-900 text-sky-200 ml-8">
        {{ orderEnd.count }}
      </p>
      <p class="text-2xl text-gray-200 ml-4 py-4">Course</p>
    </div>

    <v-card-actions class="text-sky-800">
      <v-btn
        href="/endcourse"
        text="View Course"
        class="absolute top-0 left-64 hover:text-sky-800 hover:bg-sky-200"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import order from "@/store/modules/order";
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      orderEnd: (State) => State.order.orderEnd,
    }),
  },
  async mounted() {
    this.countEndCourse();
    console.log('wwwwwwwwwwwww');
  },
  methods: {
    async countEndCourse() {
      await this.$store.dispatch("order/countEndCourse");
      console.log("orderEnd",orderEnd);
    },
  },
};
</script>

<style></style> 

