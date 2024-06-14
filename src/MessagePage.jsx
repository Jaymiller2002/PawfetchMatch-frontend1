import React, { useState, useEffect, useContext } from 'react';
import { createMessage, updateMessage, deleteMessage } from './api'; // Import the deleteMessage function
import { AuthContext } from './context';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import GetMessages from './GetMessages';
import './MessagePage.css';

function MessagePage() {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [receiver, setReceiver] = useState('');
  const [updateContent, setUpdateContent] = useState('');
  const [updateImage, setUpdateImage] = useState(null); // State for updating image
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleMessageSend = async () => {
    try {
      const response = await createMessage({ content, image, receiver, auth });
      console.log('Message sent:', response.data);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleUpdateMessage = async () => {
    try {
      const response = await updateMessage({ content: updateContent, image: updateImage, auth });
      console.log('Message updated:', response.data);
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  const handleDeleteMessage = async () => {
    try {
      const response = await deleteMessage({ auth });
      console.log('Message deleted:', response.data);
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  useEffect(() => {
    if (!auth.accessToken) {
      navigate('/login');
    }
  }, [auth.accessToken, navigate]);

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
          <label htmlFor="receiver">Receiver or their ID: </label>
          <input
            type="text"
            name="receiver"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
          />
        </div>
        <button onClick={handleMessageSend}>Send Message</button>
        {/* Button to update message */}
        <div className='form-group'>
          <label htmlFor="updateContent">Update Content:</label>
          <textarea
            id="updateContent"
            value={updateContent}
            onChange={(e) => setUpdateContent(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor="updateImage">Update Image:</label>
          <input
            type="file"
            name="updateImage"
            accept="image/*"
            onChange={(e) => setUpdateImage(e.target.files[0])}
          />
        </div>
        <button onClick={handleUpdateMessage}>Update Message</button>
        {/* Button to delete message */}
        <button onClick={handleDeleteMessage}>Delete Message</button>
      </div>
      <div>
        <GetMessages />
      </div>
    </div>
  );
}

export default MessagePage;


