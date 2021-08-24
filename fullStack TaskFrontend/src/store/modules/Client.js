import axios from 'axios';

const state = {
    clients: []
};

const getters = {
    AllClients: (state) => (state.clients)
};

const actions = {
    async getClients( { commit } ){
        try {
            const response = await axios.get('client');
            commit('fetchingClients', response.data);
        } catch (error) {
            return error.response;
        }
    }
}; 

const mutations = {
    fetchingClients:(state, data) => (state.clients = data)
};

export default {
    state,
    getters,
    actions,
    mutations
};