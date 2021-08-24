import axios from 'axios';

const state = {
    roles: [],
    role:{}
};

const getters = {
    allRoles:(state) => (state.roles),
    role:(state) => (state.role)
};

const actions = {
    async getRoles( { commit } ){
        try{
            const response = await axios.get('role');
            commit('fetchRoles', response.data);
        } catch (error) {
            return error.response;
        }
    },
    async storeRole( { commit }, data){
        try {
            const response = await axios.post('role', {
                name:data.name,
                permissions:data.selectedPermissions
            });
            commit('newRole', response.data);
            return response;
        } catch (error) {
            return error.response;
        }
    },
    async showRole( { commit }, data){
        try {
            const response = await axios.get(`role/${data}`);
            commit('showRolePremission', response.data);
            return response;
        } catch (error) {
            return error.response;
        }
    },
    async updateRole( { commit }, data){
        try {
            const response = await axios.put(`role/${data.role.id}`, {
                name:data.role.name,
                permissions:data.selectedPermissions
            });
            commit('updateRole', response.data);
            return response;
        } catch (error) {
            return error.response;
        }
    },
    async deleteRole( { commit }, data){
        try {
            const response = await axios.delete(`role/${data.id}`);
            commit('deleteRole', data.id);
            return response;
        } catch (error) {
            return error.response;
        }
    }
};

const mutations = {
    fetchRoles:(state, data) => (state.roles = data),
    newRole:(state, data) => (state.roles.push(data)),
    showRolePremission:(state, data) => (state.role = data),
    updateRole:(state, data) => (state.role = data),
    deleteRole:(state, data) => (state.roles = state.roles.filter((role) => role.id !== data))
};

export default {
    state,
    getters,
    actions,
    mutations
}