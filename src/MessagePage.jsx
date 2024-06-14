import React, { useState, useEffect, useContext } from 'react';
import { createMessage, updateMessage, deleteMessage } from './api';
import { AuthContext } from './context';
import { useNavigate } from 'react-router-dom';
import GetMessages from './GetMessages';
import './MessagePage.css';

function MessagePage() {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [receiver, setReceiver] = useState('');
  const [updateContent, setUpdateContent] = useState('');
  const [updateImage, setUpdateImage] = useState(null);
  const [users] = useState([
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    { id: 3, name: 'User 3' },
    { id: 4, name: 'User 4' },
    { id: 5, name: 'User 5' },
    { id: 6, name: 'User 6' },
    { id: 7, name: 'Jay Miller' },
    { id: 8, name: 'User 8' },
    { id: 9, name: 'User 9' },
    { id: 10, name: 'User 10' },
    { id: 11, name: 'Reece' },
    { id: 12, name: 'User 12' },
    { id: 13, name: 'User 13' },
  ]);
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
    <div className='message-page-container'>
      <div className='send-message-container'>
        <h1>Send Message</h1>
        <div className='form-container create-message-form'>
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
            <label htmlFor="receiver"></label>
            <select
              id="receiver"
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
            >
              <option value="">Select Receiver</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.id})
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleMessageSend}>Send Message</button>
        </div>
      </div>

      <div className='update-message-container'>
        <h1>Update Message</h1>
        <div className='form-container update-message-form'>
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
        </div>
      </div>

      <div>
        <GetMessages />
      </div>
      <button className='delete-button' onClick={handleDeleteMessage}>Delete Message</button>
    </div>
  );
}

export default MessagePage;



