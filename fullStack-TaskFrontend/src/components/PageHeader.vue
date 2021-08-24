<template>
  <!-- (Optional) The Header -->
    <q-header elevated  class="bg-blue-grey-9 text-white" >
        <q-toolbar>
          <q-btn flat @click="$emit('clickMenu')" round dense icon="menu" aria-label="Menu"/>
          <q-toolbar-title>{{ $t('dashboard.title') }} </q-toolbar-title>
          <q-btn-dropdown  unelevated color="blue-grey-8" label="Account Settings">
              <q-list>
                <q-item  >
                  <q-item-section>
                    <q-item-label class="self-center text-center">
                      <q-avatar>
                      <img src="https://cdn.quasar.dev/img/boy-avatar.png"></q-avatar><br>
                      <small>{{user.firstName}}</small> 
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item :to="{name:'profile'}" >
                  <q-item-section>
                    <q-item-label>Profile</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item @click="logout" clickable>
                  <q-item-section>
                    <q-item-label>Logout</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
          </q-btn-dropdown>
        </q-toolbar>
    </q-header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name:"PageHeader",
    computed:{
      ...mapGetters({user:'getAuthenticatedUser'})
    },
    methods:{
      ...mapActions(['logoutAthenticatedUser']),
      logout(){
        this.logoutAthenticatedUser().then((response) =>{
            if(response.status === 200)
                this.$router.push({name:'login'});
        });
      }
    }
}
</script>

