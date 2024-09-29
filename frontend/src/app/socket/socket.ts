import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

let stompClient = null;

function connect() {
    const socket = new SockJS('http://localhost:8080/ws-message');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, (frame) => {
        console.log('Connected: ' + frame);

        // Subscribe to the /topic/messages endpoint to receive updates
        stompClient.subscribe('/topic/messages', (messageOutput) => {
            showMessageOutput(JSON.parse(messageOutput.body));
        });
    });
}

function showMessageOutput(message) {
    console.log("New message: ", message);
    // Update your frontend UI with the new message
}

connect();
