<template>
  <div>
    <div v-for="order in orders" :key="order.id">
      <p>{{ order.course.courseImage }}</p>
      <p>Status: {{ order.id }}</p>
      <p>Status: {{ order.status }}</p>
      <p>Name: {{ order.course.courseName }}</p>
      <p>Name: {{ order.course.price }} บาท</p>

      <div>
        <v-card style="border-radius: 10px" elevation="hover" @mouseenter="isHover = true"
          @mouseleave="isHover = false">
          <v-img height="200px" :src="`${img}/${order.course.courseImage}`" cover>
      </v-img>
          <v-card-text>
            <h1 @click="toggleShadow" :class="{ 'cursor-pointer': !isHover }">
              {{ order.course.courseName }}
            </h1>
            <div class="description-course mt-1">
              <p>
                {{ order.course.description }}
              </p>
            </div>
            <div class="text-end">
              <h2 class="mt-13">{{ order.course.price }} บาท</h2>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>


<script>
import { ENDPOINT } from "@/constants/endpoint";
import { mapState } from 'vuex';

export default {
  data() {
    return {
      img: ENDPOINT.IMG,
      orders: [],
    }
  },
  computed: {
    ...mapState({
      order: (state) => state.order.order,

    }),
  },
  async mounted() {
    this.getOrder();
  },
  methods: {
    async getOrder() {
      await this.$store.dispatch("order/getOrder",);
      this.orders = this.order;
      console.log("Order:", this.order);
      console.log("Orders:", this.orders);
    },
  },
}
</script>

<style></style>