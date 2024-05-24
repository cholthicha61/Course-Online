<template>
    <div class="flex justify-center mt-8">
      <div class=" p-16 rounded-lg w-3/4">
        <h1 class="text-2xl font-bold mb-4">All Confirmed Courses</h1>
        <div class="overflow-x-auto">
          <table class="min-w-full border-collapse">
            <thead>
              <tr>
                <th class="px-6 py-3 bg-blue-200 text-left text-sm font-semibold text-black uppercase border-b border-gray-300">Course Name</th>
                <th class="px-6 py-3 bg-blue-200 text-left text-sm font-semibold text-black uppercase border-b border-gray-300">Price</th>
                <th class="px-6 py-3 bg-blue-200 text-left text-sm font-semibold text-black uppercase border-b border-gray-300">Detail</th>
                <th class="px-6 py-3 bg-blue-200 text-left text-sm font-semibold text-black uppercase border-b border-gray-300">User</th>
                <th class="px-6 py-3 bg-blue-200 text-left text-sm font-semibold text-black uppercase border-b border-gray-300">Email</th>
                <th class="px-6 py-3 bg-blue-200 text-left text-sm font-semibold text-black uppercase border-b border-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(course, index) in courses" :key="index">
                <td class="px-6 py-4 whitespace-nowrap border-b border-gray-300">{{ course.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap border-b border-gray-300">{{ course.price }}</td>
                <td class="px-6 py-4 whitespace-nowrap border-b border-gray-300">{{ course.detail }}</td>
                <td class="px-6 py-4 whitespace-nowrap border-b border-gray-300">{{ course.user }}</td>
                <td class="px-6 py-4 whitespace-nowrap border-b border-gray-300">{{ course.email }}</td>
                <td class="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                  <span v-if="course.status" class="text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16z" clip-rule="evenodd" />
                      <path fill-rule="evenodd" d="M5.86 10.75a.75.75 0 01-.743-.646L5.01 6.5a.75.75 0 011.486-.208l.117.849 3.98-1.281a.75.75 0 11.457 1.44l-4.5 1.446a.75.75 0 01-.484.002l-4.5-1.446a.75.75 0 11.457-1.44l3.98 1.281.117-.85a.75.75 0 01.646-.743z" clip-rule="evenodd" />
                    </svg>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        courses: [
          {
            name: '',
            price: '',
            detail: '',
            user: '',
            email: '',
            status: false
          },
          {
            name: 'Course 2',
            price: '$150',
            detail: 'Consectetur adipiscing elit',
            user: 'Jane Smith',
            email: 'jane@example.com',
            status: true // or false for unchecked
          },
          {
            name: 'EIEI',
            price: '50K',
            detail: 'สิ่งนี้จะช่วยชีวิตพวกคุณไดั ',
            user: 'โยฮัน',
            email: 'EIEI@example.com',
            status: true // or false for unchecked
          },
        ]
      }
    }
  }
  </script>
  