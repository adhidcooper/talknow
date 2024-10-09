import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../app/store';
import { findChannel, joinChannel } from '../app/authService/channelAPI';

interface ChannelsProps {
  channelId: string;
  channelName: string;
  channelOpen: boolean | null;
  createdBy: string;
  createdTime: string;
}

const FindChannels: React.FC = () => {
  const [foundChannels, setFoundChannels] = useState<ChannelsProps | null>(null);
  const [inputChannel, setInputChannel] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const apiKey = useSelector((state: RootState) => state.auth.api_key);

  const onHandleSearch = async () => {
    setError(null);
    const channelData = await findChannel(inputChannel);
    if (channelData.data) {
      setFoundChannels(channelData.data);
    } else {
      setError('Channel Not Found or Error Fetching Channel!');
    }
  };

  const onHandleChannelClick = (channelId: string) => {
    navigate(`/chat/${channelId}`);
  };

  const onHandleJoin = async (channelId: string) => {
    const joinSearchedChannel = await joinChannel(channelId, apiKey);
    console.log(joinSearchedChannel);
  };

  return (
    <div>
      <input
        type="text"
        value={inputChannel}
        onChange={(e) => setInputChannel(e.target.value)}
        placeholder="Enter Channel Name!"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
      />
      <button
        onClick={onHandleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Search
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {foundChannels ? (
        <div className="mt-4">
          <p
            key={foundChannels.channelId}
            onClick={() => onHandleChannelClick(foundChannels.channelId)}
            className="text-lg font-semibold text-blue-500 cursor-pointer hover:underline"
          >
            {foundChannels.channelName}
          </p>
          <button
            onClick={() => onHandleJoin(foundChannels.channelId)}
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Join Channel
          </button>
        </div>
      ) : (
        <p className="text-gray-500">No Channels Found!</p>
      )}
    </div>
  );
};

export default FindChannels;
