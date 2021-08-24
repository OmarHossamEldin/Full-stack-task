<template>
<div class="q-pa-md">
  <!--========BreadCrumbs=========-->
  <BreadCrumbs :title='title' />

  <q-page class="q-pa-md">
    <!-- table -->
    <q-table
      class="my-sticky-header-table window-width"
      :title="$t('table.inbox.title')"
      :data="categories"
      :columns="columns"
      :filter="filter"
      :rows-per-page-options="[20, 30, 50, 0]"
      row-key="id"
      separator="vertical"
    >
      <template v-slot:top>
        <q-btn color="primary" @click="prompt =!prompt" :label="$t('btns.create')"  />
        <q-space />
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
          <q-btn color="red" :label="$t('btns.delete')"  />
        </q-td>
      </template>
    </q-table>
  </q-page>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BreadCrumbs from 'components/BreadCrumbs';
export default {
  name: "Inbox",
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
      title: this.$t("table.inbox.title"),
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
          label: this.$t("table.inbox.headers.id"),
          align: "left",
          field: (row) => row.id,
          sortable: true,
        },
        {
          name: "from",
          required: true,
          label: this.$t("table.inbox.headers.from"),
          align: "center",
          field: (row) => row.name[this.lang],
          sortable: true,
        },
        {
          name: "subject",
          align: "center",
          label: this.$t("table.inbox.headers.subject"),
          field: "parent_id",
          sortable: true,
        },
        {
          name: "actions",
          align: "center",
          label: this.$t("table.inbox.headers.actions"),
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
