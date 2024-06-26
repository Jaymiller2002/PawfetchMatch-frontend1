import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './context';
import { getMessages } from './api'; // Assuming getMessages function is defined in api.js
import { useNavigate } from 'react-router-dom';
import './GetMessages.css'
import { baseUrl } from './api';

function GetMessages() {
  const [messages, setMessages] = useState([]);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    // Polling for updates every 10 seconds
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, [auth.accessToken]);

  const fetchData = async () => {
    if (auth.accessToken) {
        try {
            const response = await getMessages({ auth });
            console.log("Got Messages: ", response)
            setMessages(response.data); // Assuming response.data contains the messages
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    }
  };

  useEffect(() => {
    if (!auth.accessToken) {
      // If accessToken is not available, navigate to the login page
      navigate('/login');
    }
  }, [auth.accessToken, navigate]); // Include navigate in the dependencies array

  return (
    <div className='messages-container'>
      <h2>Sent/Recieved Messages</h2>
      {messages.map(message => (
        <div key={message.id} className="message">
          <div className='message-sender'>Sender: {message.sender}</div>
          <div className='message-content'>Content: {message.content}</div>
          {message.image ? <img src={`${baseUrl}${message.image}`} alt="Message Image" className='message-image'/> : null}
        </div>
      ))}
    </div>
  );
}

export default GetMessages;




