import axios from 'axios';

const MESSAGE_SERVICE_URL = 'http://127.0.0.1:5002';
const MESSAGE_DIR = 'api/message';

export const createMessage = async (channelId?: string, message?: string, api_key?: string) => {
    const response = await axios.post(`${MESSAGE_SERVICE_URL}/${MESSAGE_DIR}/create`, { "channelId": channelId, "message": message }, {
        headers: {
            Authorization: api_key
        }
    });
    return response.data;
}

export const fetchMessagesByChannelId = async (channelId: string, api_key: string) => {
    const response = await axios.get(`${MESSAGE_SERVICE_URL}/${MESSAGE_DIR}/channel/${channelId}`, {
      headers: {
        Authorization: api_key,
      },
    });
    return response.data;
};
  