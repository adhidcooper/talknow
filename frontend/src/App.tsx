import React from 'react'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Channels from './pages/Channels';
import Chat from './pages/Chat';
import Unknown from './pages/Unknown';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import HomePage from './pages/HomePage';
// import './index.css'


const App:React.FC = () => {

  return (
    
      <Router>
        <Routes>
          <Route path='/unknown'element={<Unknown/>}/>
          
          <Route path='/' element={<HomePage/>}/>

          {/* Route for login */}
          <Route path='/login' element={<Login />} />

          {/* Route for sign up */}
          <Route path='/signup' element={<SignUp />} />

          {/* Dashboard route (Protected Route) */}
          <Route path='/dashboard' element={<Dashboard />} />

          {/* Dashboard route (Protected Route) */}
          <Route path='/chat/:channelId' element={<Chat isOpen={false} onToggle={function (): void {
          throw new Error('Function not implemented.');
        } } />} />

          {/* Channels Route */}
          <Route path='/channels' element={<Channels />} />

          {/* Forgot Password */}
          <Route path='/forgotPassword' element={<ForgotPassword />} />

          {/* Reset Password */}
          <Route path='/resetPassword' element={<ResetPassword />} />

          {/* Redirect to login if unknown route */}
          <Route path="*" element={<Navigate to="/unknown" />} />
        </Routes>
      </Router>
  )
}

export default App;
