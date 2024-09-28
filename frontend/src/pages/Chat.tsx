import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../app/store';
import { getCurrentChannel } from '../app/authService/channelAPI';
import { createMessage, fetchMessagesByChannelId } from '../app/authService/messageAPI';  // Assuming `fetchMessagesByChannelId` is created

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
  sender: string;
}

const Chat: React.FC = () => {
  const { channelId } = useParams<{ channelId: string }>();
  const [channelDetails, setChannelDetails] = useState<ChannelsProps | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const apiKey = useSelector((state: RootState) => state.auth.api_key);

  // Fetch channel details
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

  // Fetch messages by channel ID
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

  // Handle sending message
  const onHandleSentText = async () => {
    setError(null);
    try {
      const response = await createMessage(channelId, text, apiKey);
      if (response) {
        setMessages([...messages, response.data]); // Append the new message to the existing ones
        setText(''); // Clear input after sending
      } else {
        setError('Failed to send message');
      }
    } catch (err) {
      setError('Failed to send message');
    }
  };

  return (
    <div>
      <h6>Chat Channel: {channelDetails ? channelDetails?.channelName : 'Not Found!'}</h6>
      {error && <p>{error}</p>}

      {/* Messages display */}
      <div>
        {messages.map((msg) => (
          <div key={msg.messageId}>
            <strong>{msg.sender}:</strong> {msg.message} <em>{msg.createdTime}</em>
          </div>
        ))}
      </div>

      {/* Input and send button */}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={onHandleSentText}>Send</button>
    </div>
  );
};

export default Chat;
