import axios from 'axios';

const state = {
    feedBacks: []
};

const getters = {
    allFeedBacks: (state) => (state.feedBacks)
};

const actions = {
    async getFeedBacks({ commit }) {
        try {
            const response = await axios.get('users');
            commit('fetchFeedBacks', response.data.data);
        } catch (error) {
            return error.response;
        }
    },
    async storeFeedBack({ commit }, data) {
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
    async updateFeedBack({ commit }, data) {
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
    async deleteFeedBack({ commit }, data) {
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
    fetchFeedBacks: (state, data) => (state.users = data.users),
    updateFeedBack: (state, data, user) => (state.users.splice(state.users.indexOf(user) - 1, 1, data.user)),
    newFeedBack: (state, data) => (state.users.push(data.user)),
    deleteFeedBack:(state, id) =>(state.users = state.users.filter((user) => user.id !== id))
};

export default {
    state,
    getters,
    actions,
    mutations
}