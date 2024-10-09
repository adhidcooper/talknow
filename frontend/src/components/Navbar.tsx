import React from 'react';
import { useAppDispatch } from '../app/hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { logout } from '../app/authService/AuthSlice';

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();  // Move hooks inside the component
  const navigate = useNavigate();     // Move hooks inside the component

  const handleLogout = () => {
      dispatch(logout());  // Trigger the logout action
      navigate('/login');  // Navigate to login page after logout
  }

  const handleCreateChannel = () => {
    navigate('/channelCreator')
  }

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-xl font-bold">
          <a href="/">TalkNow</a>  {/* Replace with your app name or logo */}
        </div>
        <button 
          onClick={handleCreateChannel} 
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
        >
          Logout
        </button>

        {/* Logout Button */}
        <button 
          onClick={handleLogout} 
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
