// src/features/auth/authAPI.ts
import axios from 'axios';


const AUTH_SERVICE_URL = 'http://127.0.0.1:5001';
const AUTH_DIR = 'api/user'

export const login = async (username: string, password: string) => {
    const response = await axios.post(`${AUTH_SERVICE_URL}/${AUTH_DIR}/login`, { "username": username, "password": password });
    console.log(response.data)
    return response.data;
    
};

export const signup = async (username: string, email: string, password: string,) => {
    const response = await axios.post(`${AUTH_SERVICE_URL}/${AUTH_DIR}/create`, { "username": username, "email":email, "password": password }, { headers : {
        "Content-Type": "application/json"
    }});
    console.log(response.data)
    return response.data;
};

export const fetchUserInfo = async (apiKey: string) => {
    const response = await axios.get(`${AUTH_SERVICE_URL}/${AUTH_DIR}/`, { headers: {
        "Content-Type": "application/json",
        "Authorization": apiKey
    } });
    return response.data;
};
