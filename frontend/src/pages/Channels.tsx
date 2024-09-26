import React, { useState, useEffect } from 'react';
import ChannelCreator from '../components/ChannelCreator';
import { fetchUserChannels } from '../app/authService/messageAPI';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useNavigate } from 'react-router-dom';

interface ChannelsProps {
  channelId: string;
  channelName: string;
  channelOpen: boolean;
  createdBy: string;
  createdTime: string;
}

const Channels: React.FC = () => {
  const [channels, setChannels] = useState<ChannelsProps[]>([]);
  const [error, setError] = useState<string | null>(null); // State for error handling
  const apiKey = useSelector((state: RootState) => state.auth.api_key);
  const navigate = useNavigate();

  useEffect(() => {
    const displayChannels = async () => {
      if (apiKey) {
        try {
          const responseAction = await fetchUserChannels(apiKey);
          // Ensure responseAction.data is always an array
          setChannels(Array.isArray(responseAction) ? responseAction : []);
          setError(null); // Reset error on successful fetch
        } catch (error) {
          console.error("Failed to fetch channels:", error);
          setError("Failed to fetch channels. Please try again."); // Set error message
        }
      }
    };

    displayChannels();
  }, [apiKey]);

  // Function to handle channel click
  const handleChannelClick = (channelId: string) => {
    navigate(`/chat/${channelId}`); // Navigate to chat page with channel ID
  };

  const addChannel = (newChannel: ChannelsProps) => {
    setChannels((prevChannels) => [...prevChannels, newChannel]);
  };

  return (
    <div>
      <ChannelCreator onChannelCreated={addChannel} />
      <br />
      <hr />
      <br />
      <div>
        <h2>Available Channels!</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
        {channels.length > 0 ? (
          <pre>
            {channels.map((item) => (
              <p
                key={item.channelId}
                onClick={() => handleChannelClick(item.channelId)}
                style={{ cursor: 'pointer' }}
              >
                {item.channelName}
              </p>
            ))}
          </pre>
        ) : (
          <p>No channels available.</p>
        )}
      </div>
    </div>
  );
}

export default Channels;
