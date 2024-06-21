import React, { useState, useEffect, useContext } from 'react';
import { createMessage, updateMessage, deleteMessage } from './api'; // Assuming you have API functions defined in './api'
import { AuthContext } from './context'; // Assuming you have an AuthContext defined in './context'
import { useNavigate } from 'react-router-dom';
import GetMessages from './GetMessages'; // Assuming you have a component for displaying messages defined in './GetMessages'
import './MessagePage.css'; // Assuming you have CSS styles defined in './MessagePage.css'

function MessagePage() {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [receiver, setReceiver] = useState('');
  const [updateContent, setUpdateContent] = useState('');
  const [updateImage, setUpdateImage] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [users] = useState([
    { id: 2, name: 'Jay Miller' },
    { id: 3, name: 'Jay Miller' },
    { id: 5, name: 'Morgan Miller' },
    { id: 6, name: 'Kailey Miller' },
    { id: 7, name: 'DeeAnn Miller' },
    { id: 10, name: 'Jay Miller' },
    { id: 11, name: 'Reece' },
    { id: 14, name: 'Vader' },
    { id: 15, name: 'Luke' },
    { id: 17, name: 'User 17' },
    { id: 18, name: 'User 18' },
    { id: 19, name: 'User 19' },
    { id: 20, name: 'User 20' },
    { id: 21, name: 'User 21' },
    { id: 22, name: 'User 22' },
    { id: 23, name: 'User 23' },
    { id: 24, name: 'User 24' },
    { id: 25, name: 'User 25' },
    { id: 26, name: 'User 26' },
    { id: 27, name: 'User 27' },
    { id: 28, name: 'User 28' },
    { id: 29, name: 'User 29' },
    { id: 30, name: 'User 30' },
    { id: 31, name: 'Jay Miller' },
    { id: 32, name: 'Jay Miller' },
    { id: 33, name: 'Jay Miller' },
    { id: 34, name: 'Jay Miller' },
    { id: 35, name: 'Jay Miller' },
    { id: 36, name: 'Jay Miller' },
    { id: 37, name: 'Jay Miller' },
    { id: 38, name: 'Jay Miller' },
    { id: 39, name: 'Jay Miller' },
    { id: 40, name: 'Jay Miller' },
  ]);
  const { auth } = useContext(AuthContext); // Assuming AuthContext provides authentication details like accessToken
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.accessToken) {
      navigate('/login'); // Redirect to login if accessToken is not available
    }
  }, [auth.accessToken, navigate]);

  const handleMessageSend = async () => {
    try {
      const response = await createMessage({ content, image, receiver, auth });
      console.log('Message sent:', response.data); // Log successful message sending
    } catch (error) {
      console.error('Error sending message:', error); // Log error if message sending fails
    }
  };

  const handleUpdateMessage = async () => {
    if (!selectedMessage) {
      console.error('No message selected for update');
      return;
    }

    try {
      const response = await updateMessage({
        id: selectedMessage.id,
        content: updateContent,
        image: updateImage,
        auth
      });
      console.log('Message updated:', response.data); // Log successful message update
    } catch (error) {
      console.error('Error updating message:', error); // Log error if message update fails
    }
  };

  const handleDeleteMessage = async () => {
    if (!selectedMessage) {
      console.error('No message selected for deletion');
      return;
    }

    try {
      const response = await deleteMessage({
        id: selectedMessage.id,
        auth
      });
      console.log('Message deleted:', response.data); // Log successful message deletion
    } catch (error) {
      console.error('Error deleting message:', error); // Log error if message deletion fails
    }
  };

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
            <label htmlFor="receiver">Receiver:</label>
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
          <div className='form-group'>
            <label htmlFor="selectedMessage">Select Message to Update:</label>
            <select
              id="selectedMessage"
              value={selectedMessage ? selectedMessage.id : ''}
              onChange={(e) => {
                const selected = users.find(user => user.id === parseInt(e.target.value));
                setSelectedMessage(selected);
              }}
            >
              <option value="">Select Message</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.id})
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleUpdateMessage}>Update Message</button>
        </div>
      </div>

      <div>
        <GetMessages /> {/* Assuming GetMessages component displays the list of messages */}
      </div>
      <button className='delete-button' onClick={handleDeleteMessage}>Delete Message</button>
    </div>
  );
}

export default MessagePage;








