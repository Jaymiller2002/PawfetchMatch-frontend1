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
  const [updateCount, setUpdateCount] = useState(1);
  const [deleteCount, setDeleteCount] = useState(1);
  const [selectedListingId, setSelectedListingId] = useState(null); // State to store the selected listing ID
  const navigate = useNavigate();
  const [createFormError, setCreateFormError] = useState('');
  const [updateFormError, setUpdateFormError] = useState('');

  const handleCreateListing = async () => {
    if (!title || !description || !price || !quantity || !image) {
      setCreateFormError('All fields are required.');
      return;
    }

    try {
      const response = await createListing({ title, description, price, quantity, image, auth });
      setCreatedListing(response.data);
      // Clear input fields after successful creation
      setTitle('');
      setDescription('');
      setPrice('');
      setQuantity('');
      setImage(undefined);
      setCreateFormError('');
    } catch (error) {
      console.error('Error creating listing:', error);
      setCreateFormError('Error creating listing. Please try again.');
    }
  }

  const handleUpdateListing = async () => {
    if (!updateTitle || !updateDescription || !updatePrice || !updateQuantity || !updateImage || !selectedListingId) {
      setUpdateFormError('All fields are required.');
      return;
    }

    try {
      const response = await updateListing({ 
        id: selectedListingId, // Assuming the API expects an ID for the listing to update
        title: updateTitle, 
        description: updateDescription, 
        price: updatePrice, 
        quantity: updateQuantity, 
        image: updateImage, 
        auth,
      });
      console.log('Listing updated:', response);

      // Clear input fields after successful update
      setUpdateTitle('');
      setUpdateDescription('');
      setUpdatePrice('');
      setUpdateQuantity('');
      setUpdateImage(undefined);
      setUpdateCount(1);
      setUpdateFormError('');
    } catch (error) {
      console.error('Error updating listing:', error);
      setUpdateFormError('Error updating listing. Please try again.');
    }
  }

  const handleDeleteListing = async () => {
    if (!selectedListingId) {
      alert('Please select a listing to delete.');
      return;
    }

    try {
      await deleteListing({ id: selectedListingId, auth });
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
        {createFormError && <p className="error-message">{createFormError}</p>}
        <input onChange={e => setTitle(e.target.value)} type="text" name="title" placeholder="Title" value={title} required />
        <textarea onChange={e => setDescription(e.target.value)} name="description" placeholder="Description" value={description} required></textarea>
        <input onChange={e => setPrice(e.target.value)} type="number" name="price" placeholder="Price" value={price} required />
        <input onChange={e => setQuantity(e.target.value)} type="number" name="quantity" placeholder="Quantity" value={quantity} required />
        <input onChange={e => setImage(e.target.files[0])} type="file" name="image" accept="image/*" required />
        <button className='Create-button' onClick={handleCreateListing}>Create Listing</button>
      </div>

      <div className="update-listing-form">
        <h2>Update Listing</h2>
        {updateFormError && <p className="error-message">{updateFormError}</p>}
        <input onChange={e => setUpdateTitle(e.target.value)} type="text" name="updateTitle" placeholder="Update Title" value={updateTitle} required />
        <textarea onChange={e => setUpdateDescription(e.target.value)} name="updateDescription" placeholder="Update Description" value={updateDescription} required></textarea>
        <input onChange={e => setUpdatePrice(e.target.value)} type="number" name="updatePrice" placeholder="Update Price" value={updatePrice} required />
        <input onChange={e => setUpdateQuantity(e.target.value)} type="number" name="updateQuantity" placeholder="Update Quantity" value={updateQuantity} required />
        <input onChange={e => setUpdateImage(e.target.files[0])} type="file" name="updateImage" accept="image/*" required />
        <input onChange={e => setUpdateCount(Number(e.target.value))} type="number" name="updateCount" placeholder="Number of Listings to Update (1-10)" min="1" max="10" value={updateCount} required />
        <button className='Update-button' onClick={handleUpdateListing}>Update Listing</button>
      </div>

      <div className="delete-listing">
        <input onChange={e => setSelectedListingId(e.target.value)} type="text" name="selectedListingId" placeholder="Listing ID to Delete" />
        <button style={{background: 'red', backgroundColor: 'red'}} className='Delete-button' onClick={handleDeleteListing}>Delete Listing</button>
      </div>
    </div>
  );
}

export default ListingPage;





