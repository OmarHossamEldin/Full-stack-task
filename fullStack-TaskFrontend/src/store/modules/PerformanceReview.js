import axios from 'axios';

const state = {
    reviews: []
};

const getters = {
    allReviews: (state) => (state.reviews)
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
    async writeReview({ commit }, data) {
        try {
            const response = await axios.put(`performance-reviews/${data.id}`, {
                review:data.skills
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
    fetchReviews: (state, data) => (state.reviews = data.reviews),
    updateReview: (state, data) => (state.reviews = state.reviews.map((review) => review = review.id === data.review.id ? data.review : review) ),
    newReview: (state, data) => (state.reviews.push(data.review)),
    deleteReview:(state, id) =>(state.reviews = state.reviews.filter((review) => review.id !== id))
};

export default {
    state,
    getters,
    actions,
    mutations
}