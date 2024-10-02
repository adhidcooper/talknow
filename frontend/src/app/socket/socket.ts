import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

let stompClient = null;

export function connectSocket(handleNewMessage) {
    const socket = new SockJS('http://localhost:5002/ws-message'); // Use http or ws depending on your server
    stompClient = Stomp.over(socket);

    stompClient.connect({}, (frame) => {
        console.log('Connected: ' + frame);

        // Subscribe to the /topic/messages endpoint to receive updates
        stompClient.subscribe('/topic/messages', (messageOutput) => {
            handleNewMessage(JSON.parse(messageOutput.body)); // Call the handler passed from Chat component
        });
    });

    return {
        disconnect: () => {
            if (stompClient) {
                stompClient.disconnect();
            }
        }
    };
}
