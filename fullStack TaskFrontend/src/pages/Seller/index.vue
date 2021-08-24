<template>
<div class="q-pa-md">
<BreadCrumbs :title='title' />
<q-page class="q-pa-md">
    
    <!-- table -->
    <q-table
      :data="sellers"
      :columns="columns"
      :filter="filter"
      :rows-per-page-options="[20, 30, 50, 0]"
      row-key="id"
    >
      <template v-slot:top>
        <q-space />
        <q-input
          dense
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
          <q-btn size="sm" color="info" :label="$t('btns.edit')"   /> 
          &nbsp;
          <q-btn size="sm" color="red" :label="$t('btns.delete')" />
        </q-td>
      </template>
    </q-table>
    <!-- dialog create - edit -->
    
  </q-page>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BreadCrumbs from 'components/BreadCrumbs';
export default {
  name: "Sellers",
  components:{
    BreadCrumbs
  },
  computed:{
    ...mapGetters({
      sellers:'allSellers',
    })
  },
  methods:{
    ...mapActions(['getSellers']),
  },
  created(){
    this.getSellers();
  },
  data() {
    return {
      title: this.$t('table.sellers.title'),
      lang : this.$i18n.locale === 'en-us' ? this.$i18n.locale.substr(0, 2) : this.$i18n.locale,
      filter: "",
      dialogHeader: this.$t('headers.create'),
      columns: [
        {
          name: "#",
          required: true,
          label: this.$t("table.sellers.headers.id"),
          align: "left",
          field: (row) => (this.sellers.indexOf(row) +1 ),
          sortable: true,
        },
        {
          name: "firstName",
          required: true,
          label: this.$t("table.sellers.headers.firstName"),
          align: "center",
          field: (row) => row.firstName,
          sortable: true,
        },
        {
          name: "lastName",
          required: true,
          label: this.$t("table.sellers.headers.LastName"),
          align: "center",
          field: (row) => (row.category ? row.category.map((key) =>( key.name + ' '))  : ''),
          sortable: true,
        },
        {
          name: "actions",
          align: "center",
          label: this.$t("table.sellers.headers.actions")
        }
      ]
    };
  }
};
</script>