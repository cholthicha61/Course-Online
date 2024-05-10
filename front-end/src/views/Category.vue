<template>
  <div class="px-8 mt-8">
    <div class="head-course">
      <h1>Manage Category</h1>
    </div>
  </div>
  <div>
    <div class="add-category-btn">
      <AddCategory />
    </div>
    
    <v-data-table-virtual :headers="headers" :items="names" height="400" item-value="name">
      <template v-slot:[`item.no`]="{ index }">
        {{ index + 1 }}
      </template>

      <!-- <template v-slot:[`item.name`]="{ item }">
        <b class="border-2 border-red-500">{{ item.name }}</b>
      </template> -->


      <template v-slot:[`item.delet`]="{ item }">
        <v-btn
              color="blue"
              @click="updateCategory(item)"
              style="margin-right: 8px"
              
            >
              Edit</v-btn
            >
            <v-btn color="warning" @click="() => deleteCategory(item.id)"
              >delete</v-btn
            >      
          
        </template>



<!-- 
      <template v-slot:[`item.name`]="{ item }">
      </template> -->

      <!-- <template #item="{ item }">
        <tr :key="item">
          <td
            class="text-start"
            style="width: 150x; max-width: 150px; word-wrap: break-word"
          >
            {{ item }}
          </td>
          <td
            class="text-start"
            style="width: 150x; max-width: 150px; word-wrap: break-word"
          >
            {{ item.name }}
          </td>
          <td style="width: 100px; margin-left: auto">
            <v-switch
              v-model="item.delet"
              color="#0284C7"
              hide-details
              inset
            />
          </td>
          <td class="">
       
          </td>
        </tr>
      </template> -->
    </v-data-table-virtual>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AddCategory from "../components/AddCategory.vue";
import category from "@/store/modules/category";
export default {
  components: {
    AddCategory,
    
  },
  data() {
    return {
      headers: [
        { title: "No.", align: "center", value: "no" },
        { title: "Category Name", align: "center", value: "name" },
        { title: "Action", align: "center", value: "delet" },
      ],
      categorys: [],
    };
  },
  computed: {
    ...mapState({
      names: (state) => state.category.names,
    }),
    virtualBoats () {
        return [...Array(10000).keys()].map(i => {
          const categorys = { ...this.categorys[i % this.categorys.length] }
          categorys.name = `${categorys.name} #${i}`
          return categorys
        })
      },
    },
  async mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      const payload = {
        category: true,
      };
      await this.$store.dispatch("category/getCategory", payload);
      console.log("getCategory", this.names);
      this.categorys = this.names;
    },
    async deleteCategory(categoryId) {
      await this.$store.dispatch("category/deleteCategory", categoryId);
    },
    // async updateCategory(categoryId) {
    //   await this.$store.dispatch("category/deleteCategory", categoryId);
    // }
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
