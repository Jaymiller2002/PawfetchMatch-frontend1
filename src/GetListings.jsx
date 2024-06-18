import React, { useState, useEffect } from 'react';
import { getListing } from './api';
import './GetListings.css';

function GetListings({ searchTerm }) {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        fetchListings();
    }, [searchTerm]); // Re-fetch listings when searchTerm changes

    const fetchListings = async () => {
        try {
            const response = await getListing();
            console.log("GOT LISTINGS: ", response);
            setListings(response.filter(listing => listing.title.toLowerCase().includes(searchTerm.toLowerCase())));
        } catch (error) {
            console.log("ERROR FETCHING LISTINGS: ", error);
        }
    };

    return (
        <div className="listing-container">
            <ul className="card-container">
                {listings.map((listing, index) => (
                    <li className="card" key={index}>
                        <p>User Id: {listing.user}</p>
                        <p>Title: {listing.title}</p>
                        <p>Description: {listing.description}</p>
                        <p>Price: {listing.price}</p>
                        <p>Quantity: {listing.quantity}</p>
                        <img src={`http://127.0.0.1:8000${listing.image}`} alt={listing.title} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GetListings;


