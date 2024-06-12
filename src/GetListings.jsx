import React, { useState, useEffect, useContext } from 'react';
import { getListing } from './api';
import { AuthContext } from './context';
import './GetListings.css';

function GetListings() {
    const [listings, setListings] = useState([]);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        if (auth.accessToken) {
            fetchListings();
        }
    }, [auth.accessToken]); // Only fetch data when accessToken changes

    const fetchListings = async () => {
        try {
            const response = await getListing({ auth });
            console.log("GOT LISTINGS: ", response);
            setListings(response.data);
        } catch (error) {
            console.log("ERROR FETCHING LISTINGS: ", error);
        }
    };

    return (
        <div className="listing-container">
            <h2>Listings:</h2>
            <ul className="card-container">
                {listings.map((listing, index) => (
                    <li className="card" key={index}>
                        <p>Title: {listing.title}</p>
                        <p>Description: {listing.description}</p>
                        <p>Price: {listing.price}</p>
                        <p>Quantity: {listing.quantity}</p>
                        <img src={`http://127.0.0.1:8000${listing.image}`}></img>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GetListings;
