<template>
<div class="q-pa-md">
<BreadCrumbs :title='title' />
<q-page class="q-pa-md">
    
    <!-- table -->
    <q-table
      :data="permissions"
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
  name: "Permissions",
  components:{
    BreadCrumbs
  },
  computed:{
    ...mapGetters({
      permissions:'allPermissions',
    })
  },
  methods:{
    ...mapActions(['getPermissions']),
  },
  created(){
    this.getPermissions();
  },
  data() {
    return {
      title: this.$t('table.permissions.title'),
      lang : this.$i18n.locale === 'en-us' ? this.$i18n.locale.substr(0, 2) : this.$i18n.locale,
      filter: "",
      dialogHeader: this.$t('headers.create'),
      columns: [
        {
          name: "#",
          required: true,
          label: this.$t("table.permissions.headers.id"),
          align: "left",
          field: (row) => (this.permissions.indexOf(row) +1 ),
          sortable: true,
        },
        {
          name: "name",
          required: true,
          label: this.$t("table.permissions.headers.name"),
          align: "center",
          field: (row) => row.name,
          sortable: true,
        },
        {
          name: "create_at",
          required: true,
          label: this.$t("table.permissions.headers.created_at"),
          align: "center",
          field: (row) => (new Date(row.created_at).toLocaleString()),
          sortable: true,
        },
        {
          name: "updated_at",
          required: true,
          label: this.$t("table.permissions.headers.updated_at"),
          align: "center",
          field: (row) =>new Date(row.updated_at).toLocaleString(),
          sortable: true,
        }
      ]
    };
  }
};
</script>