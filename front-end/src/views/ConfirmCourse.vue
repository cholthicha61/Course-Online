<template>
  <div class="pa-4 text-center" >
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular"
          text="BUY"
          variant="tonal"
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <v-card class="" title="Confirm your course">
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="12" sm="6" class="mt-5">
              <v-text-field class="" label="Course" required></v-text-field>
            </v-col>

            <v-col cols="12" md="12" sm="6"> </v-col>
            <v-col cols="12" md="12" sm="6"> </v-col>
            <v-col cols="12" md="12" sm="6">
              <v-text-field label="Price" required></v-text-field>
            </v-col>

            <v-col cols="12" md="12" sm="6"> </v-col>

            <v-col cols="12" md="12" sm="6"> </v-col>

            <v-col cols="12" sm="12">
              <v-text-field label="Detail" required></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="6"> </v-col>

            <v-col cols="12" sm="12">
              <v-text-field
                label="Email"
                required
                v-model="userEmail.email"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>

          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            @click="dialog = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    // coursename: "",
    // price: "",
    // detail: "",
    // email: "",
  }),
  //   methods: {
  // async buyCourse() {
  //   const payload = {
  //     coursename: this.coursename,
  //     price: this.price,
  //     detail: this.detail,
  //     email: this.email,
  //   };
  //   await this.$store.dispatch("order/courseOrder", payload);
  //   this.dialog = false;
  //   this.coursename = "";
  //   this.price = "";
  //   this.detail = "";
  //   this.email = "";
  // },
  // mounted() {
  //    this.course = JSON.parse(localStorage.getItem("course"));
  //   this.detail = JSON.parse(localStorage.getItem("detail"));
  //    this.price = JSON.parse(localStorage.getItem("price"));
  //   this.userEmail = JSON.parse(localStorage.getItem("user"));

  // },

  mounted() {
    this.userEmail = JSON.parse(localStorage.getItem("user"));
  },
};
</script>

<style></style>
