import axios from 'axios';

const state = {
    users: []
};

const getters = {
    allUsers: (state) => (state.users)
};

const actions = {
    async getUsers({ commit }) {
        try {
            const response = await axios.get('users');
            commit('fetchUsers', response.data);
        } catch (error) {
            return error.response;
        }
    },
    async storeUser({ commit }, data) {
        try {
            const response = await axios.post('users', {
                data
            });
            commit('newUser', response.data);
            return response;
        } catch (error) {
            return error.response;
        }
    },
    async updateUser({ commit }, data) {
        try {
            const response = await axios.put('users', {
                data
            });
            commit('updateUser', response.data);
            return response;
        } catch (error) {
            return error.response;
        }
    },
    async deleteUser({ commit }, data) {
        try {
            const response = await axios.delete(`admin/${data}`);
            commit('deleteUser', response.data);
            return response;
        } catch (error) {
            return error.response;
        }
    }
};

const mutations = {
    fetchUsers: (state, data) => (state.users = data),
    newUser: (state, data) => (state.users.push(data)),
    deleteUsers:(state, data) =>(state.users = state.users.filter((user) => user.id !== data))
};

export default {
    state,
    getters,
    actions,
    mutations
}