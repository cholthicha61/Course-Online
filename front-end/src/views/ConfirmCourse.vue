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
                readonly
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="12" sm="6">
              <v-text-field
                label="Price"
                required
                v-model="formattedPrice"
                readonly
              ></v-text-field>
            </v-col>

            <!-- <v-col cols="12" sm="12">
              <v-text-field
                label="Description"
                required
                v-model="course.description"
                readonly
              ></v-text-field>
            </v-col> -->

            <v-col cols="12" sm="12">
              <v-text-field
                label="Email"
                v-model="userEmail.email"
                readonly
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
            @click="showConfirmationDialog"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Swal from "sweetalert2";

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
        id: null, 
      },
      formattedPrice: "", 
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
      this.formattedPrice = `฿${newVal.price} `; 
    },
  },
  methods: {
    setClose() {
      this.setCloseModal();
      this.dialog = false;
    },
    async showConfirmationDialog() {
      this.dialog = false; 
      const { isConfirmed } = await Swal.fire({
        title: "Do you want to buy this course?",
        text: `Course: ${this.course.courseName}\nPrice: ${this.course.price} บาท\nDescription: ${this.course.description}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm course purchase",
        cancelButtonText: "Cancel",
      });

      if (isConfirmed) {
        this.createOrder(); 
      } else {
        this.dialog = true; 
      }
    },
    async createOrder() {
      const payload = {
        courseId: this.course.id,
        userId: this.userEmail.id,
      };
      
      await this.$store.dispatch("order/createOrder", payload);
      
      this.setClose(); 
      console.log("payload : ", payload);
      Swal.fire({
        title: "Successfully purchased the course",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
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
  },
};
</script>

<style scoped>

</style>
