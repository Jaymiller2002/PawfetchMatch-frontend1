import React, { useState, useEffect, useContext } from 'react';
import { fetchUser } from './api';
import { AuthContext } from './context';
import './Profile.css'
import { Link, useNavigate } from 'react-router-dom';

function Profile() {
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('')
    const [image, setImage] = useState(undefined)
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.accessToken) {
            fetchUserData();
        }
    }, [auth.accessToken]); // Only fetch data when accessToken changes

    useEffect(() => {
        if (!auth.accessToken) {
          // If accessToken is not available, navigate to the login page
          navigate('/login');
        }
      }, [auth.accessToken, navigate]);

    const fetchUserData = async () => {
        try {
            const response = await fetchUser({ auth });
            setUsername(`${response.data.first_name} ${response.data.last_name}`);
            setBio(`${response.data.bio}`);
            setImage(`${response.data.image}`)
        } catch (error) {
            console.log('ERROR: ', error);
            if (auth) {
                auth.setAccessToken(undefined);
            }
        }
    };

    return (
        <div className="Profile-Container">
            <img className="Profile-Image" src={`http://127.0.0.1:8000${image}`}></img>
            <h1 className="Profile-Username">{username}</h1>
            <h2 className="Profile-bio">{bio}</h2>
            <button className='button'><Link to='/MessagePage'>Messages</Link></button>
            {/* Logout Button  */}
            
        </div>
    );
}

export default Profile;



