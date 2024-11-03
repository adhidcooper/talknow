import React, { useState } from 'react';
import { useAppDispatch } from '../app/hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { logout } from '../app/authService/AuthSlice';
import { FiEdit, FiLogOut } from 'react-icons/fi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { RootState } from '../app/store';
import { useSelector } from 'react-redux';
import { editProfile } from '../app/authService/authAPI';

export type UserData = {
  firstName: string;
  lastName: string;
  phoneNo: string;
  imgUrl: string;
};


const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.result);
  console.log(user)

  const [isModalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState<UserData>({
    firstName: '',
    lastName: '',
    phoneNo: '',
    imgUrl: '',
  });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleEditClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setImagePreview(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
      setImagePreview(URL.createObjectURL(selectedImage));
    }
  };

  const handleSaveChanges = async () => {
    const responseAction = await editProfile(data, user?.username);
    console.log(responseAction)
    handleCloseModal();
  };

  return (
    <>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-xl font-bold">
            <a href="/">TalkNow</a>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleEditClick}
              className="text-white hover:text-gray-300 transition duration-200"
              aria-label="Edit Profile"
            >
              <FiEdit size={24} />
            </button>
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

      {isModalOpen && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[90vh] overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Edit Profile</h3>
        <button onClick={handleCloseModal}>
          <AiFillCloseCircle size={24} className="text-gray-500 hover:text-red-500 transition" />
        </button>
      </div>

      {/* Scrollable content wrapper */}
      <div className="overflow-y-auto max-h-[70vh]">
        <div className="mb-4">
          {imagePreview && (
            <div className="mt-5 flex justify-center">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-36 h-36 rounded-md border border-gray-300"
              />
            </div>
          )}
          <label className="block text-sm font-medium text-gray-700">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-1 block w-full text-sm text-gray-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            value={data.firstName}
            onChange={handleInputChange}
            placeholder="First Name"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={data.lastName}
            onChange={handleInputChange}
            placeholder="Last Name"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phoneNo"
            value={data.phoneNo}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex justify-end mt-4">
        <button
          onClick={handleSaveChanges}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Save Changes
        </button>
      </div>
      </div>

     
    </div>
  </div>
)}

    </>
  );
};

export default Navbar;
