import React, { useState, useEffect } from 'react';
import ChannelCreator from '../components/ChannelCreator';
import { fetchUserChannels } from '../app/authService/channelAPI';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useNavigate } from 'react-router-dom';
import FindChannels from '../components/FindChannels';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface ChannelsProps {
  channelId: string;
  channelName: string;
  channelOpen: boolean;
  createdBy: string;
  createdTime: string;
}

const Channels: React.FC = () => {
  const [channels, setChannels] = useState<ChannelsProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const apiKey = useSelector((state: RootState) => state.auth.api_key);
  localStorage.setItem("userDetails", apiKey || "");
  const navigate = useNavigate();
  console.log("test" ,channels)
  useEffect(() => {
    const displayChannels = async () => {
      if (apiKey) {
        try {
          const responseAction = await fetchUserChannels(apiKey);
          setChannels(Array.isArray(responseAction) ? responseAction : []);
          console.log("channels", channels)
          setError(null);
        } catch (error) {
          console.error('Failed to fetch channels:', error);
          setError('Failed to fetch channels. Please try again.');
        }
      }
    };

    displayChannels();
  }, [apiKey]);

  const handleChannelClick = (channelId: string) => {
    if (!channelId) {
      console.error("Invalid channelId");
      return;
  }
  console.log("Channel clicked:", channelId);
  navigate(`/chat/${channelId}`);
  localStorage.setItem("currentChannel", channelId);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4 flex flex-col lg:flex-row lg:space-x-4">
        {/* Channel Creator Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-4 lg:w-1/3">
          <h2 className="text-xl font-bold mb-4">Create a Channel</h2>
          <ChannelCreator />
        </div>

        {/* Find Channels Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-4 lg:w-1/3">
          <h2 className="text-xl font-bold mb-4">Find Channels</h2>
          <FindChannels />
        </div>

        {/* Available Channels Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-4 lg:w-1/3">
          <h2 className="text-xl font-bold mb-4">Available Channels</h2>
          {error && <p className="text-red-500">{error}</p>}
          {channels.length > 0 ? (
            channels.map((item) => (
              <p
                key={item.channelId}
                onClick={() => handleChannelClick(item.channelId)}
                className="text-blue-500 cursor-pointer hover:underline mb-2"
              >
                {item.channelName}
              </p>
            ))
          ) : (
            <p className="text-gray-500">No channels available.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Channels;
