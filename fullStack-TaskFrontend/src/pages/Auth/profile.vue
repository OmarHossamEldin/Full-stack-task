<template>
  <div class="q-pa-md">
      <!--========BreadCrumbs=========-->
      <BreadCrumbs :title='title' />
      <q-page class="q-pa-md" >
         <q-card class="">
           <q-card-section>
             <q-form @submit="updateProfile(firstName, lastName, dateOfBirth, phone , address)">  
            <div class="row" >
              <div class="col">
              <q-input filled v-model="firstName" dense :label="$t('profile.firstName')" />
              </div>
              <div class="col">
                <q-input filled v-model="lastName" dense :label="$t('profile.lastName')" />
              </div>
            </div>
            <div class="row">
              <div class="col">
              <q-input v-model="dateOfBirth" filled dense type="date"  >
                <q-tooltip  content-class="bg-blue-grey-9" >
                  {{$t('profile.dateOfBirth')}}
                </q-tooltip>
              </q-input>
              </div>
              <div class="col">
                <q-input v-model="phone" filled dense  :label="$t('profile.phone')" mask="###########"/>
              </div>
            </div>
            <div class="row">
              <!-- <div class="col">
                <v-select :placeholder="$t('profile.country')" />
              </div>
              <div class="col">
                <v-select :placeholder="$t('profile.state')" />
              </div>
              <div class="col">
                <v-select :placeholder="$t('profile.city')" v-model="city" />
              </div> -->
            </div>
            <div class="row">
              <div class="col-6">
                <q-input v-model="address" filled dense  type="text" :label="$t('profile.address')"/>
              </div>
            </div>
            <div class="row">
              <div class="col">
              <q-btn label="Submit" type="submit" color="primary"/>
              </div>
            </div>
            </q-form>
           </q-card-section>
         </q-card>
      </q-page>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BreadCrumbs from 'components/BreadCrumbs';
export default {
  name: "Profile",
  components:{
    BreadCrumbs
  },
  computed:{
      ...mapGetters({user:'getAuthenticatedUser'})
  },
  data() {
    return {
      title: this.$t('profile.title'),
      firstName:'',
      lastName:'',
      dateOfBirth:'',
      password: '',
      city:'',
      address: '',
      isPwd: true,
      step: 1,
      text:'',
      date:'',
      phone: null,
    };
  },
  methods:{
    ...mapActions(['UpdatingProfile']),
    getProfileInfo(){
      this.firstName = this.user.firstName;
      this.lastName = this.user.lastName;
      this.dateOfBirth = this.user.dateOfBirth;
      this.phone = this.user.phone;
      this.city = this.user.city
      this.address = this.user.address;
    },
    updateProfile(firstName, lastName, dateOfBirth, phone , address){
      this.UpdatingProfile({firstName, lastName, dateOfBirth, phone, address}).then((response)=>{
        this.$notifyAlert(response);
      });
    }
  },
  created(){
    this.getProfileInfo();
  }
};
</script>
<style lang="sass" scoped >
.row
  margin: 3px 0
// col
.col
  padding:0 5px


</style>