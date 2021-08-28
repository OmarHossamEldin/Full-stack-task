import axios from "axios";
import optionsFilteration from "../../helpers/selectjsFilteration";

const state = {
    categories: [],
    categoryOptions: [],
    categoryTree: []
};

const getters = {
    allCategories: (state) => (state.categories),
    allCategoryOptions:(state) => (state.categoryOptions),
    allCategoryTree:(state) => (state.categoryTree)
};

const actions = {
    async getCategories({ commit }){
        try {
            const response = await axios.get('category/all/parent');
            commit('fetchingCategories', response.data);
            commit('fetchingOptions', optionsFilteration(response.data));
        } catch (error) {
            return error.response;
        }
    },
    async getCategoryTree({ commit }){
        try{
            const response = await axios.get('category');
            commit('fetchingTree', response.data);
        } catch (error) {
            return error.response;
        }
    },
    async storeCategory( { commit } , category){
        try {
            const response = await axios.post('category', {
                name:{
                    ar: category.arName,
                    en: category.enName
                },
                parent_id: category.parent_id
            });
            commit('newCategory', response.data);
            commit('newCategoryOption', optionsFilteration(response.data));
            return response;
        } catch(error) {
            return error.response;
        } 
    },
    async updateCategory( { commmit }, category){
        try {
            const response = await axios.put(`category/${category.id}`, {
                name:{
                    ar: category.arName,
                    en: category.enName
                },
                parent_id: category.parent_id
            });
            commit('updateCategory', response.data);
            commit('newCategoryOption', optionsFilteration(response.data));
            return response;
        } catch(error) {
            return error.response;
        }
    },
    async activeDeactiveCategory( { commit }, row){
        try{
            const response = await axios.post(`category/change-active/${row.id}`,{
                active: !row.active
            });
            commit('changingStatus', response.data);
            return response;
        } catch(error) {
            return error.response;
        }

    },
    async deleteThisCategory( { commit }, row){
        let category = row.id;
        try{
            const response = await axios.delete(`category/${category}`);
            commit('deleteCategory', row);
            return response;
        } catch(error) {
            return error.response;
        }

    }
};

const mutations = {
    fetchingCategories:(state, data) => (state.categories = data),
    fetchingOptions:(state, data) => (state.categoryOptions = data),
    fetchingTree:(state, data) => ( state.categoryTree = data),
    newCategory:(state, data) => (state.categories.push(data)),
    newCategoryOption:(state, data) => (state.categoryOptions.push(data)),
    changingStatus:(state, categoryStatus) => {
        const index = state.categories.findIndex(category => category.id === categoryStatus.id);
        if(index !== -1)
            state.categories.splice(index, 1, categoryStatus);
    },
    deleteCategory:(state, row) => (state.categories = state.categories.filter((category)=> category.id != row.id))
}

export default {
    state,
    getters,
    actions,
    mutations
}