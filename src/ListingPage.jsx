import React, { useState, useContext, useEffect } from 'react';
import { createListing, updateListing, deleteListing } from './api';
import { AuthContext } from './context';
import './ListingPage.css';
import { useNavigate } from 'react-router-dom';

function ListingPage() {
  const { auth } = useContext(AuthContext);
  const [createdListing, setCreatedListing] = useState(null);
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
  
  const handleCreateListing = async () => {
    try {
      const response = await createListing({ title, description, price, quantity, image, auth });
      setCreatedListing(response.data);
    } catch (error) {
      console.error('Error creating listing:', error);
    }
  }

  const handleUpdateListing = async () => {
    try {
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

  const handleDeleteListing = async () => {
    try {
      await deleteListing({ auth });
      console.log('Listing deleted');
    } catch (error) {
      console.error('Error deleting listing:', error);
    }
  }

  useEffect(() => {
    if (!auth.accessToken) {
      navigate('/login');
    }
  }, [auth.accessToken, navigate]);

  return (
    <div className="listing-container">
      <div className="create-listing-form">
        <h2>Create Listing</h2>
        <input onChange={e => setTitle(e.target.value)} type="text" name="title" placeholder="Title" />
        <textarea onChange={e => setDescription(e.target.value)} name="description" placeholder="Description"></textarea>
        <input onChange={e => setPrice(e.target.value)} type="number" name="price" placeholder="Price" />
        <input onChange={e => setQuantity(e.target.value)} type="number" name="quantity" placeholder="Quantity" />
        <input onChange={e => setImage(e.target.files[0])} type="file" name="image" accept="image/*" />
        <button className='Create-button' onClick={handleCreateListing}>Create Listing</button>
      </div>

      <div className="update-listing-form">
        <h2>Update Listing</h2>
        <input onChange={e => setUpdateTitle(e.target.value)} type="text" name="updateTitle" placeholder="Update Title" />
        <textarea onChange={e => setUpdateDescription(e.target.value)} name="updateDescription" placeholder="Update Description"></textarea>
        <input onChange={e => setUpdatePrice(e.target.value)} type="number" name="updatePrice" placeholder="Update Price" />
        <input onChange={e => setUpdateQuantity(e.target.value)} type="number" name="updateQuantity" placeholder="Update Quantity" />
        <input onChange={e => setUpdateImage(e.target.files[0])} type="file" name="updateImage" accept="image/*" />
        <button className='Update-button' onClick={handleUpdateListing}>Update Listing</button>
      </div>

      <div className="delete-listing">
        <button style={{background: 'red', backgroundColor: 'red'}} className='Delete-button' onClick={handleDeleteListing}>Delete Listing</button>
      </div>
    </div>
  );
}

export default ListingPage;




