import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-lime-500 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Welcome to TalkNow</h1>
          <p className="mt-4 text-xl">The Ultimate Chat Experience – Connect, Communicate, and Collaborate in Real-Time</p>
          <button className="mt-8 bg-white text-lime-500 font-bold py-3 px-6 rounded-md hover:bg-blue-100 transition duration-300" onClick={() => navigate('/login')}>
            Get Started
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why TalkNow?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <img 
                src="https://via.placeholder.com/300" 
                alt="Instant Messaging" 
                className="mx-auto mb-4 w-32 h-32 object-cover rounded-full"
              />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Instant Messaging</h3>
              <p className="text-gray-500">Connect with friends instantly using our real-time chat system with lightning-fast responses.</p>
            </div>

            <div className="bg-white p-6 shadow-lg rounded-lg">
              <img 
                src="https://via.placeholder.com/300" 
                alt="Group Chats" 
                className="mx-auto mb-4 w-32 h-32 object-cover rounded-full"
              />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Group Chats</h3>
              <p className="text-gray-500">Collaborate in group chats with friends, teams, or communities and stay connected together.</p>
            </div>

            <div className="bg-white p-6 shadow-lg rounded-lg">
              <img 
                src="https://via.placeholder.com/300" 
                alt="Media Sharing" 
                className="mx-auto mb-4 w-32 h-32 object-cover rounded-full"
              />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Media Sharing</h3>
              <p className="text-gray-500">Share images, videos, and documents effortlessly and enjoy a seamless multimedia experience.</p>
              {/* <p>on</p> */}
            </div>
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Cool Features of TalkNow</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">1. End-to-End Encryption</h3>
              <p className="text-gray-500">All your messages are safe and secure with our robust encryption technology.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">2. Cross-Platform Sync</h3>
              <p className="text-gray-500">Sync your chats across all devices seamlessly – mobile, tablet, or desktop.</p>
            </div>
            {/* <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">3. Voice & Video Calls</h3>
              <p className="text-gray-500">High-quality voice and video calls to connect with anyone around the world.</p>
            </div> */}
            {/* <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">4. Customizable Themes</h3>
              <p className="text-gray-500">Personalize your chat experience with customizable themes and layouts.</p>
            </div> */}
            {/* <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">5. Push Notifications</h3>
              <p className="text-gray-500">Never miss a message with real-time push notifications on all your devices.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">6. AI-Powered Chatbots</h3>
              <p className="text-gray-500">Automate responses and engage with AI chatbots for customer service or fun.</p>
            </div> */}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-lime-500 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to start chatting?</h2>
        <p className="text-xl mb-8">Create Account in TalkNow today and stay connected with your loved ones.</p>
        <button className="bg-white text-lime-500 font-bold py-3 px-6 rounded-md hover:bg-lime-100 transition duration-300" onClick={() => navigate("/register")}>Create Account</button>

      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-8">
        <div className="container mx-auto text-center text-white">
          <p>&copy; {new Date().getFullYear()} TalkNow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
