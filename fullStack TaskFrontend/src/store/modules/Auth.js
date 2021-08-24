import Vue from 'vue';
import axios from 'axios';

const state = {
    user: JSON.parse(localStorage.getItem('user')) || '',
    //roles: JSON.parse(localStorage.getItem('roles')) || '',
    //permissions: JSON.parse(localStorage.getItem('permissions')) || '',
    status: localStorage.getItem('status') || ''
};

const getters = {
    getAuthenticatedUser:(state) => (state.user),
    getRole:(state) => (state.roles),
    getPermissions:(state) => (state.permissions)
};

const actions = {
    async authenticateUser( { commit }, credentials){
        try {
            const response = await axios.post('admin/auth/login', {
                email: credentials.email,
                password: credentials.password
            });
            //localStorage.setItem('roles', JSON.stringify(response.data.roles));
            //localStorage.setItem('permissions', JSON.stringify(response.data.permissions));
            localStorage.setItem('user', JSON.stringify(response.data.person));
            localStorage.setItem('status', 'Authenticated');
            localStorage.setItem('token', response.data.token);
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