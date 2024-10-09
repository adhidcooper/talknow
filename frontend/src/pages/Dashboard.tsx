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
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md flex flex-col">
                <div className="p-6 border-b">
                    <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
                </div>
                <nav className="flex-grow p-4">
                    <ul>
                        <li className="mb-4">
                            <button
                                onClick={onHandleNavigateChannelCreation}
                                className="w-full text-left bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                            >
                                Create Channel
                            </button>
                        </li>
                        {/* Add more navigation items as needed */}
                    </ul>
                </nav>
            </aside>

            {/* Main content */}
            <main className="flex-grow flex flex-col items-center p-6">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back!</h2>
                    {user ? (
                        <div className="text-center">
                            <p className="text-xl font-semibold text-gray-700">Hello, {user.username}!</p>
                            <p className="text-gray-500 mb-6">{user.email}</p>
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center">No user information available.</p>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
