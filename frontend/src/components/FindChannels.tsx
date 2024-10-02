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
        console.log(channelId);
        navigate(`/chat/${channelId}`);
    };

    const onHandleJoin = async (channelId: string) => {
        const joinSearchedChannel = await joinChannel(channelId, apiKey);
        console.log(joinSearchedChannel);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
                <h1 className="text-2xl font-bold text-center mb-6">Find Channels</h1>
                <div className="flex items-center mb-4">
                    <input
                        type="text"
                        value={inputChannel}
                        onChange={(e) => setInputChannel(e.target.value)}
                        placeholder="Enter Channel Name!"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        onClick={onHandleSearch}
                        className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Search
                    </button>
                </div>

                {error && <p className="text-red-500 text-center">{error}</p>}

                {foundChannels ? (
                    <div className="bg-gray-100 p-4 rounded-lg mt-4 shadow-inner">
                        <p
                            key={foundChannels.channelId}
                            onClick={() => onHandleChannelClick(foundChannels.channelId)}
                            className="text-lg font-semibold text-blue-500 cursor-pointer hover:underline"
                        >
                            {foundChannels.channelName}
                        </p>
                        <button
                            onClick={() => onHandleJoin(foundChannels.channelId)}
                            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                        >
                            Join Channel
                        </button>
                    </div>
                ) : (
                    <div className="text-center mt-4">
                        <p className="text-gray-500">No Channels Found!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FindChannels;
