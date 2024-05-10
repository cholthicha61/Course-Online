<template>
  <div class="container mx-auto mt-4">
    <h2 class="text-3xl font-bold text-center">Create Account</h2>

    <div
      class="flex items-center flex flex-col w-full px-96 py-10 border-gray-200 rounded-lg"
    >
      <div class="flex flex-col mb-4">
        <label class="mb-2 text-gray-700">Firstname</label>
        <input
          type="text"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-96"
          v-model="fname"
        />
        <span class="text-blue-100">{{ fnameError }}</span>
      </div>

      <div class="flex flex-col mb-4">
        <label class="mb-2 text-gray-700">Lastname</label>
        <input
          type="text"
          class="form-input border border-l-gray-300 rounded-md px-2 py-2 w-96"
          v-model="lname"
        />
      </div>

      <div class="flex flex-col mb-4">
        <label class="mb-2 text-gray-700">Email</label>
        <input
          type="email"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-96"
          v-model="email"
        />
      </div>

      <div class="flex flex-col mb-4">
        <label class="mb-2 text-gray-700">Password</label>
        <input
          type="password"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-96"
          v-model="password"
        />
      </div>

      <div class="flex flex-col mb-4">
        <label class="mb-2 text-gray-700">Confirm Password</label>
        <input
          type="password"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-96"
          v-model="confirmPassword"
        />
      </div>

      <div class="flex flex-col mb-4">
        <label class="mb-2 text-gray-700">Phone</label>
        <input
          type="tel"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-96"
          v-model="phone"
        />
      </div>
      <button
        @click="createUser()"
        class="w-96 bg-sky-600 text-white font-bold py-2 px-4 rounded-md hover:bg-sky-800"
      >
        Create Account
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fname: "",
      lname: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      agree: false,
      fnameError: null,
      lnameError: null,
      emailError: null,
      passwordError: null,
      confirmPasswordError: null,
      phoneError: null,
      termsError: null,

      payload: {
        fname: "",
        lname: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  computed: {
    passwordMatch() {
      return this.password === this.confirmPassword;
    },
  },
  methods: {
    handleSubmit(event) {
      // ตรวจสอบข้อมูลก่อน submit
      this.validateForm();

      if (
        this.fnameError ||
        this.lnameError ||
        this.emailError ||
        this.passwordError ||
        this.confirmPasswordError ||
        this.phoneError ||
        this.termsError ||
        !this.passwordMatch
      ) {
        return; // หยุดการ submit ถ้ามีข้อผิดพลาด
      }

      console.log("Submitting registration data...");

      event.preventDefault();

      console.log(
        "register submitted:",
        this.fname,
        this.lname,
        this.phone,
        this.email,
        this.password,
        this.roleId
      );
    },
    async createUser() {
      this.payload = {
        fname: this.fname,
        lname: this.lname,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
        phone: this.phone,
        roleId: 2,
      };
      await this.$store.dispatch("user/createUser", this.payload);
      console.log("payload", this.payload);
    },
    validateForm() {
      // ตรวจสอบชื่อ
      if (!this.fname.trim()) {
        this.fnameError = "กรุณากรอกชื่อ";
      } else {
        this.fnameError = null;
      }

      // ตรวจสอบนามสกุล
      if (!this.lname.trim()) {
        this.lnameError = "กรุณากรอกนามสกุล";
      } else {
        this.lnameError = null;
      }

      // ตรวจสอบอีเมลล์
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!this.email.trim()) {
        this.emailError = "กรุณากรอกอีเมลล์";
      } else if (!emailPattern.test(this.email)) {
        this.emailError = "รูปแบบอีเมลล์ไม่ถูกต้อง";
      } else {
        this.emailError = null;
      }

      // ตรวจสอบรหัสผ่าน
      if (!this.password.trim()) {
        this.passwordError = "กรุณากรอกรหัสผ่าน";
      } else if (this.password.length < 6) {
        this.passwordError = "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
      } else {
        this.passwordError = null;
      }

      // ตรวจสอบการยืนยันรหัสผ่าน
      if (!this.confirmPassword.trim()) {
        this.confirmPasswordError = "กรุณายืนยันรหัสผ่าน";
      } else if (this.password !== this.confirmPassword) {
        this.confirmPasswordError = "รหัสผ่านไม่ตรงกัน";
      } else {
        this.confirmPasswordError = null;
      }

      // ตรวจสอบเบอร์โทรศัพท์
      const phonePattern = /^[0-9]+$/;
      if (!this.phone.trim()) {
        this.phoneError = "กรุณากรอกเบอร์โทรศัพท์";
      } else if (!phonePattern.test(this.phone)) {
        this.phoneError = "เบอร์โทรศัพท์ไม่ถูกต้อง";
      } else {
        this.phoneError = null;
      }

    },
  },
};
</script>
