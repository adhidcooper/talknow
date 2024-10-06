import React from 'react';
import { useAppDispatch } from '../app/hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { logout} from '../app/authService/AuthSlice';

// interface NavbarProps {
//   handleLogout: () => void;
// }
const dispatch = useAppDispatch();
const navigate = useNavigate();

const handleLogout = () => {
    dispatch(logout());
    navigate('/login');  // Navigate to login page
}


const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-xl font-bold">
          <a href="/">TalkNow</a>  {/* Replace with your app name or logo */}
        </div>

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
