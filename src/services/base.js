// api.js

import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://192.168.18.129:8000/api/', // Your API base URL
  // baseURL: 'http://localhost/costacaster-backend/api/', // Your API base URL
  baseURL: 'https://costacaster-backend.instantsolutionslab.site/api/', // Your API base URL
  timeout: 80000,
  headers: {
    'Authorization': 'Bearer ' + getToken(), // Example: Add an authentication token
    // 'Custom-Header': 'value', // Example: Add custom headers
  }, 
});

export function getToken() {
  if (checkIsAdmin()) {
    return localStorage.getItem('admin-token');
  }else{
    return localStorage.getItem('authToken');
  }
}

export function checkIsAdmin(){
    var url = window.location.href;
    var adminRegex = /\/admin\//;

    // Test if the URL matches the regular expression
    return adminRegex.test(url);
}

export async function fetchData(endpoint, params) {
  try {
    const response = await instance.get(endpoint, { params });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function postData(endpoint, data) {
  try {
    const response = await instance.post(endpoint, data);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function buildFormData(formData, data, parentKey) {
  if (data && typeof data === 'object' && !(data instanceof Date)) {
    if (data instanceof File) {
      formData.append(parentKey, data);
    } else {
      Object.keys(data).forEach(key => {
        buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
      });
    }
  } else {
    const value = data == null ? '' : data;
    formData.append(parentKey, value);
  }
}

