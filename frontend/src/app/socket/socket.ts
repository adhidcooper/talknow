import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

export function connectSocket(handleNewMessage) {
    let stompClient = null;
    const socket = new SockJS('http://localhost:5002/ws-message');
    stompClient = Stomp.client(socket);

    stompClient.connect({}, (frame) => {
        console.log('Connected: ' + frame);
        
        // Subscribe to the topic
        stompClient.subscribe('/topic/messages', (messageOutput) => {
            try {
                const message = JSON.parse(messageOutput.body);
                handleNewMessage(message);
            } catch (error) {
                console.error('Error parsing message:', error);
            }
        });
    }, (error) => {
        console.error('WebSocket connection error:', error);
    });

    return {
        disconnect: () => {
            if (stompClient) {
                stompClient.disconnect(() => {
                    console.log('Disconnected');
                });
            }
        }
    };
}