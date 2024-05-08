<template>
    <div class="px-8 mt-8">
    <div class="head-course">
      <h1 >Manage Category</h1>
    </div>
  </div>
  <div>
    <div class="add-category-btn "> 
       <AddCategory/>
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
            {{ }}
          </td>
          <td style="width: 100px; margin-left: auto">
            <v-switch
              v-model="item.active"
              color="#0284C7"
              hide-details
              inset
            />
          </td>
        </tr>
      </template>
    </v-data-table-virtual>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AddCategory from '../components/AddCategory.vue';
export default {
  components:{
    AddCategory
  },
  data() {
    return {
      headers: [
        { title: "No.", align: "start", value: "no." },
        { title: "Name", align: "start", value: "name" },
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
.add-category-btn {
  margin-left: 1225px; /* ปรับระยะห่างของปุ่ม Add Category จากข้อความ "Manage Category" */
}

</style>