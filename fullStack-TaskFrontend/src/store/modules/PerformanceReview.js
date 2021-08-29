import axios from 'axios';

const state = {
    users: []
};

const getters = {
    allReviews: (state) => (state.users)
};

const actions = {
    async getReviews({ commit }) {
        try {
            const response = await axios.get('performance-reviews');
            commit('fetchReviews', response.data.data);
        } catch (error) {
            return error.response;
        }
    },
    async storeReview({ commit }, data) {
        try {
            const response = await axios.post('performance-reviews', {
                reviewer_id:data.reviewer_id,
                reviewee_id:data.reviewee_id
            });
            commit('newReview', response.data.data);
            return response;
        } catch (error) {
            return error.response;
        }
    },
    async updateReview({ commit }, data) {
        try {
            const response = await axios.put(`performance-reviews/${data.id}`, {
                name:data.name,
                email:data.email,
                password:data.password,
                password_confirmation:data.password_confirmation,
                is_admin:data.is_admin
            });
            commit('updateReview', response.data.data);
            return response;
        } catch (error) {
            return error.response;
        }
    },
    async writeReview({ commit }, data) {
        try {
            data.is_admin = !data.is_admin;
            const response = await axios.put(`performance-reviews/${data.id}`, {
                name:data.name,
                email:data.email,
                is_admin:data.is_admin
            });
            commit('updateReview', response.data.data);
            return response;
        } catch (error) {
            return error.response;
        }
    },
    async deleteReview({ commit }, data) {
        try {
            const response = await axios.delete(`performance-reviews/${data.id}`);
            commit('deleteReview', data.id);
            return response;
        } catch (error) {
            return error.response;
        }
    }
};

const mutations = {
    fetchReviews: (state, data) => (state.users = data.reviews),
    updateReview: (state, data, user) => (state.users.splice(state.users.indexOf(user) - 1, 1, data.user)),
    newReview: (state, data) => (state.users.push(data.user)),
    deleteReview:(state, id) =>(state.users = state.users.filter((user) => user.id !== id))
};

export default {
    state,
    getters,
    actions,
    mutations
}