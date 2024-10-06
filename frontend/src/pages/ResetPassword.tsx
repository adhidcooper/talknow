import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { resetPassword } from '../app/authService/authAPI';

const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const location = useLocation(); // To get email from the previous step
  const navigate = useNavigate();
  const email = location.state?.email; // Getting email from navigation

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      const response = await resetPassword(email, newPassword);
        console.log(response)
      if (response.status === 200) {
        navigate('/login'); // Redirect to login after password reset
      } else {
        setError('Failed to reset password!');
      }
    } catch (err) {
      setError('Error while resetting password.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800">Reset Password</h1>

        {error && (
          <p className="text-red-500 text-center">{error}</p>
        )}

        <div className="space-y-4">
          <input
            type="password"
            value={newPassword}
            placeholder="Enter new password"
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500"
          />

          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm new password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500"
          />

          <button
            onClick={handleResetPassword}
            className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
