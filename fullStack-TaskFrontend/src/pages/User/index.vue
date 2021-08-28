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
        <q-btn color="primary" @click="openPrompt" :label="$t('btns.create')"  />
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
            :color="props.row.is_admin ?  'green':'warning'" round icon="toggle_off"
            @click="changeStatus(props.row)" /> 
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" >
          <q-btn size="sm" color="info" :label="$t('btns.edit')" @click="deleteThis(props.row)" />
          &nbsp;
          <q-btn size="sm" color="red" :label="$t('btns.delete')" @click="deleteThis(props.row)" />
        </q-td>
      </template>
    </q-table>
      <!-- dialog create - edit -->
      <q-dialog v-model="prompt" position="top" >
        <q-card class="column dialogForm">
          <q-form @submit="save(user)">
            <q-card-section class="col-2 row">
              <div class="text-h4">{{dialogHeader}}</div>
              <q-space />
              <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>
            <q-card-section class="col-2" >
              <q-input dense filled outlined v-model="user.name" :placeholder="$t('tables.headers.user.name')" />
            </q-card-section>
            <q-card-section class="col-2">
              <q-input dense filled v-model="user.email" :placeholder="$t('tables.headers.user.email')" />
            </q-card-section>
            <q-card-section class="col-2">
              <q-input dense filled v-model="user.password" :placeholder="$t('tables.headers.user.password')" />
            </q-card-section>
            <q-card-section class="col-2">
              <q-input dense filled v-model="user.password_confirmation" :placeholder="$t('tables.headers.user.passwordConfirmation')" />
            </q-card-section>
            <q-card-section class="col-2">
              <q-toggle v-model="user.is_admin" color="green"  :label="$t('tables.headers.user.admin')"/>
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
     ...mapActions(['getUsers', 'storeUser', 'updateUser', 'activeDeactiveUser', 'deleteUser']),
    save(user){
      if(user.id) {
        // this.updateUser(user).then((response) => {
        //   this.$notifyAlert(response);
        // });
      }
      else {
        this.storeUser(user).then((response) => {
          this.$notifyAlert(response);
        });
      }  
      this.user = this.defaultUser;
    },
    deleteThis(thisUser){
      this.deleteUser(thisUser);
    },
    changeStatus(user){
      this.activeDeactiveUser(user);
    },
    openPrompt(row){
      if(row.id) {
        this.dialogHeader = this.$t('btns.edit');
        this.user = {
          id: row.id,
          name: row.name,
          email: row.email,
          password: '',
          password_confirmation: '',
          is_admin: row.is_admin
        };
      }
      else{
        this.dialogHeader = this.$t('btns.create');
        this.user = this.defaultUser;
      }
      this.prompt = !this.prompt;
    }
  },
  created(){
    this.getUsers();
    
  },
  data() {
    return {
      title: this.$t('mainNavigation.user.subNavigation.index'),
      filter: "",
       user:{
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        is_admin: ''
      },
      defaultUser:{
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        is_admin: false
      },
      prompt: false,
      dialogHeader: this.$t('btns.create'),
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
  width: 500px
</style>