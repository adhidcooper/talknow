import React, { useState, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { createChannel } from '../app/authService/channelAPI';
import { RootState } from '../app/store';
import Checkbox from './Checkbox';
import { useNavigate } from 'react-router-dom';

const ChannelCreator: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [check, setCheck] = useState<boolean>(false);
  const [channelName, setChannelName] = useState<string>('');
  const apiKey = useSelector((state: RootState) => state.auth.api_key);
  const navigate = useNavigate();


  const handleCreateChannel = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!channelName) {
      setMessage('Please provide a valid channel name');
      return;
    }

    try {
      const responseAction = await createChannel(channelName, check, apiKey!);
      setMessage(`Channel Created Successfully: ${channelName}`);
      setChannelName('');
    } catch (error) {
      setMessage('Failed to create channel. Try again.');
    }
  };

  return (
    <form onSubmit={handleCreateChannel} className="space-y-4">
      <input
        type="text"
        placeholder="Channel Name"
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <Checkbox isOpen={check} onToggle={() => setCheck((prevState) => !prevState)} />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Create Channel
      </button>
      {message && <p className="mt-4 text-center text-green-500">{message}</p>}
    </form>
  );
};

export default ChannelCreator;
