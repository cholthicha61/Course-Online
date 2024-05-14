<template>
  <div class="pa-4 text-center drop-shadow-lg">
    <v-dialog v-model="dialog" max-width="600">
      <!-- <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="bg-sky-600 text-white hover:bg-sky-700"
          text="Add Category"
          variant=""
          v-bind="activatorProps"
          @click="clearForm"
        ></v-btn>
      </template> -->

      <v-card title="Edit Category" class="">
        <v-card-text>
          <v-row dense>
            <v-col>
              <v-text-field
                label="Category Name"
                v-model="name"
                class=""
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>

          <v-btn
            color="#4A6FA5"
            text="Save"
            variant="tonal"
            @click="saveCategory"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    name: "",
    formData: {},
  }),
  props: {
    isEditCategory: Boolean,
    onCloseEdit: Function,
    selectCategory: Object,
  },
  watch: {
    isEditCategory(newVal) {
      return this.dialog = newVal;
    },
    dialog(newVal) {
      if (newVal == false) {
        // this.isEditCategory = false
        this.onCloseEdit(newVal)
      }
    },
  },
  mounted(){
    this.dialog = this.isEditCategory
    this.name = this.selectCategory.name
    console.log("selectCategory ", this.selectCategory);
  },
  methods: {
    async saveCategory() {
      await this.$store.dispatch("category/updateCategory", {
        categoryId: this.selectCategory.id,
        newData: {
          name: this.name
        },
      });

      this.dialog = false;
    },
    setData(item) {
      this.name = item.name;
      this.dialog = true;
    },

    clearForm() {
      this.name = "";
      this.dialog = true;
    },
  },
};
</script>
