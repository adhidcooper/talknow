// src/components/ChannelList.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { fetchUserChannels } from '../app/authService/channelAPI';

const ChannelList: React.FC<{ onChannelSelect: (channelId: string) => void }> = ({ onChannelSelect }) => {
    const apiKey = useSelector((state: RootState) => state.auth.api_key);
    const [channels, setChannels] = React.useState<{ channelId: string; channelName: string }[]>([]);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        const loadChannels = async () => {
            if (apiKey) {
                try {
                    const channelsData = await fetchUserChannels(apiKey);
                    setChannels(channelsData);
                } catch (err) {
                    setError('Failed to fetch channels');
                }
            }
        };
        loadChannels();
    }, [apiKey]);

    return (
        <div>
            {error && <p className="text-red-500">{error}</p>}
            {channels.map(channel => (
                <p
                    key={channel.channelId}
                    onClick={() => onChannelSelect(channel.channelId)}
                    className="cursor-pointer hover:bg-gray-700 p-2 rounded"
                >
                    {channel.channelName}
                </p>
            ))}
        </div>
    );
};

export default ChannelList;
