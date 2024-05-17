<template>
  <div class="flex justify-center items-center">
    <div
      class="max-w-screen-lg p-8 bg-stone-200 rounded-lg shadow-lg hover:shadow-xl"
    >
      <div class="flex justify-center">
        <img
          src="../../public/img/PTeacherEng.jpg"
          alt="Profile Image"
          class="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md transition duration-500 transform hover:scale-110"
        />
      </div>
      <div class="text-center mt-4">
        <h2 class="text-xl text-gray-700 font-semibold hover:text-sky-500">
          คุณครูเพ็ญศรี ตลก76ฉาก
        </h2>
        <div class="text-x text-gray-700 mt-2">
          <p>
            อีเมล:
            <span class="font-medium hover:text-gray-400"
              >example@example.com</span
            >
          </p>
          <p>
            โทรศัพท์:
            <span class="font-medium hover:text-gray-400">123-456-7890</span>
          </p>
        </div>
        <p class="text-sm text-gray-600 mt-2 hover:text-gray-400">
          ประวัติผู้สอน: Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Duis suscipit ligula nec erat congue fermentum. Maecenas vitae
          tellus vitae lacus accumsan eleifend.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileCard",
};
</script>

<style></style>
