<template>
  <div class="q-pa-md">
  <!--========BreadCrumbs=========-->
  <BreadCrumbs :title='title' />

  <q-page class="q-pa-md">
    <!-- table -->
    <q-table
      :data="categories"
      :columns="columns"
      :filter="filter"
      :rows-per-page-options="[20, 30, 50, 0]"
      row-key="id"
    >
      <template v-slot:top>
        <q-btn color="primary" @click="openPrompt" :label="$t('btns.create')"  />
        <q-space />
        <q-input
          debounce="300"
          color="primary"
          v-model="filter"
          dense
          :placeholder="$t('table.search')"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-active="props">
        <q-td :props="props">
          <q-btn size="sm"
            :color="props.row.active ? 'warning' : 'green'" round icon="toggle_off"
            @click="changeStatus(props.row)" /> 
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" >
          <q-btn size="sm" color="info" :label="$t('btns.edit')" @click="openPrompt(props.row)"  />
          &nbsp;
          <q-btn size="sm" color="red" :label="$t('btns.delete')" @click="deleteThis(props.row)" />
        </q-td>
      </template>
    </q-table>
      <!-- dialog create - edit -->
      <q-dialog v-model="prompt" position="top" >
        <q-card class="column dialogForm">
          <q-form @submit="save(category)">
            <q-card-section class="col-2 row">
              <div class="text-h4">{{dialogHeader}}</div>
              <q-space />
              <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>
            <q-card-section class="col-2" >
              <q-input dense filled outlined v-model="category.enName" :placeholder="$t('category.enName')" />
            </q-card-section>
            <q-card-section class="col-2">
              <q-input dense filled v-model="category.arName" :placeholder="$t('category.arName')" />
            </q-card-section>
            <q-card-section class="col-4">
              <v-select :options="options" v-model='category.parent_id' :reduce="parent_id => parent_id.id" label="name" :placeholder="$t('category.parentCategory')"></v-select>
            </q-card-section>
            <q-card-actions  class="col-1 text-primary">
              <q-btn flat :label="$t('btns.cancel')" v-close-popup />
              <q-btn flat :label="$t('btns.save')" type="submit"  v-close-popup />
            </q-card-actions>
          </q-form>
        </q-card>
      </q-dialog>
    </q-page>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BreadCrumbs from 'components/BreadCrumbs';
export default {
  name: "Categories",
  components:{
    BreadCrumbs
  },
  computed:{
    ...mapGetters({
      categories:'allCategories',
      options: 'allCategoryOptions'
    })
  },
  methods:{
    ...mapActions(['getCategories', 'storeCategory', 'updateCategory', 'activeDeactiveCategory', 'deleteThisCategory']),
    save(category){
      if(category.id) {
        this.updateCategory(category).then((response) => {
          this.$notifyAlert(response);
        });
      }
      else {
        this.storeCategory(category).then((response) => {
          this.$notifyAlert(response);
        });
      }  
      this.category = this.defaultCategory;
    },
    deleteThis(thisCategory){
      this.deleteThisCategory(thisCategory);
    },
    changeStatus(category){
      this.activeDeactiveCategory(category);
    },
    openPrompt(row){
      if(row.id) {
        this.dialogHeader = this.$t('headers.edit');
        this.category = {
          id: row.id,
          arName: row.name,
          enName: row.name
        };
      }
      else{
        this.dialogHeader = this.$t('headers.create');
        this.category = this.defaultCategory;
      }
      this.prompt = !this.prompt;
    }
  },
  created(){
    this.getCategories();
  },
  data() {
    return {
      title: this.$t('table.categories.title'),
      lang : this.$i18n.locale === 'en-us' ? this.$i18n.locale.substr(0, 2) : this.$i18n.locale,
      filter: "",
      category:{
        arName: "",
        enName: "",
        parent_id:"",
      },
      defaultCategory:{
        arName: "",
        enName: "",
        parent_id:"",
      },
      prompt: false,
      dialogHeader: this.$t('headers.create'),
      columns: [
        {
          name: "#",
          required: true,
          label: this.$t("table.categories.headers.id"),
          align: "left",
          field: (row) => (this.categories.indexOf(row) +1 ),
          sortable: true,
        },
        {
          name: "name",
          required: true,
          label: this.$t("table.categories.headers.name"),
          align: "center",
          field: (row) => row.name,
          sortable: true,
        },
        {
          name: "parentCategory",
          align: "center",
          label: this.$t("table.categories.headers.parentCategory"),
          field: (row) => ( row.parent ? row.parent.name : ''),
          sortable: true,
        },
        {
          name: "active",
          align: "center",
          label: this.$t("table.categories.headers.activate")
        },
        {
          name: "actions",
          align: "center",
          label: this.$t("table.categories.headers.actions")
        }
      ]
    };
  }
};
</script>
<style lang="sass">
.dialogForm
  height: 300px
  width: 500px
</style>