import React, { useState } from 'react';
import GetListings from "./GetListings";
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className='app-container'>
      <div className='search-container'>
        <input
          type="text"
          placeholder="Search listings..."
          value={searchTerm}
          onChange={handleSearchChange}
          className='search-input'
        />
      </div>
      <div className='listings-container'>
        <GetListings searchTerm={searchTerm} />
      </div>
    </div>
  );
}

export default App;

