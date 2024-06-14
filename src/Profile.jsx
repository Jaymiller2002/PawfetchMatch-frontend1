import React, { useState, useEffect, useContext } from 'react';
import { fetchUser, updateUser, deleteUser } from './api'; // Import updateUser and deleteUser
import { AuthContext } from './context';
import './Profile.css';
import { Link, useNavigate } from 'react-router-dom';

function Profile() {
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [image, setImage] = useState(undefined);
    const [newFirstName, setNewFirstName] = useState(''); // State for user's input
    const [newLastName, setNewLastName] = useState(''); // State for user's input
    const [newBio, setNewBio] = useState(''); // State for user's input
    const [newImage, setNewImage] = useState(null); // State for user's input
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
            setImage(`${response.data.image}`);
        } catch (error) {
            console.log('ERROR: ', error);
            if (auth) {
                auth.setAccessToken(undefined);
            }
        }
    };

    const handleUpdateProfile = async () => {
        // Pass user's input as parameters to updateUser function
        updateUser({
            auth,
            firstName: newFirstName, // If newFirstName is not empty, use it; otherwise, keep existing firstname 
            lastName: newLastName,
            bio: newBio,
            image: newImage ? newImage : image // If newImage is not empty, use it; otherwise, keep the existing image
        });
    }

    const handleDeleteProfile = async () => {
        // Call deleteUser function with auth parameter
        deleteUser({ auth })
            .then(() => {
                // On successful deletion, navigate to login page
                navigate('/login');
            })
            .catch(error => {
                console.log('Error deleting user:', error);
            });
    }

    return (
        <div className="Profile-Container">
            <img className="Profile-Image" src={`http://127.0.0.1:8000${image}`} alt="User Profile"></img>
            <h1 className="Profile-Username">{username}</h1>
            <h2 className="Profile-bio">{bio}</h2>
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
            <button className='button' onClick={handleUpdateProfile}>Update Profile</button>
            <button className='button' onClick={handleDeleteProfile}>Delete Profile</button>
            <button className='button'><Link to='/MessagePage'>Messages</Link></button>
        </div>
    );
}

export default Profile;




