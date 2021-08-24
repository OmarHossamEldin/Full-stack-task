import axios from 'axios';

const state = {
    admins: []
};

const getters = {
    allAdmins: (state) => (state.admins)
};

const actions = {
    async getAdmins({ commit }) {
        try {
            const response = await axios.get('admin');
            commit('fetchAdmins', response.data);
        } catch (error) {
            return error.response;
        }
    },
    async storeAdmin({ commit }, data) {
        try {
            const response = await axios.post('admin', {
                data
            });
            commit('newAdmin', response.data);
            return response;
        } catch (error) {
            return error.response;
        }
    },
    async updateAdmin({ commit }, data) {
        try {
            const response = await axios.put('admin', {
                data
            });
            commit('updateAdmin', response.data);
            return response;
        } catch (error) {
            return error.response;
        }
    },
    async deleteAdmin({ commit }, data) {
        try {
            const response = await axios.delete(`admin/${data}`);
            commit('deleteAdmin', response.data);
            return response;
        } catch (error) {
            return error.response;
        }
    }
};

const mutations = {
    fetchAdmins: (state, data) => (state.admins = data),
    newAdmin: (state, data) => (state.admins.push(data)),
    deleteAdmin:(state, data) =>(state.admins = state.admins.filter((admin)=>admin.id !== data))
};

export default {
    state,
    getters,
    actions,
    mutations
}