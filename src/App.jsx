import React, { useState } from 'react';
import GetListings from "./GetListings";

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search listings..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <GetListings searchTerm={searchTerm} />
    </div>
  );
}

export default App;
