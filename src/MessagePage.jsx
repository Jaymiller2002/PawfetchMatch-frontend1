import React, { useState, useEffect, useContext } from 'react';
import { createMessage } from './api';
import { AuthContext } from './context';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import GetMessages from './GetMessages';
import './MessagePage.css'

function MessagePage() {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [receiver, setReceiver] = useState(''); // State for receiver's ID
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate(); // Get the navigate function from React Router

  const handleMessageSend = async () => {
    try {
      const response = await createMessage({ content, image, receiver, auth });
      createMessage(response.data);
    } catch (error) {
      // Handle error
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    if (!auth.accessToken) {
      // If accessToken is not available, navigate to the login page
      navigate('/login');
    }
  }, [auth.accessToken, navigate]); // Include navigate in the dependencies array

  return (
    <div className='send-message-container'>
      <h1>Send Message</h1>
      <div className='form-container'>
        <div className='form-group'>
          <label htmlFor="content">Message Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor="image">Attach Image:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className='form-group'>
          <label htmlFor="receiver">Receiver's ID:</label>
          <input
            type="text"
            name="receiver"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
          />
        </div>
        <button onClick={handleMessageSend}>Send Message</button>
      </div>
      <div>
        <GetMessages />
      </div>
    </div>
  );
}

export default MessagePage;
