import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../app/store';
import { getCurrentChannel } from '../app/authService/channelAPI';
import { createMessage, fetchMessagesByChannelId } from '../app/authService/messageAPI';
import { connectSocket } from '../app/socket/socket';

interface ChannelsProps {
  channelId: string;
  channelName: string;
  channelOpen: boolean | null;
  createdBy: string;
  createdTime: string;
}

interface Message {
  messageId: string;
  message: string;
  createdTime: string;
  createdBy: string;
}

const Chat: React.FC = () => {
  const { channelId } = useParams<{ channelId: string }>();
  const [channelDetails, setChannelDetails] = useState<ChannelsProps | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Get the current user from Redux
  const currentUser = useSelector((state: RootState) => state.auth.result); // Access result from Redux store
  const apiKey = useSelector((state: RootState) => state.auth.api_key);

  useEffect(() => {
    const fetchChannelDetails = async () => {
      try {
        const channelData = await getCurrentChannel(channelId);
        if (channelData) {
          setChannelDetails(channelData.data);
        } else {
          setError('Channel not found');
        }
      } catch (err) {
        setError('Failed to fetch channel details');
      }
    };

    if (channelId) {
      fetchChannelDetails();
    }
  }, [channelId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messageData = await fetchMessagesByChannelId(channelId, apiKey);
        if (messageData) {
          setMessages(messageData.data);
        } else {
          setError('No messages found');
        }
      } catch (err) {
        setError('Failed to fetch messages');
      }
    };

    if (channelId) {
      fetchMessages();
    }
  }, [channelId, apiKey]);

  // Connect to WebSocket and listen for new messages
  useEffect(() => {
    const handleNewMessage = (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    const socketClient = connectSocket(handleNewMessage); // Pass the handler

    // Cleanup on unmount
    return () => {
      socketClient.disconnect();
    };
  }, [channelId]);

  const onHandleSentText = async () => {
    setError(null);
    try {
      const response = await createMessage(channelId, text, apiKey);
      if (response) {
        setMessages([...messages, response.data]);
        setText('');
      } else {
        setError('Failed to send message');
      }
    } catch (err) {
      setError('Failed to send message');
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-blue-500 text-white p-4 flex items-center justify-between">
        <h6 className="text-lg font-semibold">
          {channelDetails ? channelDetails.channelName : 'Not Found!'}
        </h6>
      </div>

      {/* Messages Section */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
        {messages.map((msg) => {
          const isCurrentUser = msg.createdBy === currentUser?.username; // Compare msg.createdBy with currentUser.username
          return (
            <div
              key={msg.messageId}
              className={`flex mb-2 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex flex-col max-w-xs">
                {/* Message Bubble */}
                <div
                  className={`p-3 rounded-lg ${
                    isCurrentUser ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  {msg.message}
                </div>
                {/* Timestamp below the bubble */}
                <small className={`text-xs text-gray-500 mt-1 ${isCurrentUser ? 'self-end' : 'self-start'}`}>
                  {new Date(msg.createdTime).toLocaleTimeString()}
                </small>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Section */}
      <div className="bg-white p-4 flex items-center border-t border-gray-300">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={onHandleSentText}
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
