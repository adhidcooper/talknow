import React, { useState } from 'react'
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

const FindChannels:React.FC = () => {
    const [foundChannels, setFoundChannels] = useState<ChannelsProps>();
    const [inputChannel, setInputChannel] = useState<string>("")
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const apiKey = useSelector((state: RootState) => state.auth.api_key);
    const onHandleSearch = async () => {
        setError(null);
        const channelData = await findChannel(inputChannel);
        if (channelData.data) {
            setFoundChannels(channelData.data);
        } else {
            setError("Channel Not Found or Error Fetching Channel!");
        }
    }

    const onHandleChannelClick = (channelId: string) => {
        console.log(channelId);
        navigate(`/chat/${channelId}`);
    }

    const onHandleJoin = async (channelId: string) => {
        // console.log(channelId);
        const joinSearchedChannel = await joinChannel(channelId, apiKey);
        console.log(joinSearchedChannel);
    }
  return (
    <div>
        <input type="text" value={inputChannel} onChange={(e) => setInputChannel(e.target.value)} placeholder='Enter Channel Name!' />
        <button onClick={onHandleSearch}>Search</button>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {foundChannels? (
            <div>
                <p 
                key={foundChannels.channelId}
                onClick={() => onHandleChannelClick(foundChannels.channelId)}
                style={{cursor: 'pointer'}}
                >

                    {foundChannels.channelName}
                </p>
                <button onClick={() => onHandleJoin (foundChannels.channelId)}>join</button>
            </div>
        ): (
            <div>
                <p>No Channels Found!</p>
            </div>
        )}
      
    </div>
  )
}

export default FindChannels
