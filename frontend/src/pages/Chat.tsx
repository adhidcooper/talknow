import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { channelActivity, getCurrentChannel } from '../app/authService/channelAPI';
import { createMessage, fetchMessagesByChannelId } from '../app/authService/messageAPI';
import { connectSocket } from '../app/socket/socket';
import { FaBars, FaTimes } from 'react-icons/fa';

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

interface Member {
  memberId: string;
  name: string;
  isActive: boolean;
}

const Chat: React.FC = () => {
  const { channelId } = useParams<{ channelId: string }>();
  const [channelDetails, setChannelDetails] = useState<ChannelsProps | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [members, setMembers] = useState<Member[]>([]);
  const currentUser = JSON.parse(localStorage.getItem("userDetails"));
  // console.log("currentUser", currentUser);
  
  // Now you can safely access the api_key
  const apiKey = currentUser?.api_key || ''; 
  console.log()

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await channelActivity(channelId, apiKey);
        const memberData = data.result.map((user: any) => ({
          memberId: user.id,
          name: user.username || `${user.firstName || ''} ${user.lastName || ''}`.trim(),
          isActive: user.is_active,
        }));
        setMembers(memberData);
      } catch (err) {
        console.error('Failed to fetch members:', err);
        setError('Failed to load members');
      }
    };

    if (channelId) {
      fetchMembers();
    }
  }, [channelId, apiKey]);

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

  useEffect(() => {
    const handleNewMessage = (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      scrollToBottom();
    };

    const socketClient = connectSocket(handleNewMessage, channelId);

    return () => {
      socketClient.disconnect();
    };
  }, [channelId, messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const onHandleSentText = async () => {
    setError(null);
    try {
      const response = await createMessage(channelId, text, apiKey);
      if (response) {
        setMessages((prevMessages) => [...prevMessages, response.data]);
        setText('');
        scrollToBottom();
      } else {
        setError('Failed to send message');
      }
    } catch (err) {
      setError('Failed to send message');
      console.error(err);
    }
  };

  const onHandlePhotoUpload = () => {
    setError('Photo upload functionality coming soon!');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {isSidebarOpen && (
        <div className="w-1/4 bg-white p-4 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Members</h3>
          <ul>
            {members.map((member) => (
              <li key={member.memberId} className="flex items-center mb-3">
                <span
                  className={`w-3 h-3 rounded-full mr-2 ${member.isActive ? 'bg-green-500' : 'bg-gray-400'}`}
                ></span>
                {member.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      <button 
        onClick={toggleSidebar} 
        className="bg-blue-600 text-white px-4 py-2 rounded-lg m-4 flex items-center"
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>
      <div className="flex flex-col flex-1 bg-gray-100 px-20 py-8 rounded-2xl">
        <div className="bg-blue-600 text-white p-4 flex items-center justify-between shadow-md rounded-t-xl">
          <h6 className="text-lg font-semibold">
            {channelDetails ? channelDetails.channelName : 'Channel Not Found'}
          </h6>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.length > 0 ? (
            messages.map((msg) => {
              const isCurrentUser = msg.createdBy === currentUser?.username;
              return (
                <div key={msg.messageId} className={`flex mb-3 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                  <div className="flex flex-col max-w-xs">
                    <small className={`text-xs text-gray-500 mt-1`}>{msg?.createdBy}</small>
                    <div className={`p-3 rounded-xl shadow-md ${isCurrentUser ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
                      {msg.message}
                    </div>
                    <small className={`text-xs text-gray-500 mt-1 ${isCurrentUser ? 'self-end' : 'self-start'}`}>
                      {new Date(msg.createdTime).toLocaleTimeString()}
                    </small>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-center">No messages yet. Start the conversation!</p>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="bg-white p-4 flex items-center border-t border-gray-300 shadow-inner rounded-b-xl">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={onHandleSentText}
            className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Send
          </button>
          <button
            onClick={onHandlePhotoUpload}
            className="ml-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Upload Photo
          </button>
        </div>
        {error && <p className="text-red-500 p-2 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Chat;
