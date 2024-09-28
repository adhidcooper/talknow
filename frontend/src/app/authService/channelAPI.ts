import axios from "axios"

const CHANNEL_SERVICE_URL = 'http://127.0.0.1:5002'
const CHANNEL_DIR = 'api/channel'
export const createChannel = async (channelName: string, check: boolean, api_key: string) => {
   const response = await axios.post(`${CHANNEL_SERVICE_URL}/${CHANNEL_DIR}/create`, {"channelName": channelName, "channelOpen": check}, {
   headers: {
    "Authorization" : api_key
   }});
   return response.data;
}

export const fetchUserChannels = async (api_key: string) => {
   const response = await axios.get(`${CHANNEL_SERVICE_URL}/${CHANNEL_DIR}/user-channels`, {
      headers: {
         "Authorization" : api_key
       }
   })
   return response.data
}

export const fetchAllChannels = async (api_key: string) => {
   const response = await axios.get(`${CHANNEL_SERVICE_URL}/${CHANNEL_DIR}/all`, {
      headers: {
         "Authorization" : api_key
      }
   })
   return response.data;
}

export const findChannel = async (channelName: string) => {
   const response = await axios.get(`${CHANNEL_SERVICE_URL}/${CHANNEL_DIR}/get+${channelName}`)
   return response.data;
}

export const getCurrentChannel = async (channelId?: string) => {
   const response = await axios.get(`${CHANNEL_SERVICE_URL}/${CHANNEL_DIR}/${channelId}`)
   return response.data;
}

export const joinChannel = async (channelId?: string, api_key?: string | null) => {
   const response = await axios.post(`${CHANNEL_SERVICE_URL}/${CHANNEL_DIR}/join/${channelId}`, null, {
      headers: {
         Authorization: api_key
      }
   })
   return response.data;
}