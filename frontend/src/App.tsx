import React from 'react'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Channels from './pages/Channels';
import Chat from './pages/Chat';


const App:React.FC = () => {

  return (
    
      <Router>
        <Routes>
          {/* Route for login */}
          <Route path='/login' element={<Login />} />

          {/* Route for sign up */}
          <Route path='/signup' element={<SignUp />} />

          {/* Dashboard route (Protected Route) */}
          <Route path='/dashboard' element={<Dashboard />} />

          {/* Dashboard route (Protected Route) */}
          <Route path='/chat:channelId' element={<Chat />} />

          {/* Channels Route */}
          <Route path='/channels' element={<Channels />} />

          {/* Redirect to login if unknown route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
  )
}

export default App;
