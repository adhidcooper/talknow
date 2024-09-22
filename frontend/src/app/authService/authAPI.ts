// src/features/auth/authAPI.ts
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5001/api/user';

export const login = async (username: string, password: string) => {
    const response = await axios.post(`${API_URL}/login`, new URLSearchParams({ username, password }), { headers: { "Content-Type": "application/json"}});
    return response.data;
};

export const signup = async (username: string, password: string, email: string) => {
    const response = await axios.post(`${API_URL}/create`, new URLSearchParams({ username, password, email }));
    return response.data;
};

export const fetchUserInfo = async (apiKey: string) => {
    const response = await axios.get(`${API_URL}/`, { headers: { Authorization: apiKey } });
    return response.data;
};
