
import React, { useState, FormEvent, useEffect } from 'react';
import ChannelCreator from '../components/ChannelCreator';
import { fetchAllChannels } from '../app/authService/messageAPI';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

interface channelsProps {
    channelName: string;
    channelOpen: boolean;
    createdBy: string;
    createdTime: string;
}

const Channels: React.FC = () => {
    const [channels, setChannels] = useState<channelsProps[]>([]);
    const apiKey = useSelector((state: RootState) => state.auth.api_key);
    const handleGetAllChannels = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const responseAction = await fetchAllChannels(apiKey!);
        setChannels(responseAction.data)

        return responseAction;
    }

    // useEffect(() => {
    //   const displayChannels = async() => {
    //     const responseAction =  await fetchAllChannels(apiKey!)
    //     setChannels(responseAction.data)
    //   }
    //   displayChannels()
    //   // return () => displayChannels();
    // },[apiKey, channels])

  return (
    <div>
      <ChannelCreator />
      <br />
      <hr />
    <br />
      <div>
            <div>
                <form onSubmit={handleGetAllChannels}>
                    <button type='submit'>Get All Channels</button>
                </form>     
                <h2>Avaliable Channels!</h2>
                <pre>
                    {channels.map((items) => <p>{items?.channelName}</p>)}
                </pre>

            </div>
        </div>
    </div>
  )
}

export default Channels;
