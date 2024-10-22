import React, { useState } from 'react';
import { useAppDispatch } from '../app/hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { logout } from '../app/authService/AuthSlice';
import { FiEdit, FiLogOut } from 'react-icons/fi'; // Importing icons from React Icons
import { AiFillCloseCircle } from 'react-icons/ai';

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();  
  const navigate = useNavigate();     

  // State for modal visibility
  const [isModalOpen, setModalOpen] = useState(false);
  const [username, setUsername] = useState(''); // For changing username
  const [image, setImage] = useState<File | null>(null); // For uploading an image
  const [imagePreview, setImagePreview] = useState<string | null>(null); // For image preview

  const handleLogout = () => {
    dispatch(logout());  
    navigate('/login');  
  };

  const handleEditClick = () => {
    setModalOpen(true); // Open the modal when edit button is clicked
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Close the modal
    setImagePreview(null); // Reset the image preview when closing
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value); // Update the username state
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage); // Update the image state
      setImagePreview(URL.createObjectURL(selectedImage)); // Set image preview
    }
  };

  const handleSaveChanges = () => {
    // Handle saving the username and image to the backend here
    console.log('Username:', username);
    console.log('Image:', image);
    handleCloseModal(); // Close the modal after saving
  };

  return (
    <>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="text-white text-xl font-bold">
            <a href="/">TalkNow</a>
          </div>

          {/* Edit and Logout Buttons */}
          <div className="flex space-x-4">
            {/* Edit Button */}
            <button 
              onClick={handleEditClick} 
              className="text-white hover:text-gray-300 transition duration-200"
              aria-label="Edit Profile"
            >
              <FiEdit size={24} />
            </button>

            {/* Logout Button */}
            <button 
              onClick={handleLogout} 
              className="text-white hover:text-gray-300 transition duration-200"
              aria-label="Logout"
            >
              <FiLogOut size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Modal for editing profile */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit Profile</h3>
              <button onClick={handleCloseModal}>
                <AiFillCloseCircle size={24} className="text-gray-500 hover:text-red-500 transition" />
              </button>
            </div>

            {/* Upload Image */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Upload Image</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                className="mt-1 block w-full text-sm text-gray-500"
              />
              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-2">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-auto rounded-md border border-gray-300"
                  />
                </div>
              )}
            </div>

            {/* Change Username */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Change Username</label>
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                placeholder="New Username"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button 
                onClick={handleSaveChanges} 
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
