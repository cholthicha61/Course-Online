<template>
  <div class="container mx-auto mt-4">
    <h2 class="text-3xl font-bold text-center">Create Account</h2>

    <div
      class="flex flex-col w-full px-96 py-8 border border-gray-200 rounded-lg shadow-md"
    >
      <div class="flex flex-col mb-4">
        <label class="mb-2 text-gray-700">ชื่อ</label>
        <input
          type="text"
          class="form-input border border-gray-300 bg-blue-100 rounded-md px-2 py-2"
          v-model="fname"
        />
        <span class="text-blue-100">{{ fnameError }}</span>
      </div>

      <div class="flex flex-col mb-4">
        <label class="mb-2 text-gray-700">นามสกุล</label>
        <input
          type="text"
          class="form-input border border-l-gray-300 bg-blue-100 rounded-md px-2 py-2"
        />
      </div>

      <div class="flex flex-col mb-4">
        <label class="mb-2 text-gray-700">อีเมลล์</label>
        <input
          type="email"
          class="form-input border border-gray-300 bg-blue-100 rounded-md px-2 py-2"
        />
      </div>

      <div class="flex flex-col mb-4">
        <label class="mb-2 text-gray-700">รหัสผ่าน</label>
        <input
          type="password"
          class="form-input border border-gray-300 bg-blue-100 rounded-md px-2 py-2"
        />
      </div>

      <div class="flex flex-col mb-4">
        <label class="mb-2 text-gray-700">ยืนยันรหัสผ่าน</label>
        <input
          type="password"
          class="form-input border border-gray-300 bg-blue-100 rounded-md px-2 py-2"
        />
      </div>

      <div class="flex flex-col mb-4">
        <label class="mb-2 text-gray-700">เบอร์โทรศัพท์</label>
        <input
          type="tel"
          class="form-input border border-gray-300 bg-blue-100 rounded-md px-2 py-2"
        />
      </div>

      <div class="flex items-center mb-4">
        <input type="checkbox" class="form-checkbox h-4 w-4 text-blue-600" />
        <label class="ml-2 text-gray-700"
          >Agree with Terms and Conditions</label
        >
      </div>

      <button
        class="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
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
    };
  },
  computed: {
    passwordMatch() {
      return this.password === this.confirmPassword;
    },
  },
  methods: {
    handleSubmit() {
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

    console.log('Submitting registration data...');
  },
  validateForm() {
    // ตรวจสอบชื่อ
    this.fnameError = this.validateName(this.fname);
    this.lnameError = this.validateName(this.lname);

    // ตรวจสอบอีเมลล์
    this.emailError = this.validateEmail(this.email);

    // ตรวจสอบรหัสผ่าน
    this.passwordError = this.validatePassword(this.password);
    this.confirmPasswordError = this.validatePassword(this.confirmPassword);

    // ตรวจสอบเบอร์โทรศัพท์ (ตัวอย่าง: ใส่เฉพาะตัวเลข)
    this.phoneError = this.phone.match(/^[0-9]+$/) ? null : 'เบอร์โทรศัพท์ไม่ถูกต้อง';

    this.termsError = this.agree ? null : 'กรุณายอมรับข้อกำหนดและเงื่อนไข';
  },
  validateName(name) {
    if (!name.trim()) {
      return 'กรุณากรอกชื่อ';
    }
    return null;
  },
  validateEmail(email){
    const re = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!re.test(email)) {
      return 'รูปแบบอีเมลล์ไม่ถูกต้อง (กรุณาใช้ Gmail)';
    }
    return null;
  },
  validatePassword(password) {
    if (password.length < 6) {
      return 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร';
    }
    return null;

    //   if (this.password !== this.confirmPassword || !this.agree) {
    //     return;
    //   }

      console.log("Submitting registration data...");
    },
  },
};
</script>

