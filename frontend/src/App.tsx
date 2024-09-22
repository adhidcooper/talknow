import React, { useState } from 'react'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import { Provider } from 'react-redux';
import store from './app/store';


const App:React.FC = () => {

  return (
    // <div>
    //   <h1>Welcome to TalkNow Chat App</h1>
    //   {!api_key ? (<Login setApiKey={setApi_key}/>) : (<UserInfo  apiKey={api_key}/>)}
    // </div>
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Route for login */}
          <Route path='/login' element={<Login />} />

          {/* Route for sign up */}
          <Route path='/signup' element={<SignUp />} />

          {/* Dashboard route (Protected Route) */}
          <Route path='/dashboard' element={<Dashboard />} />

          {/* Redirect to login if unknown route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App;
