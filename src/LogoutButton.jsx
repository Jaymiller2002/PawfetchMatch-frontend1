import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from './api';
import { AuthContext } from './context'; // Assuming you have an auth context or hook to get the accessToken
import './LogoutButton.css';

const LogoutButton = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext); // Assuming useAuth provides access to auth context or hook

  const handleLogout = async () => {
    try {
      await logout({ auth }); // Wait for the logout function to complete
      auth.setAccessToken(null);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      // Handle logout error, if needed
    }
  };


  // Only render the LogoutButton if the user is logged in
  if (!auth.accessToken) {
    return null;
  }

  return (
    <div className='logout-button' onClick={handleLogout}>Logout</div>
  );
};

export default LogoutButton;

