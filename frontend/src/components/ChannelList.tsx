import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { fetchUserChannels } from '../app/authService/channelAPI';

const ChannelList: React.FC<{ onChannelSelect?: (channelId: string) => void }> = ({ onChannelSelect }) => {
  const apiKey = useSelector((state: RootState) => state.auth.api_key);
  const [channels, setChannels] = useState<{ channelId: string; channelName: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (apiKey) {
      fetchUserChannels(apiKey)
        .then((channelsData) => setChannels(channelsData))
        .catch(() => setError('Failed to fetch channels.'));
    }
  }, [apiKey]);

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Available Channels</h2>
      {error && <p className="text-red-500">{error}</p>}
      {channels.length > 0 ? (
        <ul className="space-y-3">
          {channels.map((channel) => (
            <li key={channel.channelId} className="flex justify-between items-center">
              <p
                onClick={() => onChannelSelect?.(channel.channelId)}
                className="text-blue-600 font-semibold cursor-pointer hover:underline"
              >
                {channel.channelName}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No channels available.</p>
      )}
    </div>
  );
};

export default ChannelList;
