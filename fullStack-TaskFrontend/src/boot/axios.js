import Vue from 'vue';
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';

Vue.prototype.$axios = axios;

let token = localStorage.getItem('token') || null;
if (token) {
  Vue.prototype.$axios.defaults.headers.common.Authorization = 'Bearer' + token;
}

let language = localStorage.getItem('Content-language') || 'en';
if (language) {
  Vue.prototype.$axios.defaults.headers['Content-Language'] = language;
}