<template>
  <div>
    <v-container>
      <div class="head-course">
        <h1 class="mt-10">My course</h1>
      </div>
      <v-row class="mt-4 justify-start" no-gutters>
        <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-for="item in order" :key="item.id" fixed>
          <v-sheet class="ma-3 rounded-border">
            <v-card class="min-height" style="border-radius: 10px" elevation="hover" @mouseenter="isHover = true"
              @mouseleave="isHover = false" >
              <v-img height="200px" :src="`${img}/${item.course.courseImage}`" cover>
              </v-img>
              <v-card-text>
                <h1 @click="toggleShadow" :class="{ 'cursor-pointer': !isHover }">
                  {{ item.course.courseName }}
                </h1>
                <div class="box-description">
                  <p v-if="item.course.description && !item.showFullDescription">
                    {{ truncatedDescription(item.course.description) }}
                    <span v-if="item.course.description.length >= 100" @click.stop="toggleDescription(item)"
                      class="text-primary cursor-pointer">See more</span>
                  </p>
                  <p v-else-if="item.showFullDescription">
                    {{ item.course.description }}
                    <span @click.stop="toggleDescription(item)" class="text-primary cursor-pointer">See less</span>
                  </p>
                  <p v-else>No description available</p>
                </div>
                <div class="box-price text-end">
                  <h2 class="">{{ formatPrice(item.course.price) }}</h2>
                </div>
                <div class="status mt-4 size-auto w-auto">
                  <v-card class="status d-flex justify-center align-center h-6" :class="{'green': item.status === 'Incourse', 'yellow': item.status === 'Waiting'}">
                    {{ item.status }}
                  </v-card>
                </div>
              </v-card-text>
            </v-card>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CardOrder from "@/components/CardOrder.vue";
import { ENDPOINT } from "@/constants/endpoint";
import { mapState } from 'vuex';

export default {
  components: {
    CardOrder
  },
  data() {
    return {
      img: ENDPOINT.IMG,
      showFullDescription: false,
    }
  },
  computed: {
    ...mapState({
      order: (state) => state.order.order,

    }),
  },
  async mounted() {
    await this.getOrder();
  },
  methods: {
    async getOrder() {
      const payload = {
        userId: 6
      }
      await this.$store.dispatch("order/getOrder", payload);
      console.log("Order:", this.order);
    },
    toggleDescription(item) {
      item.showFullDescription = !item.showFullDescription;
    },
    truncatedDescription(description) {
      return description.length > 100 ? description.slice(0, 100) + '...' : description;
    },
    formatPrice(price) {
    return price.toLocaleString('en-US', { style: 'currency', currency: 'THB' }).replace('THB','฿')
  },
  },
}
</script>

<style scoped>
.v-card {
  transition: box-shadow 0.3s ease;
}
.v-card:hover {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}
.v-card-text h1 {
  font-weight: bold;
  font-size: 20px;
}
.v-card-text h1:hover {
  color: #075985;
}
.min-height {
  min-height: 400px;
}
.box-description {
  min-height: 100px;
}
.box-price {
  font-size: 24px;
  color: #fc5d19;

}
.green {
  background-color: #098ad0;
  color: rgb(255, 255, 255);
}

.yellow {
  background-color: #374248;
  color: rgb(255, 255, 255);
}
.head-course h1 {
  font-size: 35px;
  color: rgb(0, 0, 0);
  border-bottom: 1px solid #000000;
  font-style: italic;
}
.head h1 {
  font-size: 20px;
  color: rgb(6, 6, 6);
  border-bottom: 1px solid #9e9e9e;
  font-style: italic;
}
</style>