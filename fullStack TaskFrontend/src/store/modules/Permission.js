import axios from 'axios';

const state = {
    permissions: []
};

const getters = {
    allPermissions:(state) => (state.permissions)
};

const actions = {
    async getPermissions( { commit } ){
        try{
            const response = await axios.get('permission');
            commit('fetchPermissions', response.data);
        } catch (error) {
            return error.response;
        }
    }
};

const mutations = {
    fetchPermissions:(state, data) => (state.permissions = data)
};

export default {
    state,
    getters,
    actions,
    mutations
}