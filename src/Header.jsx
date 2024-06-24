import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./context";
import LogoutButton from "./LogoutButton";
import "./Header.css";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { auth } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="header-container">
      <div className="header-links">
        <Link to="/" className="header-link">
          <i className="fa-solid fa-paw" alt='Doglist'></i>
        </Link>
        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          <Link to="/" className="header-link">Dashboard</Link>
          {!auth.accessToken && <Link to="/login" className="header-link">Login</Link>}
          <Link to="/ListingPage" className="header-link">Listing</Link>
          <Link to="/Profile" className="header-link">My Profile</Link>
          <Link to="/AllProfiles" className="header-link">All Profile's</Link>
          {auth.accessToken && <LogoutButton />}
        </div>
        <div className="burger-menu" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      {isOpen && <div className="backdrop" onClick={toggleMenu}></div>}
    </div>
  );
}

export default Header;


