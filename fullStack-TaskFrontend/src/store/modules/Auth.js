import Vue from 'vue';
import axios from 'axios';

const state = {
    user: JSON.parse(localStorage.getItem('user')) || '',
    is_admin:  0
};

const getters = {
    getAuthenticatedUser:(state) => (state.user),
    getRole:(state) => (state.is_admin)
};

const actions = {
    async authenticateUser( { commit }, credentials){
        try {
            const response = await axios.post('login', {
                email: credentials.email,
                password: credentials.password
            });
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
            localStorage.setItem('token', response.data.data.user.api_token);
            Vue.prototype.$axios.defaults.headers.common.Authorization = 'Bearer '+response.data.data.user.api_token;
            commit('authenticateUser', response.data.data);
            return response;
        } catch (error) {
            return error.response;   
        }
    },
    async logoutAthenticatedUser(){
        try {
            const response = await axios.post('logout');
            Vue.prototype.$axios.defaults.headers.common.Authorization = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            commit('logout', null);
            return response;
        } catch (error) {
            return error.response;   
        }
    }
};

const mutations = {
    authenticateUser:(state, data) => (state.user = data.user, state.is_admin = data.user.is_admin ),
    logout:(state, data) => (state.user = data, state.is_admin = 0)
}

export default {
    state,
    getters,
    actions,
    mutations
}