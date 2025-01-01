import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchUser } from '../app/authService/AuthSlice';
import { RootState } from '../app/store';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks/hooks';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChannelList from '../components/ChannelList';
import ChannelCreator from '../components/ChannelCreator';
import FindChannels from '../components/FindChannels';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleChannelClick = (channelId: string) => {
    navigate(`/chat/${channelId}`);
  };

  const apiKey = useSelector((state: RootState) => state.auth.api_key);
  
  useEffect(() => {
    if (apiKey) {
      dispatch(fetchUser(apiKey));
    } else {
      navigate('/login');
    }
  }, [apiKey, dispatch, navigate]);
  
  const user = useSelector((state: RootState) => state.auth.result);
  console.log("++++++",user)
  const loading = user.loading;
  const fetchError = user.error;
  

  if (loading) return <div className="flex justify-center items-center h-screen text-lg">Loading...</div>;
  if (fetchError) return <div className="flex justify-center items-center h-screen text-lg text-red-500">Error: {fetchError}</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-6 lg:px-2">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="col-span-1 bg-white shadow rounded-lg p-6">
            <div className="space-y-4">
              {/* <div className="bg-gray-100 rounded-lg p-6 shadow-md"> */}
                <h3 className="text-lg font-semibold mb-3 text-gray-700">Create a Channel</h3>
                <ChannelCreator />
              {/* </div> */}
              <hr />
              {/* <div className="bg-gray-100 rounded-lg p-6 shadow-md"> */}
                <h3 className="text-lg font-semibold mb-3 text-gray-700">Find Channels</h3>
                <FindChannels />
              </div>
            {/* </div> */}
          </aside>

          <main className="col-span-3">
                  {/* <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome</h2> */}
            {user && (
                <div className="text-left mb-6">
                <p className="text-2xl font-bold  text-gray-800">Hello, {user.username}!</p>
                <p className="text-gray-500">{user.email}</p>
                </div>
            )}
           
            <ChannelList onChannelSelect={(channelId) => handleChannelClick(channelId)}/>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
