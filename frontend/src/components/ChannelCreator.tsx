import React, { useState, FormEvent } from 'react';
import Checkbox from './Checkbox';
import { createChannel } from '../app/authService/channelAPI';
import { RootState } from '../app/store';
import { useSelector } from 'react-redux';

const ChannelCreator: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [check, setCheck] = useState<boolean>(false);
  const [channelName, setChannelName] = useState<string>('');
  const apiKey = useSelector((state: RootState) => state.auth.api_key);

  const handleToggle = () => {
    setCheck((prevState) => !prevState);
  };

  const handleCreateChannel = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const responseAction = await createChannel(channelName, check, apiKey!);
      setMessage('Channel Created Successfully: ' + channelName);
      console.log(responseAction.data);
    } catch (error) {
      setMessage('Failed to create channel');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleCreateChannel} className="space-y-4">
      <input
        type="text"
        placeholder="Channel Name"
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <Checkbox isOpen={check} onToggle={handleToggle} />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Create Channel
      </button>
      {message && <p className="mt-4 text-center text-green-500">{message}</p>}
    </form>
  );
};

export default ChannelCreator;
