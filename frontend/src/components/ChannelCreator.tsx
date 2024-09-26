import React, { useState, FormEvent } from 'react';
import Checkbox from './Checkbox';
import { createChannel } from '../app/authService/messageAPI';
import { RootState } from '../app/store';
import { useSelector } from 'react-redux';

interface ChannelCreatorProps {
  onChannelCreated: (newChannel: { channelId: string; channelName: string; createdBy: string; createdTime: string; }) => void; // Add createdBy and createdTime
}

const ChannelCreator: React.FC<ChannelCreatorProps> = ({ onChannelCreated }) => {
  const [message, setMessage] = useState<string>("");
  const [check, setCheck] = useState<boolean>(false);
  const [channelName, setChannelName] = useState<string>("");

  const apiKey = useSelector((state: RootState) => state.auth.api_key);

  const handleToggle = () => {
    setCheck((prevState) => !prevState);
  }

  const handleCreateChannel = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const responseAction = await createChannel(channelName, check, apiKey!);
      setMessage("Channel Created Successfully");

      // Assuming responseAction contains the channelId and other info
      if (responseAction) {
        const newChannel = {
          channelId: responseAction.channelId, // Adjust based on your API response structure
          channelName: channelName,
          createdBy: 'User', // Replace with actual user data if available
          createdTime: new Date().toISOString(),
        };
        
        onChannelCreated(newChannel); // Notify the parent about the new channel
      }
    } catch (error) {
      setMessage("Failed to create channel");
      console.error(error);
    }
  }

  return (
    <div>
      <p>Create a channel</p>
      <form onSubmit={handleCreateChannel}>
        <input 
          type='text' 
          autoCapitalize='true' 
          placeholder='Channel Name' 
          value={channelName} 
          onChange={(e) => setChannelName(e.target.value)} 
        />
        <Checkbox isOpen={check} onToggle={handleToggle} />
        <button type='submit'>Create a channel</button>
      </form>
      {message && <p>{message}</p>} {/* Ensure message is wrapped in a <p> for proper rendering */}
    </div>
  )
}

export default ChannelCreator;
