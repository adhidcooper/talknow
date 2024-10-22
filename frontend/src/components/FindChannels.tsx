import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../app/store';
import { findChannel, joinChannel } from '../app/authService/channelAPI';

const FindChannels: React.FC = () => {
  const [inputChannel, setInputChannel] = useState<string>('');
  const [foundChannels, setFoundChannels] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const apiKey = useSelector((state: RootState) => state.auth.api_key);
  const navigate = useNavigate();

  const onHandleSearch = async () => {
    setError(null);
    if (!inputChannel) return setError('Please enter a channel name.');

    try {
      const channelData = await findChannel(inputChannel);
      setFoundChannels(channelData.data || null);
    } catch {
      setError('Channel not found or error fetching channel.');
    }
  };

  const onHandleJoin = async (channelId: string) => {
    try {
      await joinChannel(channelId, apiKey);
      navigate(`/chat/${channelId}`);
    } catch {
      setError('Failed to join the channel.');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputChannel}
        onChange={(e) => setInputChannel(e.target.value)}
        placeholder="Enter Channel Name"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={onHandleSearch}
        className="mt-2 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Search
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {foundChannels && (
        <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-2">Channel Found:</h3>
          <p className="text-blue-600 font-semibold">{foundChannels.channelName}</p>
          <button
            onClick={() => onHandleJoin(foundChannels.channelId)}
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Join Channel
          </button>
        </div>
      )}
    </div>
  );
};

export default FindChannels;
