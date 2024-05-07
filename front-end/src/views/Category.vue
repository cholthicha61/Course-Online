<template>
    <div class="px-8 mt-8">
    <div class="head-course">
      <h1>Manage Category</h1>
    </div>
  </div>
  <div>
    <div style="display: flex; justify-content: flex-end">
      <v-btn class="mt-5 ma-5" color="#0284C7" @click="addCourse" 
        >Add Category</v-btn
      >
    </div>
    <v-data-table-virtual :headers="headers" :items="course" height="500">
      <template v-slot:[`item.no`]="{ index }">
        {{ index + 1 }}
      </template>

      <template #item="{ item }">
        <tr :key="item.coursename">
          <td
            class="text-start"
            style="width: 150x; max-width: 150px; word-wrap: break-word"
          >
            {{  }}
          </td>
          <td
            class="text-start"
            style="width: 150x; max-width: 150px; word-wrap: break-word"
          >
            {{ }}
          </td>
          <td
            class="text-start"
            style="width: 150x; max-width: 150px; word-wrap: break-word"
          >
            {{  }}
          </td>
          <td
            class="text-start"
            style="width: 150x; max-width: 150px; word-wrap: break-word"
          >
            {{  }}
          </td>
          <td
            class="text-center"
            style="width: 150x; max-width: 150px; word-wrap: break-word"
          >
            <v-btn
              color="warning"
              @click="setPriority(item)"
              style="margin-right: 8px"
            >
              edit</v-btn
            >
            <v-btn color="" @click="setPriority(item)">delete</v-btn>
          </td>
        </tr>
      </template>
    </v-data-table-virtual>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      headers: [
        { title: "No.", align: "start", value: "no." },
        { title: "Name", align: "start", value: "name" },
        { title: "Update", align: "start", value: "update" },
        { title: "Delet", align: "start", value: "delet" },
      ],
      course: [],
    };
  },
  computed: {
    
  },
  async mounted() {
  },
  methods: {
    
  },
};
</script>

<style scoped>
.head-course h1 {
  font-size: 30px;
  color: rgb(11, 94, 188);
  border-bottom: 1px solid #d9d9d9;
  font-style: italic;
}
</style>