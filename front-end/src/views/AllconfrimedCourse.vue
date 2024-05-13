<template>
  <div>
    <h1 class="text-4xl  mb-8 text-center bg-gray-100 px-4 py-4 rounded-lg">Confirmed Orders</h1>
    <ul>
      <li v-for="(order, index) in confirmedOrders" :key="index">
        {{ order.name }} - {{ order.price }} - {{ order.detail }} - {{ order.user }} - {{  order.email }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    confirmedOrders() {
      return this.$store.state.order.confirmedOrders;
    },
  },
  methods: {
    confirmOrder(index) {
      this.orders[index].confirmed = true;
      this.showConfirmationDialog = true;
      this.hideActions(index);
      // เรียกใช้ mutation เพื่อเพิ่มรายการที่ยืนยันแล้วเข้าไปใน Vuex store
      this.$store.commit("order/confirmOrder", index);
    },
  },
};
</script>
