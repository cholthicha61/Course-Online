<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600" persistent>
      <v-card class="" title="Confirm your course">
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="12" sm="6" class="mt-5">
              <v-text-field
                class=""
                label="Course Name"
                required
                v-model="course.courseName"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="12" sm="6"> </v-col>
            <v-col cols="12" md="12" sm="6"> </v-col>
            <v-col cols="12" md="12" sm="6">
              <v-text-field label="Price" required v-model="course.price">
              </v-text-field>
            </v-col>

            <v-col cols="12" md="12" sm="6"> </v-col>

            <v-col cols="12" md="12" sm="6"> </v-col>

            <v-col cols="12" sm="12">
              <v-text-field
                label="Description"
                required
                v-model="course.description"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="6"> </v-col>

            <v-col cols="12" sm="12">
              <v-text-field
                label="Email"
                v-model="userEmail.email"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" variant="plain" @click="setClose"></v-btn>

          <v-btn
            color="primary"
            text="Confirm"
            variant="tonal"
            @click="createOrder"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    course: {
      type: Object,
      required: true,
    },
    openModal: {
      type: Boolean,
      required: true,
    },
    setCloseModal: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      dialog: this.openModal,
      userEmail: {
        email: "",
        id: Number
      },
    };
  },
  watch: {
    openModal(newVal) {
      this.dialog = newVal;
    },
    course(newVal) {
      this.course.courseName = newVal.courseName;
      this.course.price = newVal.price;
      this.course.description = newVal.description;
    },
  },
  methods: {
    setClose() {
      this.setCloseModal();
      this.dialog = false;
    },
    async createOrder() {

      const payload = {
        courseId: this.course.id,
        userID: this.userEmail.id,
      };
      await this.$store.dispatch('order/createOrder', payload);
      this.setClose();
      console.log("payload : ",payload);
      
    },
  },
  mounted() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("User from localStorage:", user);
  if (user) {
    this.userEmail.email = user.email;
    this.userEmail.id = user.id;
    console.log("userEmail after setting:", this.userEmail);
  }
}

};
</script>
