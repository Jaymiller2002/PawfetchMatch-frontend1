import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './context';
import { getMessages, baseUrl } from './api'; // Ensure getMessages and baseUrl are correctly exported from api.js
import { useNavigate } from 'react-router-dom';
import './GetMessages.css';

function GetMessages() {
  const [messages, setMessages] = useState([]);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (auth.accessToken) {
        try {
          const response = await getMessages(auth); // Assuming getMessages expects auth as an argument
          console.log("Got Messages: ", response);
          setMessages(response.data); // Assuming response.data contains the messages
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
    };

    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 10000); // Polling every 10 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [auth]);

  useEffect(() => {
    if (!auth.accessToken) {
      navigate('/login'); // Redirect to login page if accessToken is not available
    }
  }, [auth, navigate]);

  return (
    <div className='messages-container'>
      <h2>Sent/Received Messages</h2>
      {messages && messages.map(message => (
        <div key={message.id} className="message">
          <div className='message-sender'>Sender: {message.sender}</div>
          <div className='message-content'>Content: {message.content}</div>
          <img src={`${baseUrl}${message.image}`} alt="Message Image" className='message-image'/>
        </div>
      ))}
    </div>
  );
}

export default GetMessages;

