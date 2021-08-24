<template>
    <div class="q-pa-md">
        <!--========BreadCrumbs=========-->
        <BreadCrumbs :title='title' />
        <q-form @submit="save(name, selectedPermissions)">
            <q-card >
                <div class="row">
                    <q-card-section class=" col-6">
                    <q-input dense filled v-model="name" :label="$t('table.roles.headers.name')" />
                    </q-card-section>
                    <q-card-section class="col-6">
                     <v-select  multiple :options="permissions" v-model='selectedPermissions' :reduce="selectedPermissions => selectedPermissions.id" label="name" :placeholder="$t('table.roles.headers.permissions')"></v-select>
                    </q-card-section>                   
                 <q-btn flat  color="primary" type="submit" :label="$t('btns.create')" class="q-ml-sm" />
                </div>              
              </q-card>
        </q-form>    
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BreadCrumbs from 'components/BreadCrumbs';
export default {
  name: "Roles.create",
  components:{
      BreadCrumbs
  },
  computed:{
    ...mapGetters({
      permissions: 'allPermissions'
    })
  },
  data() {
    return {
      title: this.$t('table.roles.title'),
      name:'',
      selectedPermissions:[],
      filter: '',
      defaultName:'',
      defaultSelectedPermissions:[]
    };
  },
  methods:{
    ...mapActions(['storeRole', 'getPermissions']),
    resetFilter () {
      this.filter = ''
      this.$refs.filter.focus()
    },
    save(name, selectedPermissions){
        let role = {name, selectedPermissions};
        this.storeRole(role).then((response) => {
          this.$notifyAlert(response);
         });
        this.name = defaultName;
        this.selectedPermissions = defaultSelectedPermissions;    
    }
  },
  created(){
    this.getPermissions();
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

