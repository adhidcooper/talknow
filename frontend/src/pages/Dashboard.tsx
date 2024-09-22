import React, { useEffect } from 'react';
import { RootState } from '../app/store';
import { logout, fetchUser } from '../app/authService/AuthSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks/hoots';


const Dashboard: React.FC = () => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    
    // Fetch user info from Redux store
    const user = useSelector((state: RootState) => state.auth.user);
    const apiKey = useSelector((state: RootState) => state.auth.apiKey);
    const loading = useSelector((state: RootState) => state.auth.loading);
    const error = useSelector((state: RootState) => state.auth.error);
    
    useEffect(() => {
        if (apiKey) {
            dispatch(fetchUser(apiKey));  // Fetch the user information if apiKey exists
        } else {
            navigate('/login');  // Redirect to login if not authenticated
        }
    }, [apiKey, dispatch, navigate]);

    const handleLogout = () => {
        dispatch(logout());  // Clear user session
        navigate('/login');  // Navigate to login page
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    console.log("thisis it" , user)
    return (
        <div>
            <h2>Dashboard</h2>
            {user ? (
                <div>
                    <p>Welcome, {user.username}!</p>
                    <p>Email: {user.email}</p>
                    {/* Add more user details if needed */}
                </div>
            ) : (
                <p>No user information available.</p>
            )}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Dashboard;
