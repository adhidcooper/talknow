import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { forgotPassword } from '../app/authService/authAPI';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    try {
      const response = await forgotPassword(email);
      console.log(response)
      if (response.status === 200) {
        setSuccess(true); // Success: Move to reset password page
      } else {
        setError('Something went wrong, please try again!');
      }
    } catch (err) {
      setError('User not found or something went wrong!');
    }
  };

  if (success) {
    // If successful, move to the reset password screen with email passed
    navigate('/resetPassword', { state: { email } });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800">Forgot Password</h1>

        {error && (
          <p className="text-red-500 text-center">{error}</p>
        )}

        <div className="space-y-4">
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500"
          />
          <button
            onClick={handleForgotPassword}
            className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Send Verification
          </button>
        </div>

        {success && (
          <p className="text-green-500 text-center">Verification email sent! Check your inbox.</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
