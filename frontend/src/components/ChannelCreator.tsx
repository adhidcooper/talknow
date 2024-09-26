import React, { useState, FormEvent } from 'react'
import Checkbox from './Checkbox';
import { createChannel } from '../app/authService/messageAPI';
import { RootState } from '../app/store';
import { useSelector } from 'react-redux';


const ChannelCreator: React.FC = () => {
    const [message, setMessage] = useState<string>("");
    const [check, setCheck ] = useState<boolean>(false);
    const [channelName, setChannelName] = useState<string>("")

    const apiKey = useSelector((state: RootState) => state.auth.api_key);
    
    const handleToggle = () => {
        setCheck((prevState) => !prevState)
    }

    const handleCreateChannel = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const responseAction = await createChannel(channelName, check, apiKey!);
        setMessage("Channel Created Sucessfully")
        return responseAction;
    }
  return (
    <div>
         <p>create a channel</p>
            <form onSubmit={handleCreateChannel}>
                <input type='text' autoCapitalize='true' placeholder='channel Name' value={channelName} onChange={(e) => setChannelName(e.target.value)} />
                <Checkbox isOpen={check} onToggle={handleToggle}/>
                <button type='submit'>Create a channel</button>
            </form>
    {message && message}

    </div>
  )
}

export default ChannelCreator;
