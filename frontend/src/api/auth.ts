
import axios from 'axios'

const API_URL = 'http://127.0.0.1:5001'
const USER_SERVICE = 'api/user'

export const login = async (username: string, password: string) => {
    const response = await axios.post(`${API_URL}/${USER_SERVICE}/login`, new URLSearchParams({username, password}));
    return response.data;
}

export const signup = async (username: string, password: string, email: string) => {
    const response = await axios.post(`${API_URL}/${USER_SERVICE}/create`, new URLSearchParams({username, password, email}));
    return response.data;
}

export const logout = async (apiKey: string) => {
    const reponse = await axios.post(`${API_URL}/${USER_SERVICE}/logout`, null, { headers: {
        Authorization: apiKey
    }})
    console.log(reponse.data)
    return reponse.data;
}

export const fetchUserInfo = async (apiKey: string) => {
    const response = await axios.get(`${API_URL}/${USER_SERVICE}/`, {headers: {
        Authorization: apiKey
    }})
    return response.data;
}