// All Profile's JSX
import React, { useState, useEffect, useContext } from 'react';
import { fetchAllProfiles } from './api'; // Adjust the path to match your API file
import { AuthContext } from './context'; // Adjust the path to your AuthContext
import './AllProfiles.css';

const AllProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { auth } = useContext(AuthContext);

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

  return (
    <div className='all-profiles-container'>
      <h1 className='page-title'>All Profiles</h1>
      {loading ? (
        <p className='loading-message'>Loading...</p>
      ) : error ? (
        <p className='error-message'>{error}</p>
      ) : (
        <ul className='profile-list'>
          {profiles.map(profile => (
            <li key={profile.id} className='profile-item'>
              <strong>{profile.first_name} - ID: {profile.user}</strong>: {profile.bio}
              {/* Add profile.image later (just has the link names not the actual image) */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllProfiles;


