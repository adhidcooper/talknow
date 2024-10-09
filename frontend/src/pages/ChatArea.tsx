// src/components/ChatArea.tsx
import React, { useState, useEffect } from 'react';
import { fetchMessagesByChannelId, createMessage } from '../app/authService/messageAPI';

const ChatArea: React.FC<{ channelId: string }> = ({ channelId }) => {
    const [messages, setMessages] = useState<{ id: string; text: string }[]>([]);
    const [messageText, setMessageText] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadMessages = async () => {
            try {
                const messagesData = await fetchMessagesByChannelId(channelId);
                setMessages(messagesData);
            } catch (err) {
                setError('Failed to load messages.'); // Handle error
                console.error(err);
            }
        };
        loadMessages();
    }, [channelId]);

    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (messageText.trim()) {
            try {
                await createMessage(channelId, messageText);
                setMessageText('');
                // Fetch messages again after sending a message
                const messagesData = await fetchMessagesByChannelId(channelId);
                setMessages(messagesData);
            } catch (err) {
                setError('Failed to send message.'); // Handle error
                console.error(err);
            }
        }
    };

    return (
        <div className="flex flex-col">
            <div className="flex-grow overflow-auto p-4">
                {error && <p className="text-red-500">{error}</p>}
                {messages.map(msg => (
                    <div key={msg.id} className="my-2 p-2 bg-gray-200 rounded">
                        {msg.text}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage} className="flex">
                <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="flex-grow p-2 border rounded-l"
                    placeholder="Type a message..."
                />
                <button type="submit" className="bg-blue-500 text-white px-4 rounded-r">Send</button>
            </form>
        </div>
    );
};

export default ChatArea;
