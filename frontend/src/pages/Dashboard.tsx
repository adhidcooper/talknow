import React, { useEffect } from 'react';
import { RootState } from '../app/store';
import { fetchUser } from '../app/authService/AuthSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks/hooks';
import Navbar from '../components/Navbar';  // Navbar Component
import Footer from '../components/Footer';  // Footer Component

const Dashboard: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    // Fetch user info from Redux store
    const user = useSelector((state: RootState) => state.auth.result);
    const apiKey = useSelector((state: RootState) => state.auth.api_key);
    const loading = useSelector((state: RootState) => state.auth.loading);
    const error = useSelector((state: RootState) => state.auth.error);

    useEffect(() => {
        if (apiKey) {
            dispatch(fetchUser(apiKey));  // Fetch the user information if apiKey exists
        } else {
            navigate('/login');  // Redirect to login if not authenticated
        }
    }, [apiKey, dispatch, navigate]);


    const onHandleNavigateChannelCreation = () => {
        navigate('/channels');
    }

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return <div className="flex justify-center items-center h-screen">Error: {error}</div>;

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Navbar */}
            <Navbar />

            <main className="flex-grow flex flex-col items-center">
                <div className="bg-white shadow-lg rounded-lg p-8 mt-10 w-full max-w-3xl">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Dashboard</h2>
                    {user ? (
                        <div className="text-center">
                            <p className="text-xl font-semibold text-gray-700">Welcome, {user.username}!</p>
                            <p className="text-gray-500 mb-6">{user.email}</p>
                            <button 
                                onClick={onHandleNavigateChannelCreation} 
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 mb-4"
                            >
                                Create Channel
                            </button>
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center">No user information available.</p>
                    )}
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default Dashboard;
