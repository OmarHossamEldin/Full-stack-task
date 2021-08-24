<template>
<div class="q-pa-md">
  <!--========BreadCrumbs=========-->
  <BreadCrumbs :title='title' />
  <q-page class="q-pa-md">
    <!-- table -->
    <q-table
      class="my-sticky-header-table window-width"
      :title="$t('table.categories.title')"
      :data="categories"
      :columns="columns"
      :filter="filter"
      :rows-per-page-options="[20, 30, 50, 0]"
      row-key="id"
      separator="vertical"
    >
      <template v-slot:top>
        <q-input
          rounded
          outlined
          debounce="300"
          color="primary"
          v-model="filter"
          :placeholder="$t('table.search')"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
       <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn :color="props.row.active ? 'warning' : 'green'" :label="props.row.active ? $t('btns.deactivate') : $t('btns.activate')"    /> |
          <q-btn color="info" :label="$t('btns.edit')" @click="prompt = !prompt"  /> |
          <q-btn color="red" :label="$t('btns.delete')"  />
        </q-td>
      </template>
    </q-table>
    <!-- dialog create - edit -->
      <q-dialog v-model="prompt">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6 ">{{$t('category.enName')}}</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input dense rounded outlined v-model="enName"  />
        </q-card-section>
        <q-card-section>
          <div class="text-h6 ">{{$t('category.arName')}}</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input dense rounded outlined  v-model="arName" />
        </q-card-section>
        <q-card-section>
          <div class="text-h6 ">{{$t('category.parentCategory')}}</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <v-select :options="options" v-model='parent_id' :reduce="parent_id => parent_id.id" label="name"></v-select>
        </q-card-section>
        <q-card-actions  class="text-primary">
          <q-btn flat :label="$t('btns.cancel')" v-close-popup />
          <q-btn flat :label="$t('btns.save')" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BreadCrumbs from 'components/BreadCrumbs';
export default {
  name: "Clients",
  components:{
    BreadCrumbs
  },
  computed:{
    ...mapGetters({
      categories:'allCategories',
      options: 'allCategoryOptions'
    })
  },
  data() {
    return {
      title: this.$t("table.clients.title"),
      lang : this.$i18n.locale === 'en-us' ? this.$i18n.locale.substr(0, 2) : this.$i18n.locale,
      filter: "",
      arName: "",
      enName: "",
      parent_id:"",
      prompt: false, 
      columns: [
        {
          name: "id",
          required: true,
          label: this.$t("table.categories.headers.id"),
          align: "left",
          field: (row) => row.id,
          sortable: true,
        },
        {
          name: "name",
          required: true,
          label: this.$t("table.categories.headers.name"),
          align: "center",
          field: (row) => row.name[this.lang],
          sortable: true,
        },
        {
          name: "parentCategory",
          align: "center",
          label: this.$t("table.categories.headers.parentCategory"),
          field: "parent_id",
          sortable: true,
        },
        {
          name: "actions",
          align: "center",
          label: this.$t("table.categories.headers.actions"),
          field: (row) => row.id
        }
      ]
    };
  },
  methods:{
    ...mapActions(['getCategories']),
  },
  created(){
    this.getCategories();
  }
};
</script>
