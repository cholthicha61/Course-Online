<template>
  <div class="px-8 mt-8">
    <div class="head-course">
      <h1>Manage Category</h1>
    </div>
  </div>
  <div>
    <div class="add-category-btn">
      <AddCategory  />
    </div>

    
      <EditCategory v-if="isEditCategory" :isEditCategory="isEditCategory" :selectCategory="selectCategory" :onCloseEdit="onCloseEdit"/>
 
    <v-data-table-virtual
      :headers="headers"
      :items="names"
      height="400"
      item-value="name"
    >
      <template v-slot:[`item.no`]="{ index }">
        {{ index + 1 }}
      </template>
      <template v-slot:[`item.update`]="{ item }">
        <v-btn
          color="blue"
          @click="updateCategory(item)"
          style="margin-right: 8px"
        >
          Edit
        </v-btn>
      </template>

      <template v-slot:[`item.delet`]="{ item }">
        <v-btn color="warning" @click="deleteCategory(item.id)">delete</v-btn>
      </template>
    </v-data-table-virtual>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AddCategory from "../components/AddCategory.vue";
import category from "@/store/modules/category";
import EditCategory from "../components/EditCategory.vue"
import Swal from "sweetalert2";

export default {
  components: {
    AddCategory,
    EditCategory
  },
  data() {
    return {
      headers: [
        { title: "No.", align: "center", value: "no" },
        { title: "Category Name", align: "center", value: "name" },
        { title: "Action", align: "center", value: "update" },
        { title: "Action", align: "center", value: "delet" },
      ],
      categorys: [],
      isEditCategory: false,
      selectCategory: {}
    };
  },
  computed: {
    ...mapState({
      names: (state) => state.category.names,
    }),
  },
  watch: {
    names(newVal) {
      return newVal;
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
      this.categorys = this.names;
    },
    async deleteCategory(categoryId) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async(result) => {
        if (result.isConfirmed) {
          await this.$store.dispatch("category/deleteCategory", categoryId);
        }
      });

    },
    async updateCategory(item) {
      this.isEditCategory = true;
      this.selectCategory = item
    },
    onCloseEdit(isClose){
      this.isEditCategory = false;
    }
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
  margin-left: 1225px;
}
</style>
