import axios from 'axios';

const state = {
    subscribers: []
};

const getters = {
    allSubscribers: (state) => (state.subscribers)
};

const actions = {
    async getSubscribers( { commit } ){
        try {
            const response = await axios.get('subscriper');
            commit('fetchingSubscribers', response.data);
        } catch (error) {
            return error.response;
        }
    },
    async sendingOfferForSelectedSubscriber({ commit }, subscriber){
        try {
            console.log(subscriber)
            const response = await axios.get(`send-offer-to/${subscriber.id}`);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },
    async sendingOfferForAll({ commit }){
        try {
            const response = await axios.post('sendexestoffer');
            return response.data;
        } catch (error) {
            return error.response;
        }
    }
}; 

const mutations = {
    fetchingSubscribers:(state, data) => (state.subscribers = data)
};

export default {
    state,
    getters,
    actions,
    mutations
};