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
            const response = await axios.post('/login', {
                email: credentials.email,
                password: credentials.password
            });
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', response.data.api_token);
            Vue.prototype.$axios.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
            commit('authenticateUser', response.data);
            return response;
        } catch (error) {
            return error.response;   
        }
    },
    async logoutAthenticatedUser(){
        try {
            const response = await axios.post('admin/auth/logout');
            Vue.prototype.$axios.defaults.headers.common.Authorization = null;
            // localStorage.removeItem('roles');
            // localStorage.removeItem('permissions');
            localStorage.removeItem('user');
            localStorage.removeItem('status');
            localStorage.removeItem('token');
            //commit('logout', '');
            return response;
        } catch (error) {
            return error.response;   
        }
    },
    async UpdatingProfile({ commit }, data) {
        try {
            const response = await axios.put('admin/auth', {
                firstName: data.firstName,
                lastName: data.lastName,
                dateOfBirth: data.dateOfBirth,
                phone: data.phone,
                address: data.address
            });
            commit('updatingProfile', response.data);
            return response;
        } catch (error) {
            return error.response;   
        }
    }
};

const mutations = {
    authenticateUser:(state, data) => (state.user = data.person, state.roles = data.roles, state.permissions = data.permissions, state.status = 'Authenticated'),
    logout:(state, data) => (state.user = data, state.roles = data, state.permissions = data, state.status = data),
    updatingProfile:(state, data) => (state.user = data.person)
}

export default {
    state,
    getters,
    actions,
    mutations
}