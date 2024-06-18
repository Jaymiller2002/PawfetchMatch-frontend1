import React, { useState, useEffect, useContext } from 'react';
import { fetchAllProfiles } from './api'; // Adjust the path to match your API file
import { AuthContext } from './context'; // Adjust the path to your AuthContext
import './AllProfiles.css';
import { useNavigate } from 'react-router-dom';

const AllProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        const response = await fetchAllProfiles({ auth });
        setProfiles(response);
        setLoading(false);
      } catch (error) {
        setError(error.message || 'An error occurred');
        setLoading(false);
      }
    };

    if (auth.accessToken) {
      fetchProfiles();
    }
  }, [auth.accessToken]); // Dependency array ensures fetchProfiles is called when auth.accessToken changes

  useEffect(() => {
    if (!auth.accessToken) {
      navigate('/login');
    }
  }, [auth.accessToken, navigate]);

  return (
    <div className='all-profiles-container'>
      <h1 className='page-title'></h1>
      {loading ? (
        <p className='loading-message'>Loading...</p>
      ) : error ? (
        <p className='error-message'>{error}</p>
      ) : (
        <ul className='profile-list'>
          {profiles.map(profile => (
            <li key={profile.id} className='profile-item'>
              <img className="profile-image" src={`http://127.0.0.1:8000${profile.image}`} alt="User Profile" />
              <div className="profile-details">
                <div><strong>{profile.first_name} {profile.last_name}</strong></div>
                <div><strong>Id: {profile.user}</strong></div>
                <div>{profile.bio}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllProfiles;


