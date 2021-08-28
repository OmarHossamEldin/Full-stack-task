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
            commit('fetchUsers', response.data.data);
        } catch (error) {
            return error.response;
        }
    },
    async storeUser({ commit }, data) {
        try {
            const response = await axios.post('users', {
                name:data.name,
                email:data.email,
                password:data.password,
                password_confirmation:data.password_confirmation,
                is_admin:data.is_admin
            });
            commit('newUser', response.data.data);
            return response;
        } catch (error) {
            return error.response;
        }
    },
    async updateUser({ commit }, data) {
        try {
            const response = await axios.put(`users/${data.id}`, {
                name:data.name,
                email:data.email,
                password:data.password,
                password_confirmation:data.password_confirmation,
                is_admin:data.is_admin
            });
            commit('updateUser', response.data.data);
            return response;
        } catch (error) {
            return error.response;
        }
    },
    async makeAdmin({ commit }, data) {
        try {
            data.is_admin = !data.is_admin;
            const response = await axios.put(`users/${data.id}`, {
                name:data.name,
                email:data.email,
                is_admin:data.is_admin
            });
            commit('updateUser', response.data.data);
            return response;
        } catch (error) {
            return error.response;
        }
    },
    async deleteUser({ commit }, data) {
        try {
            const response = await axios.delete(`users/${data.id}`);
            commit('deleteUser', data.id);
            return response;
        } catch (error) {
            return error.response;
        }
    }
};

const mutations = {
    fetchUsers: (state, data) => (state.users = data.users),
    updateUser: (state, data, user) => (state.users.splice(state.users.indexOf(user) - 1, 1, data.user)),
    newUser: (state, data) => (state.users.push(data.user)),
    deleteUser:(state, id) =>(state.users = state.users.filter((user) => user.id !== id))
};

export default {
    state,
    getters,
    actions,
    mutations
}