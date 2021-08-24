<template>
    <div class="q-pa-md">
        <!--========BreadCrumbs=========-->
        <BreadCrumbs :title='title' />
        <q-form @submit="updatingRole(role, selectedPermissions)">
            <q-card >
                <div class="row">
                    <q-card-section class="col-12">
                        <h4>{{role.name}}</h4>
                        <label v-for="permission in role.permission" :key="permission">
                            <q-chip  color="primary" text-color="white" icon="private_connectivity">
                                {{permission.name}} 
                            </q-chip>&nbsp;&nbsp;&nbsp;
                        </label>
                        <q-separator />
                    </q-card-section>
                    <q-card-section class="col-6">
                    <q-input dense filled v-model="role.name" :label="$t('table.roles.headers.name')" />
                    </q-card-section>
                    <q-card-section class="col-6">
                     <v-select  multiple :options="permissions" v-model='selectedPermissions' :reduce="selectedPermissions => selectedPermissions.id" label="name" :placeholder="$t('table.roles.headers.permissions')"></v-select>
                    </q-card-section>                   
                 <q-btn flat  color="primary" type="submit" :label="$t('btns.edit')" class="q-ml-sm" />
                </div>              
              </q-card>
        </q-form>    
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BreadCrumbs from 'components/BreadCrumbs';
export default {
  name: "Roles.edit",
  components:{
      BreadCrumbs
  },
  computed:{
    ...mapGetters({
      permissions: 'allPermissions',
      role:'role'
    })
  },
  data() {
    return {
      title: this.$t('table.roles.title'),
      name:'',
      selectedPermissions:[],
      filter: ''
    };
  },
  methods:{
    ...mapActions(['updateRole', 'getPermissions', 'showRole']),
    resetFilter () {
      this.filter = ''
      this.$refs.filter.focus()
    },
    updatingRole(role, selectedPermissions){
        this.updateRole({role, selectedPermissions}).then((response) => {
          this.$notifyAlert(response);
        });   
    }
  },
  created(){
    this.getPermissions();
    this.showRole(this.$route.params.id);
  }
};
</script>

<style lang="sass" scoped>
.row
  margin: 3px 0

// col
.col
  padding:0 5px
</style>

