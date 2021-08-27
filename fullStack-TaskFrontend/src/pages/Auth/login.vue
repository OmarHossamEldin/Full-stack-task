<template>
    <div class="row window-height">
        <div class="col-xs-12 col-sm-12 col-md-6 column justify-center">
            <div class="row ">
                <div class="col-12">
                    <div class="row justify-center">
                        <q-img class="items-center logo" src="~assets/img/logo.png"  >
                        <template v-slot:loading>
                            <q-spinner-gears color="white" />
                        </template>
                        </q-img>
                    </div>
                </div>
                <div class="col-2"></div>
                <div class="col-8 ">
                    <q-form @submit="login(email, password)">
                        <q-input
                        dense
                        rounded
                        outlined
                        v-model="email"
                        :label="$t('login.email')"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || $t('login.errorEmail')]"
                        /><br>
                        <q-input dense rounded outlined :type="isPwd ? 'password' : 'text'" v-model="password" :label="$t('login.password')"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || $t('login.errorPassword')]">
                        <template v-slot:append>
                            <q-icon
                                :name="isPwd ? 'visibility_off' : 'visibility'"
                                class="cursor-pointer"
                                @click="isPwd = !isPwd"
                            />
                            </template>
                        </q-input> <br>
                        <q-btn :label="$t('login.loginBtn')" type="submit"  rounded class="full-width" size="sm" color="primary"/>
                    </q-form>
                </div>
            </div>
            
        </div> 
        <div class="col-xs-none col-sm-none col-md-6">
           <q-img class="full-height" src="~assets/img/login_landing.jpg">
                <div class="absolute-full text-subtitle2 flex flex-center">
                    <h4>{{ $t('login.caption') }}</h4>
                </div>
                <template v-slot:loading>
                    <q-spinner-gears color="white" />
                </template>
            </q-img>  
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: "login",
    data(){
        return {
            email: 'admin@admin.com',
            password: '12345678',
            isPwd: true
        }
    },
    methods:{
        ...mapActions(['authenticateUser']),
        login(email, password){
            this.authenticateUser({ email, password }).then((response) => {
                this.$notifyAlert(response);
                if(response.status === 201) 
                    this.$router.push({name:'dashboard'});
            });
        },
        autoLogin(){
            if(!!localStorage.getItem('token'))
                this.$router.push({name:'dashboard'});
        },
        setLocal(){
            localStorage.setItem('Content-language', 'en');
        }
    },
    created(){
        this.setLocal();
        this.autoLogin();
    }
}
</script>
<style lang="sass" scoped>

.column
    background-color:#cacfe9

.logo
    width: 200px
    margin-bottom:20px

</style>