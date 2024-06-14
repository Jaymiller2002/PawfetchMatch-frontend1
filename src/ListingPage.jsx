import React, { useState, useContext, useEffect } from 'react';
import { createListing, updateListing, deleteListing } from './api'; // Import your API functions
import { AuthContext } from './context'; // Import your AuthContext
import './ListingPage.css';
import GetListings from './GetListings';
import { useNavigate } from 'react-router-dom';

function ListingPage() {
  const { auth } = useContext(AuthContext); // Get authentication info from context
  const [createdListing, setCreatedListing] = useState(null); // State variable to store created listing data
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState(undefined);
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [updatePrice, setUpdatePrice] = useState('');
  const [updateQuantity, setUpdateQuantity] = useState('');
  const [updateImage, setUpdateImage] = useState(undefined);
  const navigate = useNavigate();
  
  // Function to handle form submission for creating a listing
  const handleCreateListing = async () => {
    try {
      // Call the createListing API function with authentication info
      const response = await createListing({ title, description, price, quantity, image, auth });
      // Set the created listing data in state
      setCreatedListing(response.data);
    } catch (error) {
      console.error('Error creating listing:', error);
    }
  }

  // Function to handle form submission for updating a listing
  const handleUpdateListing = async () => {
    try {
      // Call the updateListing API function with authentication info and listing ID
      const response = await updateListing({ 
        title: updateTitle, 
        description: updateDescription, 
        price: updatePrice, 
        quantity: updateQuantity, 
        image: updateImage, 
        auth,
      });
      console.log('Listing updated:', response);
    } catch (error) {
      console.error('Error updating listing:', error);
    }
  }

  // Function to handle deleting a listing
  const handleDeleteListing = async () => {
    try {
      // Call the deleteListing API function with authentication info
      await deleteListing({ auth });
      console.log('Listing deleted');
    } catch (error) {
      console.error('Error deleting listing:', error);
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
        {/* Input fields for creating a listing */}
        <input onChange={e => setTitle(e.target.value)} type="text" name="title" placeholder="Title" />
        <textarea onChange={e => setDescription(e.target.value)} name="description" placeholder="Description"></textarea>
        <input onChange={e => setPrice(e.target.value)} type="number" name="price" placeholder="Price" />
        <input onChange={e => setQuantity(e.target.value)} type="number" name="quantity" placeholder="Quantity" />
        <input onChange={e => setImage(e.target.files[0])} type="file" name="image" accept="image/*" />
        <button onClick={handleCreateListing}>Create Listing</button>
      </div>
      
      {/* Form for updating a listing */}
      <div>
        <input onChange={e => setUpdateTitle(e.target.value)} type="text" name="updateTitle" placeholder="Update Title" />
        <textarea onChange={e => setUpdateDescription(e.target.value)} name="updateDescription" placeholder="Update Description"></textarea>
        <input onChange={e => setUpdatePrice(e.target.value)} type="number" name="updatePrice" placeholder="Update Price" />
        <input onChange={e => setUpdateQuantity(e.target.value)} type="number" name="updateQuantity" placeholder="Update Quantity" />
        <input onChange={e => setUpdateImage(e.target.files[0])} type="file" name="updateImage" accept="image/*" />
        <button onClick={handleUpdateListing}>Update Listing</button>
      </div>

      {/* Button for deleting a listing */}
      <div>
        <button onClick={handleDeleteListing}>Delete Listing</button>
      </div>
      {/* <GetListings /> */}
    </div>
  );
}

export default ListingPage;



