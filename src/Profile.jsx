import React, { useState, useEffect, useContext } from 'react';
import { fetchUser, updateUser, deleteUser } from './api';
import { AuthContext } from './context';
import './Profile.css';
import { Link, useNavigate } from 'react-router-dom';

function Profile() {
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [image, setImage] = useState(undefined);
    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const [newBio, setNewBio] = useState('');
    const [newImage, setNewImage] = useState(null);
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.accessToken) {
            fetchUserData();
            // Polling for updates every 10 seconds
            const interval = setInterval(fetchUserData, 1000);
            return () => clearInterval(interval);
        }
    }, [auth.accessToken]); 

    useEffect(() => {
        if (!auth.accessToken) {
            navigate('/login');
        }
    }, [auth.accessToken, navigate]);

    const fetchUserData = async () => {
        try {
            const response = await fetchUser({ auth });
            setUsername(`${response.data.first_name} ${response.data.last_name}`);
            setBio(`${response.data.bio}`);
            setImage(`${response.data.image}`);
        } catch (error) {
            console.log('ERROR: ', error);
            if (auth) {
                auth.setAccessToken(undefined);
            }
        }
    };

    const handleUpdateProfile = async () => {
        updateUser({
            auth,
            firstName: newFirstName,
            lastName: newLastName,
            bio: newBio,
            image: newImage ? newImage : image
        });
        // Optionally, implement some feedback mechanism after the update
    }

    const handleDeleteProfile = async () => {
        deleteUser({ auth })
            .then(() => {
                navigate('/login');
            })
            .catch(error => {
                console.log('Error deleting user:', error);
            });
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1 className="profile-username">{username}</h1>
                <img className="profile-image" src={`http://127.0.0.1:8000${image}`} alt="User Profile" />
                <p className="profile-bio">{bio}</p>
            </div>
            <div className="profile-form">
                <input 
                    type="text" 
                    placeholder="New First Name" 
                    value={newFirstName} 
                    onChange={(e) => setNewFirstName(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder="New Last Name" 
                    value={newLastName} 
                    onChange={(e) => setNewLastName(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder="New Bio" 
                    value={newBio} 
                    onChange={(e) => setNewBio(e.target.value)} 
                />
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => setNewImage(e.target.files[0])} 
                />
                <button className='update-button' onClick={handleUpdateProfile}>Update Profile</button>
                <button className='delete-button' onClick={handleDeleteProfile}>Delete Profile</button>
            </div>
            <div className="profile-footer">
                <button className='message-button'><Link to='/MessagePage'>Messages</Link></button>
            </div>
        </div>
    );
}

export default Profile;






