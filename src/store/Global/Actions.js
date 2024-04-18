
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // Your API base URL
//   baseURL: 'http://localhost/costacaster-backend/api/', // Your API base URL
//   baseURL: 'https://costacaster-backend.instantsolutionslab.site/api/', // Your API base URL
  timeout: 20000,
  headers: {
    'Authorization': 'Bearer ' + getToken(), // Example: Add an authentication token
    // 'Custom-Header': 'value', // Example: Add custom headers
  }, 
});

export function getToken() {
  return localStorage.getItem('authToken');
}

export default {
    async getAll({ commit }, params) {
        try {
            let response = await instance.get(params.route, { params: params.data });
            // statements
            if(params.mutation){
                commit(params.mutation, response.data[params.variable]);
            }
            return response;
        } catch (e) {
            // statements
            return e.response
            // console.log(e);
        }
    },
    async get({ commit }, params) {
        try {
            let response = await instance.get(params.route, { params: params.data },{headers : params.headers});
            // statements
            if(params.mutation){
                commit(params.mutation, response.data[params.variable]);
            }
            return response;
        } catch (e) {
            // statements
            return e.response
            // console.log(e);
        }
    },
    async delete({ commit }, params) {
        try {
            let response = await instance.delete(params.route, { params: params.data });
            if(params.mutation){
                commit(params.mutation, response.data[params.variable]);
            }
            return response;
        } catch (e) {
            // statements
            return e.response
            // console.log(e);
        }
    },
    async store({ commit }, params) {
        let method = typeof params.method == 'undefined' || params.method.toLowerCase() == 'post' ? 'post' : 'put';
        console.log(method);
        try {
            let response = await instance[method](params.route, params.data);
            // statements
            console.log(response)
            if(params.mutation){
                commit(params.mutation, response.data[params.variable]);
            }
            return response;
        } catch (e) {
            console.log('e',e);
            // statements
            return e.response
            // console.log(e);
        }
    },
}
