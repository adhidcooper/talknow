import axios from "axios"

const MESSAGE_SERVICE_URL = 'http://127.0.0.1:5002'
const MESSAGE_DIR = 'api/channel'
export const createChannel = async (channelName: string, check: boolean, api_key: string) => {
   const response = await axios.post(`${MESSAGE_SERVICE_URL}/${MESSAGE_DIR}/create`, {"channelName": channelName, "channelOpen": check}, {
   headers: {
    "Authorization" : api_key
   }});
   return response.data;
}

export const fetchAllChannels = async (api_key: string) => {
   const response = await axios.get(`${MESSAGE_SERVICE_URL}/${MESSAGE_DIR}/all`, {
      headers: {
         "Authorization" : api_key
      }
   })
   return response.data;
}