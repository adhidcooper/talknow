import axios from "axios";

const CHANNEL_SERVICE_URL = 'http://127.0.0.1:5002';
const CHANNEL_DIR = 'api/channel';

export const createChannel = async (channelName: string, check: boolean, api_key: string) => {
    try {
        const response = await axios.post(`${CHANNEL_SERVICE_URL}/${CHANNEL_DIR}/create`, 
        { 
            "channelName": channelName, 
            "channelOpen": check 
        }, {
            headers: {
                "Authorization": api_key
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to create channel:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const fetchUserChannels = async (api_key: string) => {
    try {
        const response = await axios.get(`${CHANNEL_SERVICE_URL}/${CHANNEL_DIR}/user-channels`, {
            headers: {
                "Authorization": api_key
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch user channels:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const fetchAllChannels = async (api_key: string) => {
    try {
        const response = await axios.get(`${CHANNEL_SERVICE_URL}/${CHANNEL_DIR}/all`, {
            headers: {
                "Authorization": api_key
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch all channels:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const findChannel = async (channelName: string) => {
    try {
        const response = await axios.get(`${CHANNEL_SERVICE_URL}/${CHANNEL_DIR}/get+${channelName}`);
        return response.data;
    } catch (error) {
        console.error('Failed to find channel:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getCurrentChannel = async (channelId?: string) => {
    try {
        const response = await axios.get(`${CHANNEL_SERVICE_URL}/${CHANNEL_DIR}/${channelId}`);
        return response.data;
    } catch (error) {
        console.error('Failed to get current channel:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const joinChannel = async (channelId?: string, api_key?: string | null) => {
    try {
        const response = await axios.post(`${CHANNEL_SERVICE_URL}/${CHANNEL_DIR}/join/${channelId}`, null, {
            headers: {
                Authorization: api_key
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to join channel:', error.response ? error.response.data : error.message);
        throw error;
    }
};
