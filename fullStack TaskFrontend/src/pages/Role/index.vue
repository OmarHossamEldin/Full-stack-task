<template>
<div class="q-pa-md">
<BreadCrumbs :title='title' />
<q-page class="q-pa-md">
    
    <!-- table -->
    <q-table
      :data="roles"
      :columns="columns"
      :filter="filter"
      :rows-per-page-options="[20, 30, 50, 0]"
      row-key="id"
    >
      <template v-slot:top>
        <q-btn color="primary" :to="{name:'role.create'}" :label="$t('btns.create')"  />
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
          <q-btn size="sm" color="info" :label="$t('btns.edit')" :to="{name:'role.edit', params:{id:props.row.id}}"  /> 
          &nbsp;
          <q-btn size="sm" color="red" :label="$t('btns.delete')" @click="deleteThisRole(props.row)" />
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
  name: "Roles",
  components:{
    BreadCrumbs
  },
  computed:{
    ...mapGetters({
      roles:'allRoles',
    })
  },
  methods:{
    ...mapActions(['getRoles', 'deleteRole']),
    deleteThisRole(row){
      this.deleteRole(row).then((response) => {
        this.$notifyAlert(response);
      });
    }
  },
  created(){
    this.getRoles();
  },
  data() {
    return {
      title: this.$t('table.roles.title'),
      filter: "",
      dialogHeader: this.$t('headers.create'),
      columns: [
        {
          name: "#",
          required: true,
          label: this.$t("table.roles.headers.id"),
          align: "left",
          field: (row) => (this.roles.indexOf(row) +1 ),
          sortable: true,
        },
        {
          name: "name",
          required: true,
          label: this.$t("table.roles.headers.name"),
          align: "center",
          field: (row) => row.name,
          sortable: true,
        },
        {
          name: "actions",
          required: true,
          label: this.$t("table.roles.headers.actions"),
          align: "center"
        }
      ]
    };
  }
};
</script>