import React, { useState, useContext, useEffect } from 'react';
import { createListing } from './api'; // Import your API function
import { AuthContext } from './context'; // Import your AuthContext
import './ListingPage.css';
import GetListings from './GetListings';
import { useNavigate } from 'react-router-dom';

function ListingPage() {
  const { auth } = useContext(AuthContext); // Get authentication info from context
  const [createdListing, setCreatedListing] = useState(null); // State variable to store created listing data
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState(undefined);
  const navigate = useNavigate();
  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      // Call the API function with authentication info
      const response = await createListing({ title, description, price, quantity, image, auth });
      // Set the created listing data in state
      setCreatedListing(response.data);
    } catch (error) {
      console.error('Error creating listing:', error);
    }
  }

  useEffect(() => {
    if (!auth.accessToken) {
      // If accessToken is not available, navigate to the login page
      navigate('/login');
    }
  }, [auth.accessToken, navigate]); // Include navigate in the dependencies array

  return (
    <div className="p-5">
      {/* Form for listing creation */}
      <div>
        <input onChange={e => setTitle(e.target.value)} type="text" name="title" placeholder="Title" />
        <textarea onChange={e => setDescription(e.target.value)} name="description" placeholder="Description"></textarea>
        <input onChange={e => setPrice(e.target.value)} type="number" name="price" placeholder="Price" />
        <input onChange={e => setQuantity(e.target.value)} type="number" name="quantity" placeholder="Quantity" />
        <input onChange={e => setImage(e.target.files[0])} type="file" name="image" accept="image/*" />
        <button onClick={handleSubmit}>Create Listing</button>
      </div>
      {/* <GetListings /> */}
    </div>
  );
}

export default ListingPage;

