import axios from 'axios';

const state = {
    sellers: [],
    seller:{},
};

const getters = {
    allSellers: (state) => (state.sellers),
    seller:(state) => (state.seller)
}; 

const actions = {
    async getSellers( { commit } ){
        try {
            const response = await axios.get('seller');
            commit('fetchingSellers', response.data);
        } catch (error) {
            return error.response;
        }
    },
    async getSeller( { commit }, id ){
        try {
            const response = await axios.get(`seller${id}`);
            commit('fetchingSeller', response.data);
        } catch (error) {
            return error.response;
        }
    }
}; 

const mutations = {
    fetchingSellers:(state, data) => (state.sellers = data),
    fetchingSeller:(state, data) => (state.seller = data.seller)
};

export default {
    state,
    getters,
    actions,
    mutations
};