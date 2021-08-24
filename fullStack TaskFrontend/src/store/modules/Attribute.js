import axios from "axios";

const state = {
    attributes: []
};

const getters = {
    allAttributes: (state) => (state.attributes)
};

const actions = {
    async getAttributes({ commit }){
        try {
            const response = await axios.get('attribute');
            commit('fetchingAttributes', response.data);
        } catch (error) {
            return error.response;
        }
    },
    async storeAttribute( { commit } , attribute){
        try {
            const response = await axios.post('attribute', {
                name:{
                    ar: attribute.arName,
                    en: attribute.enName
                }
            });
            commit('newAttribute', response.data);
            return response;
        } catch(error) {
            return error.response;
        }
    },
    async updateAttribute( { commmit }, attribute){
        try {
            const response = await axios.put(`attribute/${attribute.id}`, {
                name:{
                    ar: attribute.arName,
                    en: attribute.enName
                }
            });
            return response;
        } catch(error) {
            return error.response;
        }
    },
    async deleteThisAttribute( { commit }, row){
        try{
            const response = await axios.delete(`attribute/${row.id}`);
            commit('deleteAttribute', row);
            return response;
        } catch(error) {
            return error.response;
        }

    },
    async assignToCategories( { commit }, data ){ 
        const response = await axios.put(`attribute/attribute-category/${data.thisAttribute}`, {
            category_id: data.categories
        });
        return response;
    }
};

const mutations = {
    fetchingAttributes:(state, data) => (state.attributes = data),
    newAttribute:(state, data) => (state.attributes.push(data)),
    deleteAttribute:(state, row) => (state.attributes = state.attributes.filter((attribute)=> attribute.id != row.id))
}

export default {
    state,
    getters,
    actions,
    mutations
}