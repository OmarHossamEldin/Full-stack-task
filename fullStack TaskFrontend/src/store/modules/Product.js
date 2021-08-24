import axios from "axios";

const state = {
    products: []
};

const getters = {
    allProducts: (state) => (state.products)
};

const actions = {
    async getProducts({ commit }){
        try {
            const response = await axios.get('product');
            commit('fetchingProducts', response.data);
        } catch (error) {
            return error.response;
        }
    },
    async storeProduct( { commit } , data){
        try {
            const response = await axios.post('product', {
                category_id: data.category_id,
                name:{
                    ar: data.arName,
                    en: data.enName
                },
                description:{
                    ar: data.arDescription,
                    en: data.enDescription
                },
                status: 'approved'
            });
            commit('newProduct', response.data);
            return response;
        } catch(error) {
            return error.response;
        }
    },
    async updateProduct( { commmit }, data){
        try {
            const response = await axios.put(`product/${data.id}`, {
                category_id: data.category_id,
                name:{
                    ar: data.arName,
                    en: data.enName
                },
                description:{
                    ar: data.arDescription,
                    en: data.enDescription
                },

            });
            return response;
        } catch(error) {
            return error.response;
        }
    },
    async deleteThisProduct( { commit }, row){
        try{
            const response = await axios.delete(`product/${row.id}`);
            commit('deleteProduct', row);
            return response;
        } catch(error) {
            return error.response;
        }

    },
    async deleteThisProduct( { commit }, row){
        try{
            const response = await axios.delete(`product/${row.id}`);
            commit('deleteProduct', row);
            return response;
        } catch(error) {
            return error.response;
        }

    }
};

const mutations = {
    fetchingProducts:(state, data) => (state.products = data),
    newProduct:(state, data) => (state.products.push(data)),
    deleteProduct:(state, row) => (state.products = state.products.filter((product)=> product.id != row.id))
 }

export default {
    state,
    getters,
    actions,
    mutations
}