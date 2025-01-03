// src/features/auth/authAPI.ts
import axios from 'axios';
import { UserData } from '../../components/Navbar';

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

export const forgotPassword = async (email: string) => {
   const response = await axios.post(`${AUTH_SERVICE_URL}/${AUTH_DIR}/forgot-password`, { "email" : email})
   return response
}

export const resetPassword = async (email: string, newPassword: string) => {
    const response = await axios.post(`${AUTH_SERVICE_URL}/${AUTH_DIR}/reset-password`, { "email": email, "new_password": newPassword})
    return response
}

export const editProfile = async (data: UserData, username: string) => {
    const response = await axios.post(`${AUTH_SERVICE_URL}/${AUTH_DIR}/edit-profile/${username}`, { "firstName": data.firstName, "lastName": data.lastName, "phoneNo": data.phoneNo, "imgUrl": data.imgUrl})
    console.log(response)
    return response
}