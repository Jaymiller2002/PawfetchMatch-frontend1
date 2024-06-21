import React, { useState, useContext } from 'react';
import { createMessage, updateMessage, deleteMessage } from './api';
import { AuthContext } from './context';
// import { useNavigate } from 'react-router-dom';
import GetMessages from './GetMessages';
import './MessagePage.css';

function MessagePage() {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [receiver, setReceiver] = useState('');
  const [updateContent, setUpdateContent] = useState('');
  const [updateImage, setUpdateImage] = useState(null);
  const [users] = useState([
    { id: 1, name: 'user 1' },
    { id: 2, name: 'Jason Mize' },
    { id: 3, name: 'Jay Miller' },
    { id: 4, name: 'user 4' },
    { id: 5, name: 'Morgan Miller' },
    { id: 6, name: 'Kailey Miller' },
    { id: 7, name: 'DeeAnn Miller' },
    { id: 8, name: 'user 8' },
    { id: 9, name: 'user 9' },
    { id: 10, name: 'user 10' },
    { id: 11, name: 'user 11' },
    { id: 12, name: 'user 12' },
    { id: 13, name: 'user 13' },
    { id: 14, name: 'user 14' },
    { id: 15, name: 'user 15' },
    { id: 16, name: 'user 16' },
    { id: 17, name: 'user 17' },
    { id: 18, name: 'user 18' },
    { id: 19, name: 'user 19' },
    { id: 20, name: 'user 20' },
    { id: 21, name: 'user 21' },
    { id: 22, name: 'user 22' },
    { id: 23, name: 'user 23' },
    { id: 24, name: 'user 24' },
    { id: 25, name: 'user 25' },
    { id: 26, name: 'user 26' },
    { id: 27, name: 'user 27' },
    { id: 28, name: 'user 28' },
    { id: 29, name: 'user 29' },
    { id: 30, name: 'user 30' },
    // Other users
  ]);
  
  const { auth } = useContext(AuthContext);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!auth.accessToken) {
  //     navigate('/login');
  //   }
  // }, [auth.accessToken, navigate]);

  const handleMessageSend = () => {
    try {
      createMessage({ content, image, receiver, auth });
      console.log('Message sent');
      // setContent('');
      // setImage(null);
      // setReceiver('');
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
                  {user.name}
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

      <div className='delete-message-container'>
        <h1>Delete Message</h1>
        <button className='delete-button' onClick={handleDeleteMessage}>Delete Message</button>
      </div>
    </div>
  );
}

export default MessagePage;







