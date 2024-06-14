import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from './api';
import { AuthContext } from './context'; // Assuming you have an auth context or hook to get the accessToken
import './LogoutButton.css';

const LogoutButton = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext); // Assuming useAuth provides access to auth context or hook

  const handleLogout = async () => {
    try {
      await logout({ auth });
      // After successful logout, navigate back to the home page
      navigate('/');
    } catch (error) {
      // Handle logout error, if needed
    }
  };

  return (
    <div className='logout-button' onClick={handleLogout}>Logout</div>
  );
};

export default LogoutButton;

