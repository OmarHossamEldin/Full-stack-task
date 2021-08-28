<template>
  <div class="q-pa-md">
  <!--========BreadCrumbs=========-->
  <BreadCrumbs :title='title' />

  <q-page class="q-pa-md">
    <!-- table -->
    <q-table
      :data="users"
      :columns="columns"
      :filter="filter"
      :rows-per-page-options="[20, 30, 50, 0]"
      row-key="id"
    >
      <template v-slot:top>
        <q-btn color="primary" :to="{name:'admin.create'}" :label="$t('btns.create')"  />
        <q-space />
        <q-input
          debounce="300"
          color="primary"
          v-model="filter"
          dense
          :placeholder="$t('tables.search')"
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
          <q-btn size="sm" color="info" :label="$t('btns.edit')"  />
          &nbsp;
          <q-btn size="sm" color="red" :label="$t('btns.delete')" @click="deleteThis(props.row)" />
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
  name: "Users",
  components:{
    BreadCrumbs
  },
  computed:{
    ...mapGetters({
      users:'allUsers',
    })
  },
  methods:{
    ...mapActions(['getUsers', 'deleteUser']),
    deleteThis(thisAdmin){
      this.deleteThisAdmin(thisAdmin);
    },
    changeStatus(admin){
      // this.activeDeactiveAdmin(admin);
    }
  },
  created(){
    this.getUsers();
    console.log(typeof(this.allUsers));
    
  },
  data() {
    return {
      title: this.$t('mainNavigation.user.subNavigation.index'),
      filter: "",
      prompt: false,
      dialogHeader: this.$t('headers.create'),
      columns: [
        {
          name: "#",
          required: true,
          label: this.$t("tables.headers.id"),
          align: "left",
          field: (row) => (this.users.indexOf(row) +1 ),
          sortable: true,
        },
        {
          name: "name",
          required: true,
          label: this.$t("tables.headers.user.name"),
          align: "center",
          field: (row) => row.name,
          sortable: true,
        },
        {
          name: "email",
          required: true,
          label: this.$t("tables.headers.user.email"),
          align: "center",
          field: (row) => row.email,
          sortable: true,
        },
        {
          name: "active",
          align: "center",
          label: this.$t("tables.headers.user.admin"),
          field: (row) => row.is_admin
        },
        {
          name: "actions",
          align: "center",
          label: this.$t("tables.headers.actions")
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