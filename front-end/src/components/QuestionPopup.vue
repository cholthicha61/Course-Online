<template>
  <div>
    <button
      @click="togglePopup"
      v-if="!showPopup"
      class="fixed bottom-10 right-10 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg z-10"
    >
      <h1>Question ?</h1>
    </button>

    <transition name="fade">
      <div
        v-if="showPopup"
        class="fixed -bottom-1/4 right-10 transform -translate-y-1/2 bg-white rounded-lg p-6 shadow-lg z-10 h-94 w-80"
      >
        <h2 class="text-2xl mb-4">Question</h2>
        <button
          @click="togglePopup"
          class="absolute top-0 right-0 m-4 bg-transparent text-gray-600 hover:text-gray-800"
        >
          <span class="sr-only">Close</span>
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <input
          v-model="name"
          type="text"
          placeholder="Name"
          class="border border-gray-300 rounded-md mb-4 w-full px-3 py-2"
        />
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="border border-gray-300 rounded-md mb-4 w-full px-3 py-2"
        />
        <textarea
          v-model="message"
          placeholder="Message"
          class="border border-gray-300 rounded-md mb-4 w-full px-3 py-2 h-32"
        ></textarea>
        <div class="flex justify-end">
          <button
            @click="submitForm"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mr-2"
          >
            Submit
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPopup: false,
      name: "",
      email: "",
      message: "",
      payload: {
        date: "",
        email: "",
        message: "",
      },
    };
  },
  methods: {
    togglePopup() {
      this.showPopup = !this.showPopup;
    },
    submitForm() {
      // ทำการ submit form โดยเรียกใช้ sentEmail และส่ง payload ไปยังฟังก์ชัน
      this.sentEmail();
    },
    clearForm() {
      this.name = "";
      this.email = "";
      this.message = "";
    },
    async sentEmail() {
      this.payload = {
        email: this.email,
        message: this.message,
        date: new Date().toISOString(),
      };
      try {
        // เรียกใช้ sentEmail action จาก Vuex store และส่ง payload ไปด้วย
        await this.$store.dispatch("user/sentEmail", this.payload);
        console.log("Payload sent:", this.payload);
      } catch (error) {
        console.error("Error sending email:", error);
      }
    },
  },
};
</script>

<!-- <style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
  }
  </style> -->
